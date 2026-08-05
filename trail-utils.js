// Utilitaires trail (plain JS, chargé avant les pages membre).
// km-effort UTMB (= km + D+/100), catégorie 20K/50K/100K/100M, difficulté,
// et parseur GPX (distance, D+, profil altimétrique) côté navigateur.
window.TTC_TRAIL = (function () {
  function kmEffort(km, dplus) {
    return Math.round((Number(km) || 0) + (Number(dplus) || 0) / 100);
  }
  // Catégorie UTMB d'après le km-effort (seuils alignés sur la nomenclature
  // UTMB World Series : 20K / 50K / 100K / 100M).
  function utmbCategory(km, dplus) {
    const e = kmEffort(km, dplus);
    if (e < 20) return { code: "—", full: "Sortie courte (< 20K-effort)" };
    if (e < 50) return { code: "20K", full: "20K · 20–49 km-effort" };
    if (e < 100) return { code: "50K", full: "50K · 50–99 km-effort" };
    if (e < 175) return { code: "100K", full: "100K · 100–174 km-effort" };
    return { code: "100M", full: "100M · 175 km-effort et +" };
  }
  // Difficulté (5 crans) d'après le km-effort.
  function difficulty(km, dplus) {
    const e = kmEffort(km, dplus);
    if (e < 12) return { label: "Facile", cls: "d1" };
    if (e < 30) return { label: "Modéré", cls: "d2" };
    if (e < 55) return { label: "Soutenu", cls: "d3" };
    if (e < 90) return { label: "Difficile", cls: "d4" };
    return { label: "Extrême", cls: "d5" };
  }
  function haversine(a, b) {
    const R = 6371000, rad = (x) => (x * Math.PI) / 180;
    const dp = rad(b.lat - a.lat), dl = rad(b.lon - a.lon);
    const s = Math.sin(dp / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dl / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(s));
  }
  // Extrait les points d'un GPX (texte) → [{lat, lon, ele}]
  function extractPts(text) {
    const doc = new DOMParser().parseFromString(text, "application/xml");
    const nodes = doc.getElementsByTagName("trkpt");
    const pts = [];
    for (let i = 0; i < nodes.length; i++) {
      const p = nodes[i];
      const lat = parseFloat(p.getAttribute("lat"));
      const lon = parseFloat(p.getAttribute("lon"));
      const eleN = p.getElementsByTagName("ele")[0];
      const ele = eleN ? parseFloat(eleN.textContent) : null;
      if (isFinite(lat) && isFinite(lon)) pts.push({ lat, lon, ele });
    }
    return pts;
  }
  const escXml = (s) => String(s == null ? "" : s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
  // Reconstruit un GPX propre à partir des points (lat/lon/altitude uniquement).
  // On jette time + extensions (hr/cad/power/atemp…) — ~85 % du poids d'un
  // export Strava, et zéro information sur le tracé lui-même. `step` permet un
  // sous-échantillonnage (1 = tous les points, précision pleine).
  function buildGPX(pts, name, step) {
    step = Math.max(1, step || 1);
    const parts = [
      '<?xml version="1.0" encoding="UTF-8"?>\n',
      '<gpx version="1.1" creator="Tout Terrain Club" xmlns="http://www.topografix.com/GPX/1/1">\n',
      " <trk>\n  <name>" + escXml(name || "trace") + "</name>\n  <trkseg>\n",
    ];
    const push = (p) => {
      let s = '   <trkpt lat="' + p.lat.toFixed(6) + '" lon="' + p.lon.toFixed(6) + '">';
      if (p.ele != null && isFinite(p.ele)) s += "<ele>" + p.ele.toFixed(1) + "</ele>";
      parts.push(s + "</trkpt>\n");
    };
    for (let i = 0; i < pts.length; i += step) push(pts[i]);
    if ((pts.length - 1) % step !== 0) push(pts[pts.length - 1]); // garde le dernier point
    parts.push("  </trkseg>\n </trk>\n</gpx>\n");
    return parts.join("");
  }

  // --- Compression gzip via l'API navigateur (CompressionStream) ---
  function bytesToB64(bytes) {
    let bin = ""; const CH = 0x8000;
    for (let i = 0; i < bytes.length; i += CH) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CH));
    return btoa(bin);
  }
  function b64ToBytes(b64) {
    const bin = atob(b64); const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  async function gzipToB64(str) {
    const stream = new Blob([str]).stream().pipeThrough(new CompressionStream("gzip"));
    const buf = await new Response(stream).arrayBuffer();
    return bytesToB64(new Uint8Array(buf));
  }
  async function gunzipFromB64(b64) {
    const stream = new Blob([b64ToBytes(b64)]).stream().pipeThrough(new DecompressionStream("gzip"));
    return await new Response(stream).text();
  }

  // Prépare un GPX pour le stockage, quelle que soit sa taille :
  //   1. on garde TOUS les points (aucune perte de précision du tracé) ;
  //   2. on retire les extensions/horodatage inutiles au partage ;
  //   3. on compresse en gzip (base64) → un export de 21 Mo tient en ~0,4 Mo.
  // Renvoie { gpxz } (compressé) ou { gpx } (repli si CompressionStream absent).
  // Le sous-échantillonnage n'intervient qu'en tout dernier recours (fichier
  // gigantesque qui dépasse encore la limite une fois compressé).
  async function packGPX(text, name, cap) {
    const budget = cap || 1.9 * 1024 * 1024; // marge sous la limite D1 (2 Mo/valeur)
    const pts = extractPts(text);
    if (pts.length < 2) throw new Error("gpx-vide");
    const kept = (step) => Math.floor((pts.length - 1) / step) + 1;
    const canGz = typeof CompressionStream !== "undefined";
    let step = 1, gpx = buildGPX(pts, name, step);
    if (canGz) {
      let b64 = await gzipToB64(gpx);
      while (b64.length > budget && step < 64) { step += 1; gpx = buildGPX(pts, name, step); b64 = await gzipToB64(gpx); }
      return { gpxz: b64, step, points: kept(step), srcBytes: text.length, storedBytes: b64.length, full: step === 1 };
    }
    // Repli navigateur sans compression : on décime juste assez pour tenir.
    while (gpx.length > budget && step < 64) { step += 1; gpx = buildGPX(pts, name, step); }
    return { gpx, step, points: kept(step), srcBytes: text.length, storedBytes: gpx.length, full: step === 1 };
  }
  // Parse un fichier GPX (texte) → {km, dplus, eleMin, eleMax, profile:[{d,e}]}
  function parseGPX(text) {
    const pts = extractPts(text);
    if (pts.length < 2) throw new Error("gpx-vide");
    let dist = 0, prev = null;
    const cum = [], eles = [];
    for (const p of pts) {
      if (prev) dist += haversine(prev, p);
      if (p.ele != null && isFinite(p.ele)) eles.push(p.ele);
      cum.push({ d: dist / 1000, ele: p.ele });
      prev = p;
    }
    // D+ avec seuil de 4 m pour lisser le bruit GPS
    let dplus = 0, last = null;
    for (const p of pts) {
      if (p.ele == null || !isFinite(p.ele)) continue;
      if (last == null) { last = p.ele; continue; }
      if (p.ele - last >= 4) { dplus += p.ele - last; last = p.ele; }
      else if (p.ele < last) { last = p.ele; }
    }
    // profil échantillonné à ~120 points
    const N = 120, prof = [];
    const step = Math.max(1, Math.floor(cum.length / N));
    for (let i = 0; i < cum.length; i += step) {
      if (cum[i].ele != null && isFinite(cum[i].ele)) prof.push({ d: +cum[i].d.toFixed(2), e: Math.round(cum[i].ele) });
    }
    const lastPt = cum[cum.length - 1];
    if (lastPt.ele != null) prof.push({ d: +lastPt.d.toFixed(2), e: Math.round(lastPt.ele) });
    return {
      km: +(dist / 1000).toFixed(1),
      dplus: Math.round(dplus),
      eleMin: eles.length ? Math.round(Math.min.apply(null, eles)) : null,
      eleMax: eles.length ? Math.round(Math.max.apply(null, eles)) : null,
      profile: prof,
    };
  }
  return { kmEffort, utmbCategory, difficulty, parseGPX, packGPX, gunzipFromB64 };
})();
