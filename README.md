# Tout Terrain Club — site vitrine

Site statique prêt à publier. Aucune étape de build : les pages chargent React + Babel depuis un CDN et s'affichent directement dans le navigateur.

## Pages
- `index.html` — Accueil
- `trail-to-techno.html` — Le concept Trail to Techno
- `edition-mercantour.html` — Édition Mercantour (en cours)
- `edition-raclette.html` — Édition Raclette (archive)
- `edition-mont-chauve.html` — Édition Mont Chauve (archive)
- `adhesion-2027.html` — Adhésion / liste d'attente

Ressources : `styles.css`, `data.jsx`, `atoms.jsx`, `hero.jsx`, `sections.jsx`, `t2t.jsx`, `mercantour.jsx`, `raclette.jsx`, `montchauve.jsx`, `adhesion.jsx`, `tweaks-panel.jsx`, et le dossier `img/`.

## Mettre en ligne (GitHub Pages)
1. Crée un repo sur GitHub et pousse **le contenu de ce dossier `site/`** à la racine du repo (donc `index.html` doit être à la racine, pas dans un sous-dossier).
   ```bash
   git init
   git add .
   git commit -m "Site TTC"
   git branch -M main
   git remote add origin https://github.com/<ton-compte>/<ton-repo>.git
   git push -u origin main
   ```
2. Sur GitHub : **Settings → Pages → Build and deployment → Source : Deploy from a branch**, branche `main`, dossier `/ (root)`. Sauvegarde.
3. L'URL `https://<ton-compte>.github.io/<ton-repo>/` est active en 1–2 min.

> Une connexion internet est requise côté visiteur (React/Babel via CDN). Pour une version 100 % hors-ligne d'une page, demande l'export « standalone ».

## Domaine perso (optionnel)
Ajoute un fichier `CNAME` à la racine contenant ton domaine (ex. `toutterrainclub.fr`), puis configure les DNS chez ton registrar vers GitHub Pages.

## Nom de fichier
Les liens internes utilisent des slugs sans accents (`edition-mercantour.html`, etc.) — ne renomme pas les fichiers sous peine de casser la navigation.

## Mettre à jour le site (sans tout refaire)
Une fois le repo en place, chaque modif se fait **fichier par fichier** — pas besoin de tout repousser.

**Où se trouve quoi**
- Textes / contenus (dates, intros, avantages adhésion…) → `data.jsx`
- Header, footer, logo, liens Insta/Strava → `atoms.jsx`
- Accueil (hero, sections) → `hero.jsx`, `sections.jsx`
- Page concept Trail to Techno → `t2t.jsx`
- Pages éditions → `mercantour.jsx`, `raclette.jsx`, `montchauve.jsx`
- Page adhésion → `adhesion.jsx`
- Styles / couleurs → `styles.css`
- Photos → dossier `img/` (garde le même nom de fichier pour ne rien casser)

**Workflow de mise à jour**
```bash
git pull                       # récupère la dernière version
# … tu édites 1 ou 2 fichiers …
git add data.jsx styles.css    # seulement les fichiers changés
git commit -m "MAJ dates + couleur"
git push                       # GitHub Pages se régénère tout seul (~1 min)
```

**Remplacer une photo** : dépose la nouvelle image dans `img/` sous **le même nom** que l'ancienne (ex. `img/ttc-flags.jpg`), commit, push. Aucun autre fichier à toucher.

