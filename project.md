# Ayla Noor — Photographer

A single-page portfolio for a fashion and portrait photographer. The work is
presented as a stack of album sleeves you scroll through; opening one turns it
into a magazine that swings open on its spine into a two-page spread.

Three files, no build step, no dependencies:

```
Ayla/
├── index.html   markup + meta (8 KB)
├── style.css    all styling (20 KB)
├── script.js    all behaviour (30 KB)
└── project.md   this file
```

Open `index.html` in a browser, or serve the folder with any static server.
Hosting: drop the folder on Netlify, Vercel, GitHub Pages, or any shared host.

---

## 1. The idea

The brief went through several shapes (a spine shelf, a vinyl crate, a cover
flow) and settled on one metaphor, carried everywhere:

> **The portfolio is a stack of magazines.**

Everything on the site is a consequence of that one idea:

| Element | Why it looks like that |
| --- | --- |
| Albums lying flat in a stack | A pile of magazines on a table, seen at an angle |
| Coloured edge band on each | The printed spine, with issue number, title, genre, year |
| Clicking opens a spread | You pick a magazine up and open it |
| Loader | The same magazine, thumbed through while the photos load |
| Paper-coloured text page | Actual stock, not a UI panel |
| "Plate 01", "p. 04", "No. 03" | Print language instead of web language |

**Design rules kept throughout**

- One typeface (Inter), one accent idea (the photo's own colour), no decoration
  that isn't paper, ink or light.
- Editorial photography only — fashion, portrait, still life. No stock-looking
  landscapes.
- Motion is physical: things hinge, fall, slide and settle. Nothing bounces,
  spins or fades for decoration.
- Chrome stays out of the way: three floating glass controls, nothing else.

---

## 2. Screens

**The stack (home).** Albums scroll vertically in an endless loop. The one in
the middle shows its edge band straight on; the others tilt away above and
below. Scroll, drag, swipe, arrow keys, or the dock arrows move it.

**The spread (a series).** The album flies to the centre, becomes a magazine
cover with a masthead, swings open, and lands as a spread: text page on the
left, full-bleed photograph on the right. Closing reverses the whole thing.

**About.** Portrait with an availability badge, a short lead paragraph, three
short lists (what I shoot / kit / published in) and contact buttons. Opens as a
circle growing from the avatar button.

**Index.** All 15 series as a numbered list with a colour swatch per row.
Hovering a row floats that photograph next to the cursor, tilting with the
speed of the mouse; the other rows dim. Clicking a row opens its spread,
growing out of the hovered preview.

---

## 3. Content: how to edit

Everything editable lives at the top of `script.js` in the `projects` array.
One entry per series:

```js
{ f: "work",                        // "work" = Commissions tab, "lab" = Personal tab
  t: "Crimson",                     // title (stack edge, spread, index)
  tags: "Fashion campaign",         // genre line
  y: 2026,                          // year
  client: "Casa Ormeño",            // shown on the spread + index
  fmt: "Hasselblad 500C/M · Portra 400",   // camera / film line
  img: "1662532577856-e8ee8b138a8b",       // Unsplash photo id
  s: "#6b1f1b",                     // edge band colour
  sf: "#f1e6dc",                    // text colour printed on that band
  d: "Spring campaign for …" }      // paragraph on the spread
```

- **Order** is the display order. Numbering (`No. 03`, `p. 06`) is derived.
- **Counts** are automatic — add or remove entries freely. With very few
  entries the stack repeats them to keep the loop seamless (`Math.ceil(20 / n)`
  copies, in `render()`).
- **Tab labels** ("Commissions", "Personal") are in `index.html`; the `f` keys
  stay `work` / `lab`.
- **About copy**, contact links and the availability badge are plain markup in
  `index.html`.
- **Portrait photo**: the `PORTRAIT` constant in `script.js`.

### Using your own photographs

Replace the `src()` helper in `script.js`:

```js
// now:  Unsplash, resized per use
const src = (id, w = 800, h = w, q = 68) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=${q}`;

// with your own files (put square crops in Ayla/photos/):
const src = id => `photos/${id}.webp`;
```

Then set `img` to the filename, e.g. `img: "crimson"`. Export square crops at
about 1400 px, as WebP or AVIF. Keep the colour fields — they are what ties each
spine, swatch and spread tint to its photograph.

---

## 4. Design system

### Colour

Everything is a CSS custom property, defined twice in `style.css` — once on
`:root` (light) and once under `[data-theme="dark"]`.

| Token | Role | Light | Dark |
| --- | --- | --- | --- |
| `--bg-top` / `--bg-bottom` | page gradient | `#eef1f5` → `#d5dce4` | `#1b1c20` → `#0a0a0c` |
| `--fg` / `--muted` | text | `#111214` / `#6e6e73` | `#f4f4f2` / `#8e8e93` |
| `--glass` / `--glass-edge` | floating controls | white 72% | charcoal 60% |
| `--sheet` | full-screen panels | `#eef1f5` | `#0f0f11` |
| `--paper` / `--ink` | magazine pages | `#f5f1ea` / `#161513` | `#181715` / `#ece7de` |
| `--ld-bg` | loader background | `#f5f1ea` | `#0e0d0c` |
| `--ok` | available dot | `#34c759` | same |

Per-series colours (`s`, `sf`) come from the data, not the theme, so the spines
stay the same in both modes. The spread tints its background with the open
series' colour: `color-mix(in srgb, var(--tint) 20%, var(--sheet))`.

Theme choice is stored in `localStorage` and applied by a tiny inline script in
`<head>` **before first paint**, so there is no flash of the wrong theme.

### Type

Inter only, variable weights 400–800, with tight tracking on headlines
(`-.035em` to `-.06em`). Three recurring roles:

- **Display** — series titles, "Index", the masthead. 600–800, very tight.
- **Body** — the spread paragraph, About lead. 400–600.
- **Caps** (`.caps`) — 11 px, `letter-spacing: .18em`, uppercase. Used for every
  print-like label: spine text, plate captions, page heads and folios.

Numbers use `font-variant-numeric: tabular-nums` so counters don't jitter.

### Spacing and scale

The two 3D scenes size themselves from one number each, so every detail scales
together:

- **Stack**: `--w` (album size) and `--d` (edge thickness), from `sizes()`.
- **Spread / loader**: `--P` (one page), set when the sheet opens.

Type inside them is expressed as a fraction of that number
(`font-size: calc(var(--P) * .12)`), with `max()` floors so nothing becomes
unreadable on small screens.

---

## 5. How the 3D works

Both the stack and the magazine avoid nested `preserve-3d`, because nested 3D
contexts are flattened by some renderers (this broke an earlier version). Every
3D element instead carries its **own complete transform**, including its own
`perspective()` where needed.

### The stack (`layout()` in script.js)

Each album is **two sibling elements**: a square `.cover` and a thin `.edge`
band. For album *k* at distance *o* from the centre:

```
y     = o * step                       vertical position
tilt  = ±(90 − 12 · min(|o|,1))        edge faces you; eases to 90° at centre
cover = translateY(y) translateZ(z) rotateX(tilt) translateZ(d/2)
edge  = same base, then translateY(±w/2) rotateX(∓90)
```

Because the tilt eases to exactly 90° at the centre, the moment an album crosses
the middle and flips from "above" to "below" is invisible.

- **Looping**: `o` is wrapped into ±n/2, so the stack is endless. Albums past
  the viewport are set `visibility: hidden` and skipped entirely.
- **Lighting**: `--shade` is written per frame and drives a gradient — albums
  darken toward the edge that tilts away, with a sheen near the spine.
- **Cheap frames**: the loop caches the last values per element and writes only
  what changed; off-screen albums return early.

### The spread (`openDetail()`)

Three stacked elements in a 2-column grid: `.page.text`, `.page.photo`, and the
`.leaf` (the cover) sitting on top of the photo page. The open sequence hinges
them in turn:

1. `.leaf` flies from the album's on-screen rectangle into place (FLIP: measure
   both rects, animate the difference).
2. `.leaf` rotates `0° → −90°` about its left edge (its spine).
3. `.page.text` rotates `90° → 0°` about its right edge, landing as the left page.

On phones (`innerWidth < 760`) the pages stack vertically and the hinge becomes
`rotateX` — same code, one variable (`hinge()`).

---

## 6. Motion reference

Two easings do nearly all the work:

- `--ease` `cubic-bezier(.7,0,.2,1)` — decisive moves (flights, reveals).
- `--out` `cubic-bezier(.2,.8,.2,1)` — small UI settles (hovers, pills).
- Page turns use an asymmetric pair: `cubic-bezier(.5,0,.9,.45)` lifting away,
  `cubic-bezier(.1,.55,.25,1)` landing — paper accelerates off the spine and
  decelerates onto the table.

| Moment | Timing |
| --- | --- |
| Loader: cover arrives | 420 ms |
| Loader: cover opens / left page lands | 380 / 440 ms |
| Loader: page turn | 190 ms, then 95 ms once it gets going |
| Loader: close, settle into stack | 300 + 400 + 600 ms |
| Stack: album rises in | 720 ms, 45 ms stagger from the centre out |
| Stack: glide to the next album | exponential ease, ~105 ms time constant |
| Series: album → cover | 620 ms |
| Series: cover opens / text page lands | 430 / 520 ms |
| Series: close | 340 + 430 + 560 ms |
| Sheets: circle reveal / close | 650 / 480 ms |
| Theme switch | 800 ms circular wipe |
| Copy reveal | 800 ms rise, 60 ms stagger; headlines 20 ms per letter |

The stack glide is **time-based** (`1 − e^(−dt/105)`), so it feels identical on
60 Hz and 120 Hz displays. A single wheel flick is clamped to 1.5 albums.

`prefers-reduced-motion: reduce` collapses every duration to 1 ms, and the
loader skips its page-turn loop.

---

## 7. Performance

| Decision | Effect |
| --- | --- |
| Images requested at display size, rounded to 100 px steps and capped at device-pixel-ratio 2 | one cached file per photo instead of three |
| The loader's pages reuse the **album cover URLs** | the loader costs no extra downloads |
| Only the visible tab's 9 photos block the loader | the other 6 load quietly afterwards |
| About portrait loads on open; index thumbnails are `loading="lazy"` | nothing unseen is fetched |
| Per-frame diffing in `layout()`, off-screen early-return | ~10 style writes × 40 elements per frame avoided |
| No framework, no build | 57 KB of code total, 18 KB gzipped |

First load is roughly **400 KB of photographs**, largest ~77 KB.

### Never-stuck guarantees

Browsers freeze the animation clock in a background tab. Without care, a site
loaded in a background tab would come back to a frozen loader. So:

- every awaited animation is raced against a timeout of its own length,
- the whole loader sequence is raced against a 7 second deadline,
- the loading counter is driven by elapsed time, not frames,
- any reveal still mid-flight after 2.5 s is forced visible (`.shown`).

---

## 8. Accessibility and input

- Every control is a real `<button>` with an `aria-label`; panels are native
  `<dialog>`s, so focus is trapped and **Esc** closes them (and still plays the
  closing animation, via `cancel`).
- Albums are focusable; **Enter** opens the focused one, arrow keys move the
  stack, and focus rings are visible.
- Tabs use `aria-pressed`; the stack is a labelled `<main>`.
- Tooltips are decorative only — every button also has an `aria-label`, and
  tooltips are hidden on touch devices.
- Input methods: wheel/trackpad, drag, swipe, arrow keys, dock buttons, and the
  Index. A drag never triggers a click (5 px threshold).
- `<noscript>` explains the page needs JavaScript and gives the email.

---

## 9. Browser support

Chrome, Edge, Safari and Firefox, current versions. Specifically used:
CSS custom properties, 3D transforms, `color-mix()`, `:has()`, `backdrop-filter`,
`<dialog>`, the Web Animations API, and `mask-image`.

Graceful degradations:

- **View Transitions** (the theme wipe) are Chromium-only — elsewhere the theme
  just switches instantly.
- `:has()` drives the "dim the other index rows" effect only.
- Everything else has no fallback by design; these are all baseline features in
  2026 browsers.

---

## 10. Before publishing

The site is finished; the content is not. All of this is invented placeholder
material:

- **Name, email, Instagram/Prints/Agency links.**
- **Clients and magazines** — Casa Ormeño, Salon Quarterly, Hemline, Arte Paper,
  Atelier Blanc, Lune Swim, Studio Havn, The Soft Riots, Studio Marmo. Publishing
  invented credits under a real name is a real problem; replace them.
- **Camera/film lines and the About copy.**
- **Every photograph** is from Unsplash and belongs to someone else. Fine while
  prototyping (Unsplash asks for photographer credit), but a photographer's
  portfolio needs their own work. Swapping them also removes the dependency on
  Unsplash's servers.
- **"View the full series ↗"** on each spread points at `#`.

Also worth adding: a real social share image (currently the first Unsplash
photo), and a `sitemap.xml` if the site ever gains more pages.

---

## 11. Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| Loader runs its full 7 seconds | photos are slow or blocked; check the network tab, or host the images yourself |
| Albums appear but photos don't | `src()` is pointing at ids that don't exist — check the `img` values |
| Edge text is unreadable on a colour | adjust that series' `sf` (text) against `s` (band) |
| The stack feels too big or small | `sizes()` in `script.js`: the `500` cap is the album's maximum width |
| The spread is cramped on a laptop | `openDetail()`: the `600` cap is the maximum page size |
| Everything animates instantly | the OS "reduce motion" setting is on — by design |

---

## 12. Possible next steps

- Multiple photographs per series (the spread becomes several spreads you page
  through — the page-turn animation already exists in the loader).
- Deep links (`/#crimson`) so a series can be shared directly.
- A print-style contact sheet view as a third tab.
- Self-hosted Inter and self-hosted images, for a site with no third-party
  requests at all.
