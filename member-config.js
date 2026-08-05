// Configuration de l'espace membre TTC.
// ⬇️ Après avoir déployé le Worker Cloudflare (voir backend/DEPLOY.md),
//    colle son URL ici, commit + push. Les pages Courses / GPX / Membres
//    deviennent alors live. Tant que c'est vide, elles affichent un mode démo.
window.TTC_API = "https://ttc-espace-membre.toutterrainclub.workers.dev";

// URL d'intégration de ton Google Agenda public (Agenda → Paramètres → Intégrer →
// « Code d'intégration » → l'URL dans src="..."). Vide = section agenda en attente.
window.TTC_AGENDA_EMBED = "https://calendar.google.com/calendar/embed?src=c_a0d826577e55d74820c66e89e2bcf0f0df5f9357eafd7c40f5d354a8eb9b2677%40group.calendar.google.com&ctz=Europe%2FParis";

// --- Accès membre : le CODE unique EST l'accès (pas de mot de passe) --------
// La session (jeton signé par le serveur) est gardée sur l'appareil.
window.ttcAuth = {
  get: function () { try { return JSON.parse(localStorage.getItem("ttc_auth") || "null"); } catch (e) { return null; } },
  set: function (a) { try { localStorage.setItem("ttc_auth", JSON.stringify(a)); localStorage.setItem("ttc_member_id", a.id); sessionStorage.setItem("ttc_member_ok", "1"); } catch (e) {} },
  logout: function () { try { localStorage.removeItem("ttc_auth"); sessionStorage.removeItem("ttc_member_ok"); } catch (e) {} },
};

// --- Helpers API (plain JS, chargés avant les pages) -----------------------
// Le jeton part sur TOUTES les requêtes : l'espace (même en lecture) est privé.
window.ttcToken = function () { const a = window.ttcAuth.get(); return a && a.token ? a.token : ""; };
window.ttcConfigured = function () { return !!(window.TTC_API && window.TTC_API.trim()); };

window.ttcApi = async function (path, opts) {
  opts = opts || {};
  if (!window.ttcConfigured()) throw new Error("backend-not-configured");
  const headers = Object.assign({ "content-type": "application/json" }, opts.headers || {});
  const method = opts.method || "GET";
  const tok = window.ttcToken();
  if (tok) headers["x-ttc-token"] = tok;
  const res = await fetch(window.TTC_API.replace(/\/+$/, "") + path, {
    method,
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  if (!res.ok) throw new Error("api-" + res.status);
  return res.json();
};
