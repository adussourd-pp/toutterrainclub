// TTC — Tampons éditions (SVG 2D réutilisables)
// Chaque tampon = art plat viewBox 440x440. L'état grisé/coloré est géré en CSS
// (filtre grayscale sur .tampon), pas ici.

const TamponMercantour = ({ className = "tampon" }) => (
  <svg className={className} viewBox="0 0 440 440" role="img" aria-label="Tampon Mercantour">
    <defs>
      <clipPath id="tmeC"><circle cx="220" cy="220" r="168"/></clipPath>
      <path id="tmeT" d="M220,220 m-176,0 a176,176 0 0,1 352,0"/>
      <path id="tmeB" d="M220,220 m-192,0 a192,192 0 0,0 384,0"/>
    </defs>
    <circle cx="220" cy="220" r="200" fill="#e23a2a"/>
    <circle cx="220" cy="220" r="200" fill="none" stroke="#2a1310" strokeWidth="4"/>
    <circle cx="220" cy="220" r="169" fill="none" stroke="#2a1310" strokeWidth="3"/>
    <g clipPath="url(#tmeC)">
      <circle cx="220" cy="220" r="168" fill="#7cc0ec"/>
      <circle cx="150" cy="132" r="32" fill="#ffd23f"/>
      <g fill="#ffffff" opacity=".92"><ellipse cx="302" cy="122" rx="28" ry="11"/><ellipse cx="322" cy="132" rx="18" ry="8"/></g>
      <path d="M60 300 L128 224 L200 300 Z" fill="#3d7aa6"/>
      <path d="M242 300 L306 232 L366 300 Z" fill="#3d7aa6"/>
      <path d="M40 372 L220 128 L400 372 Z" fill="#6b7b86"/>
      <path d="M220 128 L400 372 L300 372 Z" fill="#516069"/>
      <path d="M182 190 L220 128 L258 190 L236 181 L220 192 L204 181 Z" fill="#ffffff"/>
      <path d="M62 360 Q220 346 380 366 L380 392 L62 392 Z" fill="#fff3f0"/>
    </g>
    <text x="220" y="256" textAnchor="middle" fontFamily="Inter Tight" fontWeight="900" fontSize="42" letterSpacing="-2" fill="#fff2f0">MERCANTOUR</text>
    <text x="220" y="290" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="700" fontSize="20" letterSpacing="2" fill="#fff2f0">GELAS · 3143 M</text>
    <text fontFamily="JetBrains Mono" fontWeight="700" fontSize="22" letterSpacing="7" fill="#fff2f0"><textPath href="#tmeT" startOffset="50%" textAnchor="middle">TRAIL · TO · TECHNO</textPath></text>
    <text fontFamily="JetBrains Mono" fontWeight="500" fontSize="15" letterSpacing="3" fill="rgba(255,242,240,.9)"><textPath href="#tmeB" startOffset="50%" textAnchor="middle">GORDOLASQUE · AOÛT 2026</textPath></text>
  </svg>
);

const TamponRaclette = ({ className = "tampon" }) => (
  <svg className={className} viewBox="0 0 440 440" role="img" aria-label="Tampon Raclette">
    <defs>
      <clipPath id="traC"><circle cx="220" cy="220" r="168"/></clipPath>
      <path id="traT" d="M220,220 m-176,0 a176,176 0 0,1 352,0"/>
      <path id="traB" d="M220,220 m-192,0 a192,192 0 0,0 384,0"/>
    </defs>
    <circle cx="220" cy="220" r="200" fill="#e2892e"/>
    <circle cx="220" cy="220" r="200" fill="none" stroke="#3a2410" strokeWidth="4"/>
    <circle cx="220" cy="220" r="169" fill="none" stroke="#3a2410" strokeWidth="3"/>
    <g clipPath="url(#traC)">
      <circle cx="220" cy="220" r="168" fill="#cfe6f2"/>
      <g fill="#ffffff" opacity=".92"><ellipse cx="118" cy="118" rx="28" ry="11"/><ellipse cx="96" cy="128" rx="18" ry="8"/></g>
      <g fill="#ffffff" opacity=".92"><ellipse cx="312" cy="126" rx="26" ry="10"/><ellipse cx="332" cy="135" rx="16" ry="7"/></g>
      <path d="M40 372 L112 196 L196 300 L262 206 L352 300 L400 224 L400 372 Z" fill="#b6cdd9"/>
      <path d="M52 372 L134 224 L206 306 L250 178 L322 300 L392 232 L392 372 Z" fill="#8fb0c9"/>
      <path d="M250 178 L233 208 L250 200 L267 208 Z" fill="#ffffff"/>
      <path d="M134 224 L120 250 L134 243 L148 250 Z" fill="#ffffff"/>
      <path d="M262 206 L249 230 L262 224 L275 230 Z" fill="#ffffff"/>
      <g fill="#245c3b"><path d="M84 360 l15 -38 l15 38 Z"/></g>
      <g fill="#245c3b"><path d="M326 360 l15 -38 l15 38 Z"/></g>
      <path d="M52 348 Q220 334 388 352 L388 392 L52 392 Z" fill="#ffffff"/>
      <g fill="#1f5a38"><path d="M118 358 l16 -44 l16 44 Z"/></g>
      <g fill="#1f5a38"><path d="M296 358 l16 -44 l16 44 Z"/></g>
      <g>
        <path d="M146 336 L220 290 L294 336 Z" fill="#4a2c17"/>
        <path d="M162 334 L220 300 L278 334 Z" fill="#8a5a2b"/>
        <rect x="205" y="312" width="12" height="14" fill="#e4d09a"/>
        <rect x="223" y="312" width="12" height="14" fill="#e4d09a"/>
        <rect x="166" y="334" width="108" height="5" fill="#5f3d1e"/>
        <rect x="168" y="339" width="104" height="20" fill="#f4ece0"/>
        <rect x="207" y="343" width="26" height="16" fill="#7a4a24"/>
        <g fill="#bcd2d8"><rect x="178" y="343" width="17" height="12"/><rect x="245" y="343" width="17" height="12"/></g>
      </g>
      <g fill="#2f7a49"><path d="M126 360 l12 -32 l12 32 Z"/></g>
      <g fill="#2f7a49"><path d="M300 360 l12 -32 l12 32 Z"/></g>
      <path d="M150 356 A18 18 0 0 1 186 356 Z" fill="#f6b53f"/>
      <path d="M150 356 A18 18 0 0 1 186 356" fill="none" stroke="#b96a1e" strokeWidth="3.5"/>
      <path d="M160 356 q5 9 8 0 z M174 356 q5 9 8 0 z" fill="#f6b53f"/>
    </g>
    <text x="220" y="244" textAnchor="middle" fontFamily="Inter Tight" fontWeight="900" fontSize="46" letterSpacing="-1.5" fill="#3a2410">RACLETTE</text>
    <text x="220" y="280" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="700" fontSize="20" letterSpacing="2" fill="#3a2410">1505 M · ALBAREA</text>
    <text fontFamily="JetBrains Mono" fontWeight="700" fontSize="22" letterSpacing="7" fill="#fff8ef"><textPath href="#traT" startOffset="50%" textAnchor="middle">TRAIL · TO · TECHNO</textPath></text>
    <text fontFamily="JetBrains Mono" fontWeight="500" fontSize="15" letterSpacing="3.5" fill="rgba(255,248,239,.9)"><textPath href="#traB" startOffset="50%" textAnchor="middle">PEIRA CAVA · JANV. 2026</textPath></text>
  </svg>
);

const TamponMontChauve = ({ className = "tampon" }) => (
  <svg className={className} viewBox="0 0 440 440" role="img" aria-label="Tampon Mont Chauve">
    <defs>
      <clipPath id="tmcC"><circle cx="220" cy="220" r="168"/></clipPath>
      <path id="tmcT" d="M220,220 m-176,0 a176,176 0 0,1 352,0"/>
      <path id="tmcB" d="M220,220 m-192,0 a192,192 0 0,0 384,0"/>
    </defs>
    <circle cx="220" cy="220" r="200" fill="#7ddf64"/>
    <circle cx="220" cy="220" r="200" fill="none" stroke="#12271b" strokeWidth="4"/>
    <circle cx="220" cy="220" r="169" fill="none" stroke="#12271b" strokeWidth="3"/>
    <g clipPath="url(#tmcC)">
      <circle cx="220" cy="220" r="168" fill="#d3f0dc"/>
      <circle cx="150" cy="138" r="34" fill="#ffd23f"/>
      <g fill="#ffffff" opacity=".92"><ellipse cx="300" cy="120" rx="30" ry="12"/><ellipse cx="322" cy="131" rx="20" ry="9"/></g>
      <path d="M62 300 Q160 262 260 288 T392 292 L392 392 L62 392 Z" fill="#7fd07f"/>
      <path d="M52 372 L150 236 L176 206 L268 206 L290 236 L388 372 Z" fill="#2f8a45"/>
      <path d="M52 372 L150 236 L176 206 L222 206 L200 372 Z" fill="#54b566"/>
      <path d="M92 322 Q220 298 348 324" fill="none" stroke="#1a5e33" strokeWidth="2" opacity=".55"/>
      <path d="M112 356 Q220 338 330 356" fill="none" stroke="#1a5e33" strokeWidth="2" opacity=".45"/>
      <g fill="#1a5e33" opacity=".7"><path d="M122 346 l3 -9 l3 9 Z"/><path d="M300 348 l3 -9 l3 9 Z"/><path d="M170 362 l3 -8 l3 8 Z"/><path d="M266 362 l3 -8 l3 8 Z"/></g>
      <ellipse cx="222" cy="216" rx="52" ry="6" fill="#0f2a1a" opacity=".3"/>
      <rect x="176" y="198" width="92" height="16" fill="#b3a892"/>
      <rect x="230" y="198" width="38" height="16" fill="#8f8672"/>
      <rect x="176" y="195" width="92" height="4" fill="#c9bfa8"/>
      <rect x="214" y="189" width="20" height="10" fill="#bcb096"/>
      <rect x="224" y="189" width="10" height="10" fill="#948b76"/>
      <ellipse cx="190" cy="196" rx="17" ry="6" fill="#c7bda6"/>
      <ellipse cx="190" cy="195" rx="17" ry="5.5" fill="none" stroke="#8f8672" strokeWidth="1.4"/>
      <g fill="#5c5647"><rect x="184" y="204" width="3" height="6"/><rect x="192" y="204" width="3" height="6"/><rect x="200" y="204" width="3" height="6"/><rect x="240" y="204" width="3" height="6"/><rect x="248" y="204" width="3" height="6"/><rect x="256" y="204" width="3" height="6"/></g>
      <path d="M52 360 Q220 346 392 366 L392 392 L52 392 Z" fill="#17572e"/>
    </g>
    <text x="220" y="262" textAnchor="middle" fontFamily="Inter Tight" fontWeight="900" fontSize="40" letterSpacing="-1.5" fill="#fafaf7">MONT CHAUVE</text>
    <text x="220" y="296" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="700" fontSize="20" letterSpacing="2" fill="#fafaf7">FORT · 854 M</text>
    <text fontFamily="JetBrains Mono" fontWeight="700" fontSize="22" letterSpacing="7" fill="#fafaf7"><textPath href="#tmcT" startOffset="50%" textAnchor="middle">TRAIL · TO · TECHNO</textPath></text>
    <text fontFamily="JetBrains Mono" fontWeight="500" fontSize="16" letterSpacing="4" fill="rgba(255,255,255,.85)"><textPath href="#tmcB" startOffset="50%" textAnchor="middle">NICE · OCT. 2025</textPath></text>
  </svg>
);

window.Tampons = { TamponMercantour, TamponRaclette, TamponMontChauve };

// ===== État "collection" : tampon grisé -> coloré au clic, persistant =====
window.unlockEdition = function (slug) {
  try { localStorage.setItem("ttc_unlock_" + slug, "1"); } catch (e) {}
  document.querySelectorAll('[data-ed="' + slug + '"]').forEach(function (el) {
    el.classList.add("unlocked");
  });
};
window.applyEditionUnlocks = function () {
  document.querySelectorAll("[data-ed]").forEach(function (el) {
    var s = el.getAttribute("data-ed");
    try { if (localStorage.getItem("ttc_unlock_" + s) === "1") el.classList.add("unlocked"); } catch (e) {}
  });
};
document.addEventListener("DOMContentLoaded", function () { setTimeout(window.applyEditionUnlocks, 250); });
window.addEventListener("load", function () { setTimeout(window.applyEditionUnlocks, 500); });
