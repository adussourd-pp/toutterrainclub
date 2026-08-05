# Déployer l'API de l'espace membre (Cloudflare, gratuit)

L'API fait tourner : **Courses** (créer / s'inscrire), **Partage GPX**, **Tous les membres**.
Site (GitHub Pages) → appelle ce Worker → base de données D1. Tout est gratuit dans les quotas Cloudflare.

## 1. Pré-requis (une fois)
```bash
npm install -g wrangler       # l'outil Cloudflare
wrangler login                # ouvre le navigateur, connexion à ton compte Cloudflare
```
> Pas encore de compte ? Crée-le gratuitement sur https://dash.cloudflare.com/sign-up

## 2. Créer la base D1
```bash
cd backend
wrangler d1 create ttc-membre
```
Copie l'`database_id` renvoyé et colle-le dans `backend/wrangler.toml` (ligne `database_id`).

## 3. Créer les tables
```bash
wrangler d1 execute ttc-membre --file=schema.sql --remote
```

## 4. Poser le mot de passe membre (protège les écritures)
```bash
wrangler secret put MEMBER_PASS
# quand il demande la valeur, tape :  T2Tfestival
```

## 5. Déployer
```bash
wrangler deploy
```
Wrangler affiche une URL du type `https://ttc-espace-membre.<ton-sous-domaine>.workers.dev`.

## 6. Brancher le site
Ouvre `member-config.js` (à la racine du repo) et colle l'URL :
```js
window.TTC_API = "https://ttc-espace-membre.xxxx.workers.dev";
```
Commit + push → les pages Courses / GPX / Membres deviennent live. Fini.

## Notes
- **Lectures** ouvertes (tout le monde peut voir). **Écritures** (créer une course, s'inscrire, déposer un GPX) exigent le mot de passe membre, envoyé automatiquement par le site quand tu as déverrouillé l'espace.
- Pour changer les domaines autorisés : `ALLOWED_ORIGINS` dans `wrangler.toml`, puis `wrangler deploy`.
- Sauvegarde ponctuelle : `wrangler d1 export ttc-membre --output=backup.sql --remote`.
