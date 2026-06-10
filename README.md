# Financieel Slim Website

Een educatieve website met 4 onderdelen rond financiele geletterdheid:
- Geld verdienen & belastingen
- Omgaan met geld
- Sparen
- Beleggen

## Functionaliteiten

- Startpagina met hero, voortgangsbalk, 4 onderwerpkaarten en game-map
- Onderwerppagina met:
  - video
  - korte theorie
  - oefening met externe simulatie (Wikifin)
  - praktijkvoorbeeld met meerkeuze
  - quiz met score
  - vorige/volgende navigatie
- Lokale voortgangsopslag (`localStorage`)

## Lokaal starten

```bash
npm install
npm run dev
```

## GitHub Pages deployment

Deze setup werkt op twee manieren:

### Optie 1: Automatisch met GitHub Actions (aanbevolen)

Er staat al een workflow in `.github/workflows/deploy.yml`.

1. Push deze code naar een GitHub repository (bij voorkeur branch `main`).
2. Ga naar `Settings` -> `Pages`.
3. Kies bij Source: `GitHub Actions`.
4. Push daarna een nieuwe commit naar `main` of start de workflow handmatig via `Actions`.

### Optie 2: Handmatig met `gh-pages`

1. Initialiseer git en koppel `origin`:

```bash
git init
git branch -M main
git remote add origin https://github.com/<jouw-gebruikersnaam>/<jouw-repo>.git
```

2. Run deployment:

```bash
npm run deploy
```

Je site staat daarna op:
`https://<jouw-gebruikersnaam>.github.io/<jouw-repo>/`

## Opmerking

`vite.config.js` gebruikt automatisch de repositorynaam in productie via `GITHUB_REPOSITORY`, met `Victor` als fallback.
