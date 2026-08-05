// Configuration de l'espace membre TTC.
// ⬇️ Après avoir déployé le Worker Cloudflare (voir backend/DEPLOY.md),
//    colle son URL ici, commit + push. Les pages Courses / GPX / Membres
//    deviennent alors live. Tant que c'est vide, elles affichent un mode démo.
window.TTC_API = "https://ttc-espace-membre.toutterrainclub.workers.dev";

// URL d'intégration de ton Google Agenda public (Agenda → Paramètres → Intégrer →
// « Code d'intégration » → l'URL dans src="..."). Vide = section agenda en attente.
window.TTC_AGENDA_EMBED = "https://calendar.google.com/calendar/embed?src=c_a0d826577e55d74820c66e89e2bcf0f0df5f9357eafd7c40f5d354a8eb9b2677%40group.calendar.google.com&ctz=Europe%2FParis";

// Code d'accès du club : demandé UNE fois, à la création du compte (invitation).
// Ensuite, on entre juste avec son e-mail + mot de passe. (Soft-gate : visible ici,
// comme le reste — c'est un club, pas un coffre-fort.)
window.TTC_CLUB_CODE = "T2Tfestival";

// --- Compte membre (source de vérité = le compte, pas l'appareil) ----------
window.ttcAuth = {
  get: function () { try { return JSON.parse(localStorage.getItem("ttc_auth") || "null"); } catch (e) { return null; } },
  set: function (a) { try { localStorage.setItem("ttc_auth", JSON.stringify(a)); localStorage.setItem("ttc_member_id", a.id); sessionStorage.setItem("ttc_member_ok", "1"); } catch (e) {} },
  logout: function () { try { localStorage.removeItem("ttc_auth"); sessionStorage.removeItem("ttc_member_ok"); } catch (e) {} },
};

// --- Helpers API (plain JS, chargés avant les pages) -----------------------
// Le mot de passe club sert aux écritures courses/GPX ; on le connaît (soft-gate).
window.ttcPass = function () {
  try { return sessionStorage.getItem("ttc_pass") || window.TTC_CLUB_CODE || ""; } catch (e) { return window.TTC_CLUB_CODE || ""; }
};
window.ttcToken = function () { const a = window.ttcAuth.get(); return a && a.token ? a.token : ""; };
window.ttcConfigured = function () { return !!(window.TTC_API && window.TTC_API.trim()); };

window.ttcApi = async function (path, opts) {
  opts = opts || {};
  if (!window.ttcConfigured()) throw new Error("backend-not-configured");
  const headers = Object.assign({ "content-type": "application/json" }, opts.headers || {});
  const method = opts.method || "GET";
  if (method !== "GET") { headers["x-ttc-pass"] = window.ttcPass(); headers["x-ttc-token"] = window.ttcToken(); }
  const res = await fetch(window.TTC_API.replace(/\/+$/, "") + path, {
    method,
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  if (!res.ok) throw new Error("api-" + res.status);
  return res.json();
};
