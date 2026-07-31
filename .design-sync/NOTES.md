# design-sync — notes repo

## Nature du repo (important)
Le site TTC est **statique** : React + Babel chargés depuis un CDN, `.jsx` transpilés
**dans le navigateur** (`<script type="text/babel">`). Il n'y a **ni build, ni Storybook,
ni package npm** d'origine.

Pour que `/design-sync` fonctionne, on a **scaffolder un package de composants** sous
`design-system/` :
- `design-system/src/index.jsx` = les composants de `atoms.jsx` du site, **portés à
  l'identique** en modules ES (React importé, composants exportés).
- `design-system/dist/index.mjs` = bundle esbuild (`npm run build`).
- `design-system/dist/index.d.ts` = **contrats de props écrits à la main** (le repo n'a pas
  de TypeScript). **À maintenir en phase avec `src/index.jsx`** si on ajoute/modifie un composant.
- `design-system/styles.css` = copie de `styles.css` du site (tokens + classes).
- `design-system/fonts.css` + `design-system/fonts/*.woff2` = polices de marque
  (Inter Tight, JetBrains Mono, Caveat) embarquées via `cfg.extraFonts`.

## Commandes (depuis la racine du repo)
```
# build du package
(cd design-system && npm run build)
# converter
export DS_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome   # cf. ci-dessous
node .ds-sync/package-build.mjs --config .design-sync/config.json \
  --node-modules ./design-system/node_modules --entry ./design-system/dist/index.mjs --out ./ds-bundle
node .ds-sync/package-validate.mjs ./ds-bundle
```

## Chromium / playwright
`package-validate.mjs` et `package-capture.mjs` acceptent `DS_CHROMIUM_PATH` (executablePath).
Dans cet environnement web : `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
**Le numéro de build (1194) peut changer** selon la session — vérifier avec
`ls /opt/pw-browsers` et ajuster, sinon `playwright install chromium`.

## Known render warns (triage OK, non bloquant)
- `[FONT_MISSING] "Bradley Hand"` : c'est le **fallback système volontaire** derrière Caveat
  (`--f-hand: 'Caveat','Bradley Hand',cursive`). On accepte le substitut système. Non bloquant.

## Composants — points d'attention
- `HeroWaves` et `HandArrow` sont des **décors de hero positionnés en absolu**, **masqués
  sous 900px** par le CSS du site (`@media(max-width:900px){display:none}`). Rendus via
  `cfg.overrides` en `cardMode:"single"` + `viewport:"1000x…"` pour les montrer en contexte large.
- Les 4 bandes pleine largeur (`HeaderPublic`, `PromoStrip`, `PartnersBand`, `FooterPublic`)
  sont en `cardMode:"column"`.
- Les boutons/badges/tags de niveau du site ne sont **pas** des composants React : ce sont
  des **classes CSS** (`.btn`, `.chip`, …) — elles partent via `styles.css`/tokens, documentées
  dans `conventions.md`, pas comme composants.

## Re-sync risks (à surveiller à la prochaine sync)
- **Upload jamais effectué** : l'authentification design-system était **impossible depuis
  claude.ai/code (web)**. Aucun `projectId` dans la config → la première sync **authentifiée**
  créera un nouveau projet Claude Design (défaut premier import). Pour débloquer l'auth :
  « Send to Claude Code Web » depuis Claude Design, ou `/design-login` en terminal.
- `design-system/dist/` est **commité** (le `.d.ts` écrit à la main y vit) ; `npm run build`
  régénère `index.mjs`. Si on modifie `src/index.jsx`, **mettre à jour `index.d.ts`** à la main.
- `styles.css` du package est une **copie** de celui du site — si le site évolue, resynchroniser
  la copie (ou pointer `cfg.cssEntry` vers `../styles.css`).
