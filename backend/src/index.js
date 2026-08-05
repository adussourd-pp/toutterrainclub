// TTC — API espace membre (Cloudflare Worker + D1).
// Lectures ouvertes ; écritures protégées par l'en-tête x-ttc-pass == MEMBER_PASS.
// Routes :
//   GET  /api/members            POST /api/members
//   GET  /api/races              POST /api/races
//   POST /api/races/:id/join     POST /api/races/:id/leave
//   GET  /api/gpx                POST /api/gpx
//   GET  /api/health

const json = (data, status, origin) =>
  new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { "content-type": "application/json; charset=utf-8", ...cors(origin) },
  });

function cors(origin) {
  return {
    "access-control-allow-origin": origin || "*",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "content-type,x-ttc-pass",
    "access-control-max-age": "86400",
  };
}

function pickOrigin(req, env) {
  const o = req.headers.get("Origin") || "";
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!allowed.length) return o || "*";
  return allowed.includes(o) ? o : allowed[0];
}

const uid = () => (crypto.randomUUID ? crypto.randomUUID() : "id" + Date.now() + Math.round(Math.random() * 1e6));
const now = () => new Date().toISOString();

async function body(req) {
  try { return await req.json(); } catch (e) { return {}; }
}
function authed(req, env) {
  return (req.headers.get("x-ttc-pass") || "") === (env.MEMBER_PASS || "");
}

export default {
  async fetch(req, env) {
    const origin = pickOrigin(req, env);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });

    const url = new URL(req.url);
    const path = url.pathname.replace(/\/+$/, "");
    const write = req.method === "POST";
    if (write && !authed(req, env)) return json({ error: "unauthorized" }, 401, origin);

    try {
      if (path === "/api/health") return json({ ok: true, time: now() }, 200, origin);

      // ---- MEMBERS ----
      if (path === "/api/members") {
        if (req.method === "GET") {
          const { results } = await env.DB.prepare(
            "SELECT * FROM members ORDER BY created_at DESC"
          ).all();
          return json({ members: results.map(parseMember) }, 200, origin);
        }
        if (write) {
          const b = await body(req);
          const id = b.id || uid();
          await env.DB.prepare(
            `INSERT INTO members (id,created_at,prenom,pseudo,ville,avatar,niveau,distances,terrains,objectif,strava,insta,techno,adhesion)
             VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
             ON CONFLICT(id) DO UPDATE SET prenom=excluded.prenom,pseudo=excluded.pseudo,ville=excluded.ville,
               avatar=excluded.avatar,niveau=excluded.niveau,distances=excluded.distances,terrains=excluded.terrains,
               objectif=excluded.objectif,strava=excluded.strava,insta=excluded.insta,techno=excluded.techno,adhesion=excluded.adhesion`
          ).bind(id, now(), b.prenom||"", b.pseudo||"", b.ville||"", b.avatar||"",
                 b.niveau||"", JSON.stringify(b.distances||[]), JSON.stringify(b.terrains||[]),
                 b.objectif||"", b.strava||"", b.insta||"", b.techno||"", b.adhesion||"").run();
          return json({ id }, 200, origin);
        }
      }

      // ---- RACES ----
      if (path === "/api/races") {
        if (req.method === "GET") {
          const races = (await env.DB.prepare("SELECT * FROM races ORDER BY date_start ASC").all()).results;
          const parts = (await env.DB.prepare("SELECT * FROM participations ORDER BY created_at ASC").all()).results;
          const byRace = {};
          for (const p of parts) (byRace[p.race_id] = byRace[p.race_id] || []).push(p);
          return json({ races: races.map((r) => ({ ...parseRace(r), participants: byRace[r.id] || [] })) }, 200, origin);
        }
        if (write) {
          const b = await body(req);
          if (!b.name) return json({ error: "name requis" }, 400, origin);
          const id = uid();
          await env.DB.prepare(
            `INSERT INTO races (id,created_at,name,date_start,date_end,location,type,distances,site_url,created_by)
             VALUES (?,?,?,?,?,?,?,?,?,?)`
          ).bind(id, now(), b.name, b.date_start||"", b.date_end||"", b.location||"",
                 b.type||"trail", JSON.stringify(b.distances||[]), b.site_url||"", b.created_by||"").run();
          return json({ id }, 200, origin);
        }
      }

      // ---- JOIN / LEAVE ----
      let m = path.match(/^\/api\/races\/([^/]+)\/join$/);
      if (m && write) {
        const b = await body(req);
        const pid = uid();
        await env.DB.prepare(
          `INSERT INTO participations (id,race_id,member,distance,status,strava,insta,created_at) VALUES (?,?,?,?,?,?,?,?)`
        ).bind(pid, m[1], b.member||"?", b.distance||"", b.status||"inscrit", b.strava||"", b.insta||"", now()).run();
        return json({ id: pid }, 200, origin);
      }
      m = path.match(/^\/api\/races\/([^/]+)\/leave$/);
      if (m && write) {
        const b = await body(req);
        if (b.participation_id) {
          await env.DB.prepare("DELETE FROM participations WHERE id=? AND race_id=?").bind(b.participation_id, m[1]).run();
        } else if (b.member) {
          await env.DB.prepare("DELETE FROM participations WHERE race_id=? AND member=?").bind(m[1], b.member).run();
        }
        return json({ ok: true }, 200, origin);
      }

      // ---- GPX ----
      if (path === "/api/gpx") {
        if (req.method === "GET") {
          const { results } = await env.DB.prepare("SELECT * FROM gpx ORDER BY created_at DESC").all();
          return json({ gpx: results }, 200, origin);
        }
        if (write) {
          const b = await body(req);
          const id = uid();
          await env.DB.prepare(
            `INSERT INTO gpx (id,created_at,name,distance_km,denivele_m,region,start_point,type,url,added_by)
             VALUES (?,?,?,?,?,?,?,?,?,?)`
          ).bind(id, now(), b.name||"", Number(b.distance_km)||0, Number(b.denivele_m)||0,
                 b.region||"", b.start_point||"", b.type||"Boucle", b.url||"", b.added_by||"").run();
          return json({ id }, 200, origin);
        }
      }

      return json({ error: "not found", path }, 404, origin);
    } catch (e) {
      return json({ error: "server", detail: String(e && e.message || e) }, 500, origin);
    }
  },
};

function parseMember(r) {
  return { ...r, distances: safe(r.distances), terrains: safe(r.terrains) };
}
function parseRace(r) {
  return { ...r, distances: safe(r.distances) };
}
function safe(s) { try { return JSON.parse(s || "[]"); } catch (e) { return []; } }
