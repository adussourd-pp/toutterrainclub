-- Schéma D1 de l'espace membre TTC. Appliqué via :
--   wrangler d1 execute ttc-membre --file=backend/schema.sql --remote

CREATE TABLE IF NOT EXISTS members (
  id         TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  prenom     TEXT,
  pseudo     TEXT,
  ville      TEXT,
  avatar     TEXT,
  niveau     TEXT,
  distances  TEXT,   -- JSON array
  terrains   TEXT,   -- JSON array
  objectif   TEXT,
  strava     TEXT,
  insta      TEXT,
  techno     TEXT,
  adhesion   TEXT
);

CREATE TABLE IF NOT EXISTS races (
  id         TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  name       TEXT NOT NULL,
  date_start TEXT,
  date_end   TEXT,
  location   TEXT,
  type       TEXT,   -- 'trail' | 'route' | 'autre'
  distances  TEXT,   -- JSON array (ex: ["20K","50K","100K"])
  site_url   TEXT,
  created_by TEXT
);

CREATE TABLE IF NOT EXISTS participations (
  id         TEXT PRIMARY KEY,
  race_id    TEXT NOT NULL,
  member     TEXT NOT NULL,   -- prénom / pseudo affiché
  distance   TEXT,
  status     TEXT,            -- 'inscrit' | 'chaud'
  strava     TEXT,
  insta      TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS gpx (
  id          TEXT PRIMARY KEY,
  created_at  TEXT NOT NULL,
  name        TEXT,
  distance_km REAL,
  denivele_m  INTEGER,
  region      TEXT,
  start_point TEXT,
  type        TEXT,   -- 'Boucle' | 'Aller-retour' | ...
  url         TEXT,   -- lien vers la trace (Strava, Komoot, fichier…)
  added_by    TEXT
);

CREATE INDEX IF NOT EXISTS idx_part_race ON participations(race_id);
CREATE INDEX IF NOT EXISTS idx_races_date ON races(date_start);
