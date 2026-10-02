/* ===========================================================================
   Ayla Noor — Photographer
   One file, no dependencies. Sections, in order:
     1. Content (edit this)      5. Series spread (open / close)
     2. Helpers                  6. About + Index sheets
     3. Album stack              7. Input (drag, wheel, keys, theme, tabs)
     4. Frame loop               8. Loader
   =========================================================================== */

/* ---------- 1. content: the only part you normally edit ---------- */
// f:      "work" = commissions tab, "lab" = personal tab
// img:    Unsplash photo id — the part after /photo- in the URL.
//         For your own photos use a path instead and simplify src() below.
// s / sf: the spine colour and the text colour printed on it
// d:      the paragraph shown on the spread
const projects = [
  { f: "work", t: "Crimson",   tags: "Fashion campaign", y: 2026, client: "Casa Ormeño",      fmt: "Hasselblad 500C/M · Portra 400", img: "1662532577856-e8ee8b138a8b", s: "#6b1f1b", sf: "#f1e6dc", d: "Spring campaign for a Madrid tailoring house. One red suit, one blue sky, two days on a rooftop." },
  { f: "work", t: "Salon",     tags: "Editorial",        y: 2026, client: "Salon Quarterly",  fmt: "Mamiya RZ67 · Ektar 100",        img: "1580478491436-fd6a937acc9e", s: "#4d4f2f", sf: "#ece6d2", d: "Eight portraits for the autumn issue, shot in the hallway of a 1920s apartment with whatever light came through the door." },
  { f: "work", t: "Satin",     tags: "Bridal lookbook",  y: 2025, client: "Atelier Blanc",    fmt: "Canon R5 · 85mm",                img: "1664076458686-3449062080ac", s: "#e6e0d4", sf: "#1b1a18", d: "A bridal collection photographed like a sculpture study: one model, one dress, a white wall and hard shadow." },
  { f: "work", t: "Blue Hour", tags: "Menswear",         y: 2025, client: "Hemline Magazine", fmt: "Leica SL2 · 50mm",               img: "1629511565591-a1d494ad6c58", s: "#1f4a55", sf: "#e4efee", d: "A menswear story built around one teal backdrop and the half hour after sunset." },
  { f: "work", t: "Noir",      tags: "Portraits",        y: 2025, client: "Arte Paper",       fmt: "Pentax 67 · Tri-X 400",          img: "1606143412458-acc5f86de897", s: "#1c1c1d", sf: "#e9e5de", d: "Black and white portraits of dancers from the national ballet, taken between rehearsals." },
  { f: "work", t: "Undertow",  tags: "Swimwear",         y: 2024, client: "Lune Swim",        fmt: "Contax G2 · Portra 800",         img: "1635693326273-deb65058e836", s: "#8d967c", sf: "#161a12", d: "A swimwear story shot at dawn in a flooded quarry. Nobody stayed dry." },
  { f: "work", t: "Cobalt",    tags: "Runway",           y: 2024, client: "Studio Havn",      fmt: "Fujifilm GFX 100",               img: "1554412893-166e997f6c88", s: "#2a3d98", sf: "#e8ebfa", d: "Backstage and runway for a Copenhagen show — 1,400 frames in eleven minutes." },
  { f: "work", t: "Loud",      tags: "Music portraits",  y: 2023, client: "The Soft Riots",   fmt: "Nikon F3 · bare flash",          img: "1735293840436-b6950d1cdb1a", s: "#e3cf96", sf: "#1d1a10", d: "Press pictures for a soul band’s second record, lit with one bare flash and a lot of noise." },
  { f: "work", t: "Terrazzo",  tags: "Campaign",         y: 2023, client: "Studio Marmo",     fmt: "Hasselblad X2D",                 img: "1779405762706-04608ddd5440", s: "#a8613c", sf: "#f6e9dc", d: "Pattern on pattern, on location in Lisbon, for a textile studio’s summer line." },
  { f: "lab",  t: "Delft",     tags: "Still life",       y: 2026, client: "Personal",         fmt: "Sinar 4×5 · Velvia 50",          img: "1570426359438-e9d176f6de97", s: "#2e4775", sf: "#e6ecf6", d: "My grandmother’s painted jugs, lit like a Dutch painting on her kitchen shelf." },
  { f: "lab",  t: "Seville",   tags: "Still life",       y: 2025, client: "Personal",         fmt: "Mamiya RB67 · Portra 160",       img: "1706231071827-a3cbe337caa6", s: "#c05a26", sf: "#fbeee3", d: "Bitter oranges, photographed every morning for a month as they ripened and rotted." },
  { f: "lab",  t: "Brim",      tags: "Studio study",     y: 2025, client: "Personal",         fmt: "Canon R5 · 100mm",               img: "1582312045465-89660bf8968b", s: "#a3845a", sf: "#1d160c", d: "Hats as sculpture. A small series about shadow, shape and the faces they hide." },
  { f: "lab",  t: "Tailored",  tags: "Street",           y: 2024, client: "Personal",         fmt: "Leica M6 · HP5",                 img: "1613915617430-8ab0fd7c6baf", s: "#bcb5a8", sf: "#1a1916", d: "Good coats on the streets of Milan in February, mostly shot from the hip." },
  { f: "lab",  t: "Curls",     tags: "Portraits",        y: 2024, client: "Personal",         fmt: "Pentax 67 · Portra 160",         img: "1612928414075-bc722ade44f1", s: "#d6b6ab", sf: "#231714", d: "Portraits of women who stopped straightening their hair, and what changed." },
  { f: "lab",  t: "Still",     tags: "Portraits",        y: 2023, client: "Personal",         fmt: "Mamiya 7 · Portra 400",          img: "1517462964-21fdcec3f25b", s: "#2e3a2f", sf: "#e5ece4", d: "Long-exposure portraits taken in complete silence, one minute each." },
];
const PORTRAIT = "1563170446-9c3c0622d8a9";       // the About portrait + avatar

/* ---------- 2. helpers ---------- */
const DPR = Math.min(devicePixelRatio || 1, 2);
const src = (id, w = 800, h = w, q = 68) => `https://images.unsplash.com/photo-${id}?w=${Math.round(w)}&h=${Math.round(h)}&fit=crop&auto=format&q=${q}`;
// one shared size for every album cover, rounded so each photo is fetched once and cached
const px = (n, cap) => Math.min(cap, Math.ceil(n * DPR / 100) * 100);
const coverSrc = p => src(p.img, px(sizes().W, 900));
const $ = s => document.querySelector(s);
const pad = n => String(n).padStart(2, "0");
const wait = ms => new Promise(r => setTimeout(r, ms));
const clamp01 = v => Math.max(0, Math.min(1, v));
const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const dur = ms => reduce ? 1 : ms;
const EASE = "cubic-bezier(.7,0,.2,1)";
const html = document.documentElement;
// Waits for an animation, but never longer than its own length: a backgrounded tab freezes the
// animation clock, and nothing that follows should be stuck behind it.
const ended = a => Promise.race([
  a.finished.catch(() => {}),
  wait((+a.effect?.getTiming?.().duration || 600) + (+a.effect?.getTiming?.().delay || 0) + 250),
]);

$("#avatar").src = src(PORTRAIT, 44 * DPR);
const loadPortrait = () => { const el = $("#portrait"); if (!el.src) el.src = src(PORTRAIT, 640, 800); };   // only when About opens

// wraps each character in a span so a headline can lift letter by letter
const split = (el, text) => {
  let i = 0;
  el.innerHTML = text.split(" ").map(w => `<span class="w">${[...w].map(c => `<span class="ch" style="--i:${i++}">${c}</span>`).join("")}</span>`).join(" ");
};

/* ---------- 3. album stack ---------- */
const stage = $("#stage"), nowEl = $("#now");
let list = [], covers = [], edges = [], filter = "work";
let pos = 0, target = 0, raf = 0, introStart = Infinity, booting = true;
let picked = -1, pickP = 0, pickAnim = null, hidePicked = false, nowShown = -1;

function render() {
  list = projects.filter(p => p.f === filter);
  const items = Array.from({ length: Math.ceil(20 / list.length) }, () => list).flat();   // loop wrap stays off screen
  stage.innerHTML = items.map(p => {
    const i = projects.indexOf(p);
    const s = `--img:url(${coverSrc(p)});--s:${p.s};--sf:${p.sf}`;
    return `<div class="cover" data-i="${i}" tabindex="0" role="button" aria-label="Open ${p.t}" style="${s}"></div>
            <div class="edge" style="${s}" aria-hidden="true"><i>${pad(list.indexOf(p) + 1)}</i><b>${p.t}</b><span>${p.tags} — ’${String(p.y).slice(2)}</span></div>`;
  }).join("");
  covers = [...stage.querySelectorAll(".cover")];
  edges = [...stage.querySelectorAll(".edge")];
  pos = target = 0; picked = -1; pickP = 0; hidePicked = false; nowShown = -1;
}

// every album is the same size; `step` is the spacing between them
function sizes() {
  const W = Math.round(Math.max(220, Math.min(innerWidth - 56, 500, (innerHeight - 180) * .92)));
  return { W, D: Math.round(Math.max(24, W * .048)), step: Math.min((innerHeight - 140) / 5.6, W * .32) };
}

function layout(now = performance.now()) {
  const { W, D, step } = sizes();
  html.style.setProperty("--w", W + "px"); html.style.setProperty("--d", D + "px");
  const n = covers.length;
  covers.forEach((cover, k) => {
    let o = ((k - pos) % n + n) % n;
    if (o > n / 2) o -= n;                                     // wrap: infinite loop
    const a = Math.abs(o), below = o > 0;
    let y = o * step, z = 0, tilt = (below ? 1 : -1) * (90 - 12 * Math.min(a, 1));   // edge faces you; eases to 90° at centre so the side swap is invisible
    let b = 1 - Math.min(a, 5) * .03;

    const ip = 1 - Math.pow(1 - clamp01((now - introStart - Math.min(a, 6) * 45) / 720), 4);   // intro: rise in, centre first
    y += (1 - ip) * innerHeight * .8;

    if (picked >= 0) {                                         // click: chosen album to the centre, the rest step back
      if (k === picked) { y *= 1 - pickP; z = pickP * 140; tilt *= 1 - pickP; }
      else { y += Math.sign(o || 1) * pickP * W * .55; b *= 1 - .5 * pickP; }
    }
    // only write what actually changed — this runs for every album, every frame
    const edge = edges[k], was = cover._s || (cover._s = {});
    const off = Math.abs(y) > innerHeight / 2 + W || ip === 0;
    const vis = off ? "hidden" : "";
    if (was.vis !== vis) cover.style.visibility = edge.style.visibility = was.vis = vis;
    if (off) return;
    const base = `translateY(${y.toFixed(1)}px) translateZ(${z.toFixed(1)}px) rotateX(${tilt.toFixed(2)}deg)`;
    if (was.base !== base) {
      was.base = base;
      cover.style.transform = `${base} translateZ(${D / 2}px)`;
      edge.style.transform = `${base} translateY(${below ? W / 2 : -W / 2}px) rotateX(${below ? -90 : 90}deg)`;
      cover.style.setProperty("--shade", (Math.abs(tilt) / 90 * .6).toFixed(2));
    }
    if (was.below !== below) { cover.classList.toggle("r", below); was.below = below; }
    const zi = k === picked ? 999 : 500 - Math.round(a * 10);
    if (was.zi !== zi) { cover.style.zIndex = zi; edge.style.zIndex = zi + 1; was.zi = zi; }
    const op = k === picked && hidePicked ? 0 : +ip.toFixed(2);
    if (was.op !== op) { cover.style.opacity = edge.style.opacity = op; was.op = op; }
    const f = b < 1 ? `brightness(${b.toFixed(2)})` : "";
    if (was.f !== f) { cover.style.filter = edge.style.filter = f; was.f = f; }
  });
  updateNow();
}

const centreIndex = () => { const n = covers.length; return ((Math.round(target) % n) + n) % n; };
function updateNow() {
  if (!covers.length) return;
  const i = +covers[centreIndex()].dataset.i;
  if (i === nowShown) return;
  nowShown = i;
  const p = projects[i];
  nowEl.querySelector("b").textContent = p.t;
  nowEl.querySelector("span").textContent = `${p.tags} · ${p.y}`;
  if (!reduce) nowEl.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 350, easing: "ease-out" });
}

/* ---------- 4. frame loop ---------- */
let lastFrame = 0;
function frame(now) {
  raf = 0;
  // time-based easing, so the glide feels identical on a 60Hz and a 120Hz screen
  const dt = Math.min(now - (lastFrame || now - 16), 50); lastFrame = now;
  pos += (target - pos) * (1 - Math.exp(-dt / 105));
  if (Math.abs(target - pos) < .001) pos = target;
  if (pickAnim) {
    const t = clamp01((now - pickAnim.t0) / pickAnim.dur);
    pickP = pickAnim.from + (pickAnim.to - pickAnim.from) * easeInOut(t);
    if (t === 1) { const done = pickAnim.done; pickAnim = null; done && done(); }
  }
  layout(now);
  if (pos !== target || pickAnim || now < introStart + 1150) raf = requestAnimationFrame(frame);
}
const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
const busy = () => booting || pickAnim || picked >= 0 || document.querySelector("dialog[open]");
const moveTo = t => { if (busy()) return; target = t; kick(); };
const animatePick = (to, done) => { pickAnim = { t0: performance.now(), from: pickP, to, dur: dur(520), done }; kick(); };
const rise = () => { introStart = performance.now(); kick(); };

function pick(k) {
  if (busy()) return;
  picked = k;
  animatePick(1, () => openDetail(+covers[k].dataset.i, covers[k].getBoundingClientRect()));
}

/* ---------- 5. series: album → magazine cover → opens into a spread ---------- */
const detail = $("#detail"), book = $("#book"), leaf = $("#leaf"), pageText = $("#pageText"), pagePhoto = $("#pagePhoto"), dBg = $("#dBg");
const flip = (a, b) => `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width}, ${a.height / b.height})`;
const P3D = "perspective(2200px) ";
const hinge = () => book.classList.contains("v") ? "rotateX" : "rotateY";   // phones: pages stack, so the fold is horizontal

function openDetail(i, fromRect) {
  const p = projects[i], group = projects.filter(q => q.f === p.f), n = group.indexOf(p), no = pad(n + 1);
  const v = innerWidth < 760;
  const P = Math.floor(v ? Math.min(innerWidth - 32, (innerHeight - 110) / 2) : Math.min((innerWidth - 120) / 2, innerHeight - 170, 600));
  detail.style.setProperty("--tint", p.s);
  book.classList.toggle("v", v);
  book.style.setProperty("--P", P + "px");

  const big = src(p.img, px(P, 1400));
  pagePhoto.querySelector("img").src = leaf.querySelector("img").src = big;
  pagePhoto.querySelector("figcaption").textContent = `Plate ${no} — ${p.t}`;
  leaf.querySelector(".lf-issue").textContent = `No. ${no} — ${p.y}`;
  leaf.querySelector(".lf-title").textContent = p.t;
  leaf.querySelector(".lf-genre").textContent = `${p.tags} · ${p.client}`;
  pageText.querySelector(".pg-no").textContent = `No. ${no} — ${p.f === "work" ? "Commission" : "Personal"}`;
  pageText.querySelector(".pg-year").textContent = p.y;
  split(pageText.querySelector(".pg-title"), p.t);
  pageText.querySelector(".pg-dek").textContent = p.d;
  pageText.querySelector(".pg-meta").innerHTML = [["Client", p.client], ["Genre", p.tags], ["Camera", p.fmt]].map(([k, val]) => `<dt>${k}</dt><dd>${val}</dd>`).join("");
  pageText.querySelector(".pg-folio").textContent = `p. ${pad(n * 2 + 2)}`;

  detail.showModal();
  detail.dataset.busy = 1;
  hidePicked = true; layout();
  pageText.style.visibility = pagePhoto.style.visibility = "hidden";
  leaf.style.transformOrigin = "0 0";
  dBg.animate([{ opacity: 0 }, { opacity: 1 }], { duration: dur(450) });

  (async () => {
    // 1. the album flies into place as a magazine cover
    const to = leaf.getBoundingClientRect();
    await ended(fromRect
      ? leaf.animate([{ transform: flip(fromRect, to) }, { transform: "none" }], { duration: dur(620), easing: EASE })
      : leaf.animate([{ opacity: 0, transform: "translateY(30px)" }, { opacity: 1, transform: "none" }], { duration: dur(500), easing: EASE }));
    await wait(dur(90));
    // 2. the cover swings open on its spine…
    pagePhoto.style.visibility = "";
    leaf.style.transformOrigin = v ? "50% 100%" : "0 50%";
    await ended(leaf.animate([{ transform: P3D + hinge() + "(0deg)" }, { transform: P3D + hinge() + "(-90deg)" }],
      { duration: dur(430), easing: "cubic-bezier(.5,0,.9,.45)", fill: "forwards" }));
    // 3. …and lands as the text page, whose copy then sets itself
    pageText.style.visibility = "";
    detail.classList.add("in");
    clearTimeout(detail._sn); detail._sn = setTimeout(() => detail.classList.add("shown"), 2500);
    await ended(pageText.animate([{ transform: P3D + hinge() + "(90deg)" }, { transform: P3D + hinge() + "(0deg)" }],
      { duration: dur(520), easing: "cubic-bezier(.1,.55,.25,1)" }));
    delete detail.dataset.busy;
  })();
}

function resetDetail() {
  [leaf, pageText, pagePhoto, dBg].forEach(el => el.getAnimations().forEach(a => a.cancel()));
  pageText.style.visibility = pagePhoto.style.visibility = "";
  detail.classList.remove("in", "shown"); clearTimeout(detail._sn);
  delete detail.dataset.closing; delete detail.dataset.busy;
}

async function closeDetail() {
  if (detail.dataset.closing || detail.dataset.busy) return;
  detail.dataset.closing = 1;
  const h = hinge();
  // fold the spread shut, then send the cover back into the stack
  await ended(pageText.animate([{ transform: P3D + h + "(0deg)" }, { transform: P3D + h + "(90deg)" }], { duration: dur(340), easing: "cubic-bezier(.5,0,.9,.45)", fill: "forwards" }));
  pageText.style.visibility = "hidden";
  leaf.getAnimations().forEach(a => a.cancel());
  await ended(leaf.animate([{ transform: P3D + h + "(-90deg)" }, { transform: P3D + h + "(0deg)" }], { duration: dur(430), easing: "cubic-bezier(.1,.55,.25,1)" }));
  pagePhoto.style.visibility = "hidden";
  leaf.style.transformOrigin = "0 0";
  const back = picked >= 0
    ? leaf.animate([{ transform: "none" }, { transform: flip(covers[picked].getBoundingClientRect(), leaf.getBoundingClientRect()) }], { duration: dur(560), easing: EASE, fill: "forwards" })
    : leaf.animate([{ opacity: 1 }, { opacity: 0, transform: "translateY(30px)" }], { duration: dur(400), easing: EASE, fill: "forwards" });
  await Promise.all([ended(back), ended(dBg.animate([{ opacity: 1 }, { opacity: 0 }], { duration: dur(650), easing: EASE, fill: "forwards" }))]);
  detail.close();
  resetDetail();
  hidePicked = false;
  if (picked >= 0) animatePick(0, () => { picked = -1; layout(); }); else layout();
}
dBg.onclick = closeDetail;

/* ---------- 6. about + index sheets ---------- */
const circleFrom = el => {
  const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  return [cx, cy, Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy))];
};
function openSheet(d, btn) {
  if (busy()) return;
  const [cx, cy, R] = d._c = circleFrom(btn);
  d.showModal(); d.classList.add("in");
  clearTimeout(d._sn); d._sn = setTimeout(() => d.classList.add("shown"), 2500);     // reveal safety net
  d.animate([{ clipPath: `circle(0px at ${cx}px ${cy}px)` }, { clipPath: `circle(${R}px at ${cx}px ${cy}px)` }], { duration: dur(650), easing: EASE });
}
async function closeSheet(d) {
  if (d.dataset.closing) return;
  d.dataset.closing = 1;
  const [cx, cy, R] = d._c;
  const a = d.animate([{ clipPath: `circle(${R}px at ${cx}px ${cy}px)` }, { clipPath: `circle(0px at ${cx}px ${cy}px)` }], { duration: dur(480), easing: EASE, fill: "forwards" });
  await ended(a);
  d.close(); d.classList.remove("in", "shown"); clearTimeout(d._sn); a.cancel(); delete d.dataset.closing;
}
const closeAny = d => d === detail ? closeDetail() : closeSheet(d);
document.querySelectorAll("dialog").forEach(d => {
  d.addEventListener("cancel", e => { e.preventDefault(); closeAny(d); });           // Esc animates out too
  d.querySelector("[data-close]").onclick = () => closeAny(d);
  d.addEventListener("close", () => {                                                // browser force-closed it: tidy up
    if (d.dataset.closing) return;
    d.classList.remove("in", "shown"); clearTimeout(d._sn);
    if (d === detail) {
      resetDetail(); hidePicked = false;
      if (picked >= 0 && !pickAnim) animatePick(0, () => { picked = -1; layout(); });
    }
  });
});
$("#aboutBtn").onclick = e => { loadPortrait(); openSheet($("#about"), e.currentTarget); };

const iList = $("#iList"), preview = $("#preview");
function buildIndex() {
  const ordered = [...projects.filter(p => p.f === "work"), ...projects.filter(p => p.f === "lab")];
  $("#iCount").textContent = ordered.length;
  iList.innerHTML = ordered.map((p, n) =>
    `<li style="--i:${n}"><button data-i="${projects.indexOf(p)}"><span class="n">${pad(n + 1)}</span><span class="sw" style="--s:${p.s}"></span><span class="t">${p.t}</span><span class="g">${p.tags} · ${p.client}</span><span class="y">${p.y}</span></button></li>`).join("");
  preview.innerHTML = projects.map((p, i) => `<img data-i="${i}" src="${src(p.img, px(250, 500))}" loading="lazy" decoding="async" alt="">`).join("");
}
// the preview image trails the cursor and tilts with its horizontal speed
let mx = 0, my = 0, fx = 0, fy = 0, fr = 0, fRaf = 0;
function follow() {
  const dx = mx - fx;
  fx += dx * .15; fy += (my - fy) * .15;
  fr += (Math.max(-10, Math.min(10, dx * .05)) - fr) * .15;
  preview.style.transform = `translate(${fx + 28}px, ${fy}px) translateY(-50%) rotate(${fr}deg)`;
  fRaf = Math.abs(dx) + Math.abs(my - fy) + Math.abs(fr) > .3 ? requestAnimationFrame(follow) : 0;
}
$("#index").addEventListener("pointermove", e => {
  if (!preview.classList.contains("on")) { fx = e.clientX; fy = e.clientY; }
  mx = e.clientX; my = e.clientY;
  if (!fRaf) fRaf = requestAnimationFrame(follow);
});
iList.addEventListener("pointerover", e => {
  const b = e.target.closest("button"); if (!b) return;
  preview.querySelectorAll("img").forEach(im => im.classList.toggle("on", im.dataset.i === b.dataset.i));
  preview.classList.add("on");
});
iList.addEventListener("pointerleave", () => preview.classList.remove("on"));
iList.onclick = e => {
  const b = e.target.closest("button"); if (!b) return;
  const from = preview.classList.contains("on") ? preview.getBoundingClientRect() : null;   // the spread grows out of the preview
  preview.classList.remove("on");
  const ix = $("#index"); ix.close(); ix.classList.remove("in", "shown"); clearTimeout(ix._sn);
  openDetail(+b.dataset.i, from);
};
$("#indexBtn").onclick = e => { buildIndex(); openSheet($("#index"), e.currentTarget); };

/* ---------- 7. input ---------- */
let drag = null, dragged = false;
stage.addEventListener("pointerdown", e => { drag = { y: e.clientY, t: target }; dragged = false; });
addEventListener("pointermove", e => {
  if (!drag) return;
  const d = e.clientY - drag.y;
  if (Math.abs(d) > 5) dragged = true;
  if (dragged) moveTo(drag.t - d / sizes().step);
});
addEventListener("pointerup", () => { if (drag && dragged) moveTo(Math.round(target)); drag = null; });
stage.addEventListener("click", e => {
  const el = e.target.closest(".cover, .edge");
  if (!el || dragged) return;
  pick(el.classList.contains("cover") ? covers.indexOf(el) : edges.indexOf(el));
});
let settle;
addEventListener("wheel", e => {
  if (busy()) return;
  const d = (Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX) * .006;
  moveTo(target + Math.max(-1.5, Math.min(1.5, d)));      // one flick shouldn't fling past a dozen albums
  clearTimeout(settle); settle = setTimeout(() => moveTo(Math.round(target)), 150);
}, { passive: true });
document.addEventListener("keydown", e => {
  if (busy()) return;
  if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); moveTo(Math.round(target) - 1); }
  if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); moveTo(Math.round(target) + 1); }
  if (e.key === "Enter") { const el = document.activeElement.closest?.(".cover"); pick(el ? covers.indexOf(el) : centreIndex()); }
});
$("#prevBtn").onclick = () => moveTo(Math.round(target) - 1);
$("#nextBtn").onclick = () => moveTo(Math.round(target) + 1);
nowEl.onclick = () => { if (pos === target) pick(centreIndex()); };

const themeBtn = $("#themeBtn");
const syncTip = () => themeBtn.dataset.tip = html.dataset.theme === "dark" ? "Light mode" : "Dark mode";
syncTip();
themeBtn.onclick = () => {
  const next = html.dataset.theme === "dark" ? "light" : "dark";
  const apply = () => { html.dataset.theme = next; syncTip(); try { localStorage.setItem("theme", next); } catch (e) {} };
  if (!document.startViewTransition || reduce) return apply();          // older browsers just switch
  const [cx, cy, R] = circleFrom(themeBtn);
  const vt = document.startViewTransition(apply);
  vt.finished.catch(() => {});
  vt.ready.then(() => html.animate({ clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${R}px at ${cx}px ${cy}px)`] },
    { duration: 800, easing: EASE, pseudoElement: "::view-transition-new(root)" })).catch(() => {});
};

const segBtns = document.querySelectorAll(".seg button"), ind = $(".seg .ind");
const moveInd = () => { const b = $('.seg [aria-pressed="true"]'); ind.style.width = b.offsetWidth + "px"; ind.style.transform = `translateX(${b.offsetLeft}px)`; };
segBtns.forEach(b => b.onclick = () => {
  if (busy() || b.getAttribute("aria-pressed") === "true") return;
  segBtns.forEach(x => x.setAttribute("aria-pressed", x === b));
  moveInd(); filter = b.dataset.f; render(); rise();
});
document.fonts.ready.then(moveInd);
addEventListener("resize", () => { layout(); moveInd(); });

/* ---------- 8. loader ---------- */
// Same language as opening an album: a closed magazine appears, swings open, thumbs through
// one page per series while the images load, closes, then lies back into the album stack.
async function boot() {
  const loader = $("#loader"), bookEl = $("#ldBook"), cover = $("#ldCover"), left = $("#ldLeft"), right = $("#ldRight"), front = $("#ldFront"), back = $("#ldBack"), ldBg = loader.querySelector(".ld-bg");
  const P = Math.round(Math.max(150, Math.min(innerHeight * .5, (innerWidth - 48) / 2, 440)));
  loader.style.setProperty("--P", P + "px");
  const n = projects.length, Y = "perspective(2200px) rotateY";
  const photo = k => coverSrc(projects[k]);                // same URL the album covers use, so nothing is fetched twice
  const urls = projects.filter(p => p.f === "work").map(coverSrc);   // only wait for what is on screen first
  let loaded = 0, shown = 0, counting = true, stop = false;
  const rest = () => projects.filter(p => p.f !== "work").forEach(p => { const im = new Image(); im.src = coverSrc(p); });
  urls.forEach(u => { const im = new Image(); im.onload = im.onerror = () => loaded++; im.src = u; });

  const t0 = performance.now();
  const num = () => String(Math.round(shown)).padStart(3, "0");
  let last = t0;
  (function tick(now) {
    const dt = Math.min(now - last, 100); last = now;                      // time-based, so a throttled tab doesn't stall the count
    const goal = now - t0 > 6000 ? 100 : loaded / urls.length * 100;       // never wait forever on slow images
    shown += (goal - shown) * Math.min(1, dt / 220);
    loader.querySelectorAll(".num").forEach(el => el.textContent = num());
    if (counting) requestAnimationFrame(tick);
  })(t0);

  const paper = k => `<div class="pg-head caps"><span>Ayla Noor — Photography</span><span>${projects[k].y}</span></div>
    <div><div class="ld-num"><b class="num">${num()}</b><sup>%</sup></div><div class="ld-cap caps">Plate ${pad(k + 1)} — ${projects[k].t}</div></div>
    <div class="pg-foot caps"><span>${projects[k].tags}</span><span>p. ${pad(k * 2 + 2)}</span></div>`;
  const IN = "cubic-bezier(.5,0,.9,.45)", OUT = "cubic-bezier(.1,.55,.25,1)";
  const turn = (el, from, to, ms, easing) => {
    el.getAnimations().forEach(a => a.cancel());
    return ended(el.animate([{ transform: `${Y}(${from}deg)` }, { transform: `${Y}(${to}deg)` }], { duration: dur(ms), easing, fill: "forwards" }));
  };
  const shift = (from, to, ms) => {
    bookEl.getAnimations().forEach(a => a.cancel());
    return ended(bookEl.animate([{ transform: `translate(calc(-50% + ${from}px), -50%)` }, { transform: `translate(calc(-50% + ${to}px), -50%)` }], { duration: dur(ms), easing: EASE, fill: "forwards" }));
  };

  const sequence = async () => {
    // 1. the closed magazine arrives, centred on screen
    cover.querySelector("img").src = photo(0);
    shift(-P / 2, -P / 2, 1);
    cover.style.visibility = "visible";
    await ended(cover.animate([{ opacity: 0, transform: "translateY(40px)" }, { opacity: 1, transform: "none" }], { duration: dur(420), easing: EASE }));
    await wait(dur(120));

    // 2. it swings open into a spread
    right.querySelector("img").src = photo(0); right.style.visibility = "visible";
    left.innerHTML = paper(0);
    shift(-P / 2, 0, 700);
    await turn(cover, 0, -90, 380, IN);
    cover.style.visibility = "hidden";
    left.style.visibility = "visible";
    await turn(left, 90, 0, 440, OUT);

    // 3. thumb through the series while the images load, faster once it gets going
    let k = 0, flips = 0;
    while (!stop && !(shown > 99.5 && flips >= 2)) {
      const next = (k + 1) % n, half = flips < 2 ? 190 : 95;
      front.querySelector("img").src = photo(k); front.style.visibility = "visible";
      right.querySelector("img").src = photo(next);
      back.innerHTML = paper(next);
      await turn(front, 0, -90, half, IN);
      front.style.visibility = "hidden";
      back.style.visibility = "visible";
      await turn(back, 90, 0, half, OUT);
      left.innerHTML = paper(next);
      back.style.visibility = "hidden";
      k = next; flips++;
      if (reduce && shown > 99.5) break;
    }
    counting = false;
    loader.querySelectorAll(".num").forEach(el => el.textContent = "100");
    rest();                                            // the other collection loads quietly in the background
    await wait(dur(140));

    // 4. close it again
    await turn(left, 0, 90, 300, IN);
    left.style.visibility = "hidden";
    cover.style.visibility = "visible";
    shift(0, -P / 2, 600);
    await turn(cover, -90, 0, 400, OUT);
    right.style.visibility = "hidden";
    await wait(dur(140));
  };
  await Promise.race([sequence(), wait(dur(7000))]);    // whatever happens, the site shows up
  stop = true; counting = false;

  // 5. the magazine lies back and settles into the stack as the site rises in
  render(); layout();
  booting = false; rise();
  cover.getAnimations().forEach(a => a.cancel());
  cover.style.transformOrigin = "50% 50%";
  await Promise.all([
    ended(cover.animate([{ transform: "perspective(1000px) rotateX(0deg)", opacity: 1 }, { transform: `perspective(1000px) translateY(${P * .15}px) rotateX(-78deg) scale(${sizes().W / P})`, opacity: 0 }], { duration: dur(600), easing: EASE, fill: "forwards" })),
    ended(ldBg.animate([{ opacity: 1 }, { opacity: 0 }], { duration: dur(520), delay: dur(100), easing: "ease", fill: "forwards" })),
  ]);
  loader.remove();
}
boot();
