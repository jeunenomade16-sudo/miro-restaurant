# Miro Restaurant & Lounge — Site web

Site vitrine du **Miro Restaurant & Lounge** (Alger) et de sa galerie d'art **Idlès Art Gallery**.

Site statique (HTML / CSS / JavaScript vanilla) — aucune étape de build.

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Landing page du restaurant : hero vidéo, carte, carrousel de plats, section galerie d'art, contact. |
| `gallery.html` | Idlès Art Gallery : expositions, catalogue d'œuvres (filtres + lightbox), espace artistes, contact (bilingue FR/EN). |

## Fichiers

- `styles.css` — styles de la galerie
- `app.js` — interactions de la galerie (filtres, lightbox, switch FR/EN, formulaires)
- `logo.png` — logo Miro Restaurant & Lounge
- `hero.mp4` — vidéo de fond du hero
- `gallery_interior.png` — visuel intérieur
- `art-*.png` — œuvres du catalogue (générées)

## Développement local

Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```bash
npx serve .
```

## Déploiement

Hébergé sur **Vercel** (site statique, `index.html` à la racine).
