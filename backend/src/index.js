// TTC — API espace membre (Cloudflare Worker + D1) — accès par CODE UNIQUE.
// Le code EST l'accès (pas de mot de passe) :
//   • POST /api/auth {code}  -> jeton de session si le code est valide/non révoqué.
// Admin (orga), protégé par le secret ADMIN_SECRET (en-tête x-ttc-admin) :
//   • POST /api/invites {note,count}   -> génère des codes uniques
//   • GET  /api/invites                -> liste des codes + statut (qui, actif…)
//   • POST /api/invites/revoke {code}  -> révoque un code
// Espace privé : membres / courses / gpx lisibles UNIQUEMENT connecté (jeton).
//   • POST /api/races/:id/delete       -> supprime une course + ses inscriptions
//   • POST /api/races/:id/update       -> modifie les infos d'une course

const enc = new TextEncoder();
const json = (data, status, origin) =>
  new Response(JSON.stringify(data), { status: status || 200, headers: { "content-type": "application/json; charset=utf-8", ...cors(origin) } });
function cors(o) { return { "access-control-allow-origin": o || "*", "access-control-allow-methods": "GET,POST,OPTIONS", "access-control-allow-headers": "content-type,x-ttc-token,x-ttc-admin", "access-control-max-age": "86400" }; }
function pickOrigin(req, env) { const o = req.headers.get("Origin") || ""; const a = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean); if (!a.length) return o || "*"; return a.includes(o) ? o : a[0]; }
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : "id" + Date.now() + Math.round(Math.random() * 1e6));
const now = () => new Date().toISOString();
async function body(req) { try { return await req.json(); } catch (e) { return {}; } }

async function hmac(msg, key) { const k = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]); const s = await crypto.subtle.sign("HMAC", k, enc.encode(msg)); return btoa(String.fromCharCode.apply(null, new Uint8Array(s))).replace(/[^a-zA-Z0-9]/g, ""); }
async function makeToken(id, secret) { return id + "." + (await hmac(id, secret)); }
async function verifyToken(tok, secret) { if (!tok) return null; const i = tok.lastIndexOf("."); if (i < 0) return null; const id = tok.slice(0, i), sig = tok.slice(i + 1); return (await hmac(id, secret)) === sig ? id : null; }

// Codes : 8 caractères, alphabet sans ambiguïté (pas de O/0, I/1, etc.).
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
function genCode() { const a = crypto.getRandomValues(new Uint8Array(8)); let s = ""; for (let i = 0; i < a.length; i++) s += ALPHABET[a[i] % ALPHABET.length]; return s; }
function normCode(s) { return String(s || "").toUpperCase().replace(/[^A-Z0-9]/g, ""); }
function fmtCode(c) { return c && c.length === 8 ? c.slice(0, 4) + "-" + c.slice(4) : c; }
function adminAuthed(req, env) { const s = req.headers.get("x-ttc-admin") || ""; return !!env.ADMIN_SECRET && s === env.ADMIN_SECRET; }

function safe(s) { try { return JSON.parse(s || "[]"); } catch (e) { return []; } }
function pubMember(r) { let terr = {}; try { terr = JSON.parse(r.terrains || "{}"); } catch (e) {} return { id: r.id, prenom: r.prenom, pseudo: r.pseudo, ville: r.ville, avatar: r.avatar, niveau: r.niveau, objectif: r.objectif, strava: r.strava, insta: r.insta, techno: r.techno, adhesion: r.adhesion, distances: safe(r.distances), terrains: terr }; }

// Tables "sociales" des traces (réactions « fait » + commentaires) créées à la
// volée : pas de migration manuelle à lancer côté D1. Gardé en mémoire de
// l'isolate pour ne le faire qu'une fois.
let _gpxSocialReady = false;
async function ensureGpxSocial(env) {
  if (_gpxSocialReady) return;
  await env.DB.batch([
    env.DB.prepare("CREATE TABLE IF NOT EXISTS gpx_done (id TEXT PRIMARY KEY, gpx_id TEXT NOT NULL, member_id TEXT NOT NULL, emoji TEXT, created_at TEXT NOT NULL, UNIQUE(gpx_id,member_id))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS gpx_comments (id TEXT PRIMARY KEY, gpx_id TEXT NOT NULL, member_id TEXT NOT NULL, text TEXT NOT NULL, created_at TEXT NOT NULL)"),
  ]);
  _gpxSocialReady = true;
}
// Nom + avatar affichables d'un membre (fallbacks neutres).
function whoOf(map, id) { const w = map[id] || {}; return { name: w.prenom || w.pseudo || "Membre", avatar: w.avatar || "🙂" }; }

export default {
  async fetch(req, env) {
    const origin = pickOrigin(req, env);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
    const url = new URL(req.url);
    const path = url.pathname.replace(/\/+$/, "");
    const write = req.method === "POST";
    const SECRET = env.MEMBER_PASS || "ttc-secret";
    try {
      if (path === "/api/health") return json({ ok: true, time: now() }, 200, origin);

      // ---- ACCÈS PAR CODE ----
      if (path === "/api/auth" && write) {
        const b = await body(req);
        const code = normCode(b.code);
        if (!code) return json({ error: "invalid" }, 400, origin);
        const inv = (await env.DB.prepare("SELECT code,revoked FROM invites WHERE code=?").bind(code).all()).results[0];
        if (!inv || inv.revoked) return json({ error: "bad-code" }, 401, origin);
        const id = "c-" + code;
        const mrow = (await env.DB.prepare("SELECT id FROM members WHERE id=?").bind(id).all()).results[0];
        if (!mrow) await env.DB.prepare("INSERT INTO members (id,created_at) VALUES (?,?)").bind(id, now()).run();
        await env.DB.prepare("UPDATE invites SET used_at=COALESCE(used_at,?) WHERE code=?").bind(now(), code).run();
        return json({ token: await makeToken(id, SECRET), id, code: fmtCode(code) }, 200, origin);
      }

      // ---- ADMIN : gestion des codes (orga) ----
      if (path === "/api/invites/revoke" && write) {
        if (!adminAuthed(req, env)) return json({ error: "forbidden" }, 403, origin);
        const b = await body(req); const code = normCode(b.code);
        await env.DB.prepare("UPDATE invites SET revoked=1 WHERE code=?").bind(code).run();
        return json({ ok: true }, 200, origin);
      }
      if (path === "/api/invites") {
        if (!adminAuthed(req, env)) return json({ error: "forbidden" }, 403, origin);
        if (req.method === "GET") {
          const invs = (await env.DB.prepare("SELECT * FROM invites ORDER BY created_at DESC").all()).results;
          const mem = (await env.DB.prepare("SELECT id,prenom,pseudo FROM members").all()).results;
          const byId = {}; for (const m of mem) byId[m.id] = m;
          return json({ invites: invs.map((v) => { const m = byId["c-" + v.code]; return { code: v.code, display: fmtCode(v.code), note: v.note || "", created_at: v.created_at, revoked: !!v.revoked, used_at: v.used_at || null, member: m ? (m.prenom || m.pseudo || "") : "" }; }) }, 200, origin);
        }
        if (write) {
          const b = await body(req);
          const count = Math.min(Math.max(parseInt(b.count, 10) || 1, 1), 50);
          const note = (b.note || "").slice(0, 80);
          const made = [];
          for (let i = 0; i < count; i++) {
            let code = genCode();
            for (let t = 0; t < 6; t++) {
              try { await env.DB.prepare("INSERT INTO invites (code,created_at,note) VALUES (?,?,?)").bind(code, now(), note).run(); break; }
              catch (e) { code = genCode(); if (t === 5) throw e; }
            }
            made.push({ code, display: fmtCode(code) });
          }
          return json({ created: made }, 200, origin);
        }
      }

      // ---- ESPACE PRIVÉ : connecté (jeton membre) ou admin, sinon rien ----
      const meId = await verifyToken(req.headers.get("x-ttc-token"), SECRET);
      if (!meId && !adminAuthed(req, env)) return json({ error: "unauthorized" }, 401, origin);

      // ---- MEMBRES ----
      if (path === "/api/members") {
        if (req.method === "GET") {
          const one = url.searchParams.get("id");
          if (one) { const r = (await env.DB.prepare("SELECT * FROM members WHERE id=?").bind(one).all()).results[0]; return json({ member: r ? pubMember(r) : null }, 200, origin); }
          const { results } = await env.DB.prepare("SELECT * FROM members ORDER BY created_at DESC").all();
          return json({ members: results.filter((r) => r.prenom || r.pseudo).map(pubMember) }, 200, origin);
        }
        if (write) {
          if (!meId) return json({ error: "unauthorized" }, 401, origin); // écrire SA fiche exige le jeton perso
          const b = await body(req);
          await env.DB.prepare(
            `INSERT INTO members (id,created_at,prenom,pseudo,ville,avatar,niveau,distances,terrains,objectif,strava,insta,techno,adhesion)
             VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
             ON CONFLICT(id) DO UPDATE SET prenom=excluded.prenom,pseudo=excluded.pseudo,ville=excluded.ville,avatar=excluded.avatar,
               niveau=excluded.niveau,distances=excluded.distances,terrains=excluded.terrains,objectif=excluded.objectif,
               strava=excluded.strava,insta=excluded.insta,techno=excluded.techno,adhesion=excluded.adhesion`
          ).bind(meId, now(), b.prenom || "", b.pseudo || "", b.ville || "", b.avatar || "", b.niveau || "",
                 JSON.stringify(b.distances || []), JSON.stringify(b.terrains || {}), b.objectif || "",
                 b.strava || "", b.insta || "", b.techno || "", b.adhesion || "").run();
          return json({ id: meId }, 200, origin);
        }
      }

      if (path === "/api/races") {
        if (req.method === "GET") {
          const races = (await env.DB.prepare("SELECT * FROM races ORDER BY date_start ASC").all()).results;
          const parts = (await env.DB.prepare("SELECT * FROM participations ORDER BY created_at ASC").all()).results;
          const byRace = {}; for (const p of parts) (byRace[p.race_id] = byRace[p.race_id] || []).push(p);
          return json({ races: races.map((r) => ({ ...r, distances: safe(r.distances), participants: byRace[r.id] || [] })) }, 200, origin);
        }
        const b = await body(req); if (!b.name) return json({ error: "name" }, 400, origin);
        const id = uid();
        await env.DB.prepare(`INSERT INTO races (id,created_at,name,date_start,date_end,location,type,distances,site_url,created_by) VALUES (?,?,?,?,?,?,?,?,?,?)`)
          .bind(id, now(), b.name, b.date_start || "", b.date_end || "", b.location || "", b.type || "trail", JSON.stringify(b.distances || []), b.site_url || "", b.created_by || "").run();
        return json({ id }, 200, origin);
      }
      let m = path.match(/^\/api\/races\/([^/]+)\/join$/);
      if (m && write) { const b = await body(req); const pid = uid(); await env.DB.prepare(`INSERT INTO participations (id,race_id,member,distance,status,strava,insta,created_at) VALUES (?,?,?,?,?,?,?,?)`).bind(pid, m[1], b.member || "?", b.distance || "", b.status || "inscrit", b.strava || "", b.insta || "", now()).run(); return json({ id: pid }, 200, origin); }
      m = path.match(/^\/api\/races\/([^/]+)\/leave$/);
      if (m && write) { const b = await body(req); if (b.participation_id) await env.DB.prepare("DELETE FROM participations WHERE id=? AND race_id=?").bind(b.participation_id, m[1]).run(); else if (b.member) await env.DB.prepare("DELETE FROM participations WHERE race_id=? AND member=?").bind(m[1], b.member).run(); return json({ ok: true }, 200, origin); }
      m = path.match(/^\/api\/races\/([^/]+)\/delete$/);
      if (m && write) { await env.DB.prepare("DELETE FROM participations WHERE race_id=?").bind(m[1]).run(); await env.DB.prepare("DELETE FROM races WHERE id=?").bind(m[1]).run(); return json({ ok: true }, 200, origin); }
      m = path.match(/^\/api\/races\/([^/]+)\/update$/);
      if (m && write) { const b = await body(req); if (!b.name) return json({ error: "name" }, 400, origin); await env.DB.prepare("UPDATE races SET name=?,date_start=?,date_end=?,location=?,type=?,distances=?,site_url=? WHERE id=?").bind(b.name, b.date_start || "", b.date_end || "", b.location || "", b.type || "trail", JSON.stringify(b.distances || []), b.site_url || "", m[1]).run(); return json({ ok: true }, 200, origin); }

      if (path.startsWith("/api/gpx")) await ensureGpxSocial(env);

      if (path === "/api/gpx") {
        if (req.method === "GET") {
          const gpx = (await env.DB.prepare("SELECT * FROM gpx ORDER BY created_at DESC").all()).results;
          const dones = (await env.DB.prepare("SELECT * FROM gpx_done").all()).results;
          const coms = (await env.DB.prepare("SELECT * FROM gpx_comments ORDER BY created_at ASC").all()).results;
          const mem = (await env.DB.prepare("SELECT id,prenom,pseudo,avatar FROM members").all()).results;
          const who = {}; for (const m of mem) who[m.id] = m;
          const dByG = {}, cByG = {};
          for (const d of dones) { const w = whoOf(who, d.member_id); (dByG[d.gpx_id] = dByG[d.gpx_id] || []).push({ member_id: d.member_id, emoji: d.emoji || "✅", name: w.name, avatar: w.avatar }); }
          for (const c of coms) { const w = whoOf(who, c.member_id); (cByG[c.gpx_id] = cByG[c.gpx_id] || []).push({ id: c.id, member_id: c.member_id, text: c.text, created_at: c.created_at, name: w.name, avatar: w.avatar, mine: c.member_id === meId }); }
          const out = gpx.map((g) => { const dz = dByG[g.id] || []; const me = dz.find((x) => x.member_id === meId); return { ...g, done: dz, done_count: dz.length, done_me: me ? me.emoji : "", comments: cByG[g.id] || [] }; });
          return json({ gpx: out }, 200, origin);
        }
        const b = await body(req); const id = uid();
        await env.DB.prepare(`INSERT INTO gpx (id,created_at,name,distance_km,denivele_m,region,start_point,type,url,added_by) VALUES (?,?,?,?,?,?,?,?,?,?)`)
          .bind(id, now(), b.name || "", Number(b.distance_km) || 0, Number(b.denivele_m) || 0, b.region || "", b.start_point || "", b.type || "Boucle", b.url || "", b.added_by || meId || "").run();
        return json({ id }, 200, origin);
      }

      // ---- Édition d'une trace (tout membre connecté) : métadonnées + infos
      // en plus. La géométrie (url.gpxz/gpx) n'est jamais touchée ici.
      let mg = path.match(/^\/api\/gpx\/([^/]+)\/edit$/);
      if (mg && write) {
        if (!meId) return json({ error: "unauthorized" }, 401, origin);
        const b = await body(req);
        const row = (await env.DB.prepare("SELECT url FROM gpx WHERE id=?").bind(mg[1]).all()).results[0];
        if (!row) return json({ error: "not-found" }, 404, origin);
        let data = {}; try { data = JSON.parse(row.url || "{}"); } catch (e) {}
        if (b.link !== undefined) data.link = String(b.link || "");
        if (b.official !== undefined) data.official = !!b.official;
        if (b.notes !== undefined) data.notes = String(b.notes || "").slice(0, 2000);
        if (b.place !== undefined) data.place = b.place && b.place.lat != null ? { lat: Number(b.place.lat), lon: Number(b.place.lon), label: String(b.place.label || "").slice(0, 160) } : null;
        await env.DB.prepare("UPDATE gpx SET name=COALESCE(?,name), region=COALESCE(?,region), start_point=COALESCE(?,start_point), type=COALESCE(?,type), url=? WHERE id=?")
          .bind(b.name != null ? String(b.name).slice(0, 120) : null, b.region != null ? String(b.region).slice(0, 120) : null, b.start_point != null ? String(b.start_point).slice(0, 120) : null, b.type != null ? String(b.type) : null, JSON.stringify(data), mg[1]).run();
        return json({ ok: true }, 200, origin);
      }

      // ---- « Je l'ai fait » : toggle avec emoji d'humeur (1 par membre/trace)
      mg = path.match(/^\/api\/gpx\/([^/]+)\/done$/);
      if (mg && write) {
        if (!meId) return json({ error: "unauthorized" }, 401, origin);
        const b = await body(req);
        if (b.done === false) { await env.DB.prepare("DELETE FROM gpx_done WHERE gpx_id=? AND member_id=?").bind(mg[1], meId).run(); }
        else {
          const emoji = String(b.emoji || "✅").slice(0, 8);
          await env.DB.prepare("INSERT INTO gpx_done (id,gpx_id,member_id,emoji,created_at) VALUES (?,?,?,?,?) ON CONFLICT(gpx_id,member_id) DO UPDATE SET emoji=excluded.emoji").bind(uid(), mg[1], meId, emoji, now()).run();
        }
        return json({ ok: true }, 200, origin);
      }

      // ---- Commentaires liés au profil
      mg = path.match(/^\/api\/gpx\/([^/]+)\/comment$/);
      if (mg && write) {
        if (!meId) return json({ error: "unauthorized" }, 401, origin);
        const b = await body(req);
        const text = String(b.text || "").trim().slice(0, 1000);
        if (!text) return json({ error: "empty" }, 400, origin);
        const id = uid();
        await env.DB.prepare("INSERT INTO gpx_comments (id,gpx_id,member_id,text,created_at) VALUES (?,?,?,?,?)").bind(id, mg[1], meId, text, now()).run();
        return json({ id }, 200, origin);
      }
      mg = path.match(/^\/api\/gpx\/([^/]+)\/comment\/([^/]+)\/delete$/);
      if (mg && write) {
        const c = (await env.DB.prepare("SELECT member_id FROM gpx_comments WHERE id=?").bind(mg[2]).all()).results[0];
        if (!c) return json({ ok: true }, 200, origin);
        if (c.member_id !== meId && !adminAuthed(req, env)) return json({ error: "forbidden" }, 403, origin);
        await env.DB.prepare("DELETE FROM gpx_comments WHERE id=?").bind(mg[2]).run();
        return json({ ok: true }, 200, origin);
      }

      return json({ error: "not found", path }, 404, origin);
    } catch (e) { return json({ error: "server", detail: String(e && e.message || e) }, 500, origin); }
  },
};
