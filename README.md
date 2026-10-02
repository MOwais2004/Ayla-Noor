# Ayla Noor — Photographer Portfolio

A single-page portfolio where every series is a magazine. Scroll through an endless 3D stack of album sleeves; open one and it flies to centre, swings open on its spine, and lands as a two-page spread.

**No framework. No build step. No dependencies.** 57 KB of code, 18 KB gzipped.

```
Ayla/
├── index.html   markup + meta
├── style.css    all styling
├── script.js    all behaviour + content
└── project.md   full design & technical notes
```

## Quick start

Open `index.html`, or serve the folder:

```bash
npx serve .
```

Deploy by dropping the folder on Netlify, Vercel, GitHub Pages, or any static host.

## Features

- **3D magazine stack** — endless vertical loop, per-frame lighting, pure CSS transforms (no WebGL)
- **Spread view** — FLIP flight + hinged page turns; switches to vertical hinge on mobile
- **Loader** — the magazine thumbs through itself while photos load
- **Index** — numbered list with a cursor-following preview that tilts with mouse speed
- **About** — circular reveal from the avatar button
- **Light / dark** — no flash on load, circular wipe via View Transitions
- **Input** — wheel, trackpad, drag, swipe, arrow keys, dock buttons
- **Accessible** — native `<dialog>`s, real buttons, `aria-label`s, focus rings, `prefers-reduced-motion` support
- **Never stuck** — every animation is timeout-raced, so background tabs don't freeze the loader

## Editing content

All content lives in the `projects` array at the top of `script.js`:

```js
{ f: "work",                 // "work" = Commissions, "lab" = Personal
  t: "Crimson",              // title
  tags: "Fashion campaign",  // genre
  y: 2026,                   // year
  client: "Casa Ormeño",
  fmt: "Hasselblad 500C/M · Portra 400",
  img: "crimson",            // photo id / filename
  s: "#6b1f1b",              // spine colour
  sf: "#f1e6dc",             // spine text colour
  d: "Spring campaign for …" }
```

Order, numbering, and counts are automatic. Tab labels, About copy, and contact links are in `index.html`. Portrait: `PORTRAIT` constant in `script.js`.

### Using your own photos

```js
const src = id => `photos/${id}.webp`;
```

Export square crops at ~1400 px as WebP/AVIF into `photos/`.

## Tuning

| Want to change | Where |
| --- | --- |
| Album size | `sizes()` in `script.js` — `500` cap |
| Spread page size | `openDetail()` — `600` cap |
| Colours | CSS custom properties in `style.css` (`:root` + `[data-theme="dark"]`) |
| Easing / timing | `--ease`, `--out` in `style.css` |

## Browser support

Current Chrome, Edge, Safari, Firefox. View Transitions (theme wipe) are Chromium-only and degrade to an instant switch.

## Before publishing

All names, clients, credits, and links are placeholders. Photos are from Unsplash — replace with your own work. See `project.md` §10.

## Docs

Full design system, 3D maths, motion timings, performance notes, and troubleshooting: [`project.md`](project.md).
