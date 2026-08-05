# Backend — API espace membre (Cloudflare Worker)

`src/index.js` est **le code source du Worker Cloudflare** qui fait tourner l'espace
membre du site (connexion par code, courses, inscriptions, GPX, membres).

> ⚠️ **Source unique.** Ce fichier doit rester le reflet **exact** du Worker
> déployé sur Cloudflare. Toute modification côté serveur passe d'abord ici
> (commit), puis est redéployée — jamais l'inverse. C'est ce qui évite de
> « perdre » la version en ligne (comme ça a été le cas pour l'endpoint delete).

## Routes

| Méthode | Route | Rôle |
|--------|-------|------|
| POST | `/api/auth` | Connexion par code unique → jeton de session |
| GET/POST | `/api/invites`, `/api/invites/revoke` | Gestion des codes (orga, en-tête `x-ttc-admin`) |
| GET/POST | `/api/members` | Fiches membres (lecture connecté, écriture = sa fiche) |
| GET/POST | `/api/races` | Liste / création de courses |
| POST | `/api/races/:id/join` · `/leave` · `/delete` | S'inscrire · se retirer · **supprimer la course** |
| GET/POST | `/api/gpx` | Parcours GPX partagés (avec réactions « fait » + commentaires agrégés) |
| POST | `/api/gpx/:id/edit` | Modifier une trace (nom, région, type, lien, officielle, **infos en plus**) — tout membre connecté |
| POST | `/api/gpx/:id/done` | Toggle « je l'ai fait » + emoji d'humeur (1 par membre/trace) — `{done:true,emoji}` ou `{done:false}` |
| POST | `/api/gpx/:id/comment` | Ajouter un commentaire lié à son profil — `{text}` |
| POST | `/api/gpx/:id/comment/:cid/delete` | Supprimer son propre commentaire (ou orga) |

> **Tables auto-créées.** `gpx_done` et `gpx_comments` sont créées automatiquement
> au premier appel (`CREATE TABLE IF NOT EXISTS`), aucune migration manuelle à
> lancer côté D1. La « région » côté site utilise l'autocomplétion de lieux
> OpenStreetMap / Nominatim (gratuit, sans clé, appelée depuis le navigateur).

## Déployer une mise à jour

**Option simple (dashboard) :** dash.cloudflare.com → Workers & Pages →
`ttc-espace-membre` → **Edit code** → colle le contenu de `src/index.js` → **Deploy**.

**Option ligne de commande (wrangler) :**
```bash
cd backend
wrangler deploy
```

## Variables / secrets (côté Cloudflare, jamais dans le code)

- `MEMBER_PASS` — clé secrète de signature des jetons de session
- `ADMIN_SECRET` — secret orga pour la gestion des codes
- `ALLOWED_ORIGINS` — domaines autorisés (CORS)
- `DB` — binding vers la base D1

Le site pointe vers le Worker via `window.TTC_API` dans `member-config.js` (racine du repo).
