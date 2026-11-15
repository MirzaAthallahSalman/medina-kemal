/* Ornamen botanical digambar secara prosedural sebagai SVG garis halus.
   Warna mengikuti `color` CSS (currentColor), jadi mudah diatur per section. */

const r2 = (n) => Math.round(n * 10) / 10;

function bezier(p0, p1, p2, p3, t) {
  const u = 1 - t;
  const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
  return [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]];
}
function tangent(p0, p1, p2, p3, t) {
  const u = 1 - t;
  const x = 3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]);
  const y = 3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]);
  return Math.atan2(y, x);
}

const leafPath = (l, w) => `M0 0Q${r2(l * 0.45)} ${r2(-w)} ${r2(l)} 0Q${r2(l * 0.45)} ${r2(w)} 0 0Z`;

function flower(x, y, r, rot = 0) {
  let petals = "";
  for (let i = 0; i < 5; i++) {
    petals += `<ellipse cx="0" cy="${r2(-r * 0.62)}" rx="${r2(r * 0.42)}" ry="${r2(r * 0.62)}" transform="rotate(${i * 72})"/>`;
  }
  return `<g class="orn-flower" transform="translate(${r2(x)} ${r2(y)}) rotate(${rot})">${petals}<circle r="${r2(r * 0.22)}" class="orn-dot"/></g>`;
}

/** Satu ranting daun. Mengembalikan markup <g> + bounding box. */
export function sprigGroup({ length = 220, bend = 0.22, leaves = 8, leafSize = 1, flower: withFlower = true, berries = true, seed = 1 } = {}) {
  const L = length;
  const p0 = [0, 0], p1 = [L * 0.32, -L * bend], p2 = [L * 0.68, -L * bend * 0.55], p3 = [L, 0];
  let minX = 0, minY = 0, maxX = L, maxY = 0;
  const track = (x, y) => { minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y); };

  for (let i = 0; i <= 20; i++) track(...bezier(p0, p1, p2, p3, i / 20));

  let out = `<path class="orn-stem" d="M0 0C${r2(p1[0])} ${r2(p1[1])} ${r2(p2[0])} ${r2(p2[1])} ${r2(p3[0])} ${r2(p3[1])}"/>`;
  for (let i = 0; i < leaves; i++) {
    const t = 0.1 + (i / Math.max(1, leaves - 1)) * 0.78;
    const [x, y] = bezier(p0, p1, p2, p3, t);
    const ang = tangent(p0, p1, p2, p3, t);
    const side = (i + seed) % 2 === 0 ? -1 : 1;
    const a = ang + side * (0.75 + 0.15 * Math.sin(i * 1.7 + seed));
    const l = L * 0.2 * leafSize * (1 - t * 0.45);
    const w = l * 0.32;
    track(x + Math.cos(a) * l, y + Math.sin(a) * l);
    out += `<g transform="translate(${r2(x)} ${r2(y)}) rotate(${r2((a * 180) / Math.PI)})"><path class="orn-leaf" d="${leafPath(l, w)}"/><path class="orn-vein" d="M${r2(l * 0.08)} 0L${r2(l * 0.8)} 0"/></g>`;
    if (berries && i % 3 === 1) {
      const bx = x + Math.cos(ang - side * 1.2) * L * 0.07;
      const by = y + Math.sin(ang - side * 1.2) * L * 0.07;
      out += `<path class="orn-stem" d="M${r2(x)} ${r2(y)}L${r2(bx)} ${r2(by)}"/><circle class="orn-dot" cx="${r2(bx)}" cy="${r2(by)}" r="${r2(L * 0.012 + 1)}"/>`;
      track(bx, by);
    }
  }
  if (withFlower) {
    const fr = L * 0.065;
    out += flower(L + fr * 0.4, 0, fr, 18);
    track(L + fr * 1.6, fr * 1.4);
    track(L - fr, -fr * 1.4);
  }
  return { g: `<g class="orn">${out}</g>`, box: [minX, minY, maxX - minX, maxY - minY] };
}

/** Ranting sebagai elemen <svg> mandiri. */
export function sprig(opts = {}, className = "") {
  const { g, box } = sprigGroup(opts);
  const pad = 6;
  const vb = [box[0] - pad, box[1] - pad, box[2] + pad * 2, box[3] + pad * 2].map(r2).join(" ");
  return `<svg class="ornament ${className}" viewBox="${vb}" aria-hidden="true" focusable="false">${g}</svg>`;
}

/** Ornamen sudut (untuk bingkai foto & kartu). */
export function corner(className = "") {
  const a = sprigGroup({ length: 150, bend: -0.16, leaves: 7, seed: 0, flower: false });
  const b = sprigGroup({ length: 150, bend: 0.16, leaves: 7, seed: 1, flower: false });
  const c = sprigGroup({ length: 92, bend: 0.1, leaves: 4, seed: 0, berries: false });
  return `<svg class="ornament ornament--corner ${className}" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
    <g transform="translate(14 14)">
      <g transform="rotate(4)">${a.g}</g>
      <g transform="rotate(86)">${b.g}</g>
      <g transform="rotate(45)">${c.g}</g>
    </g></svg>`;
}

/** Pemisah horizontal: garis — ranting — bunga — ranting — garis. */
export function divider(className = "") {
  const s = sprigGroup({ length: 64, bend: 0.14, leaves: 5, flower: false, berries: false, leafSize: 1.2 });
  return `<svg class="ornament ornament--divider ${className}" viewBox="-160 -22 320 44" aria-hidden="true" focusable="false">
    <path class="orn-stem" d="M-158 0H-82M82 0H158"/>
    <g transform="translate(-14 0) scale(-1 1)">${s.g}</g>
    <g transform="translate(14 0)">${s.g}</g>
    ${flower(0, 0, 8, 0)}
    <circle class="orn-dot" cx="-158" cy="0" r="1.6"/><circle class="orn-dot" cx="158" cy="0" r="1.6"/>
  </svg>`;
}

/** Karangan bunga kecil simetris (untuk atas judul / penutup). */
export function crest(className = "") {
  const s = sprigGroup({ length: 110, bend: 0.25, leaves: 7, seed: 0, flower: true });
  return `<svg class="ornament ornament--crest ${className}" viewBox="-130 -70 260 90" aria-hidden="true" focusable="false">
    <g transform="translate(-6 8) rotate(-168)">${s.g}</g>
    <g transform="translate(6 8) scale(-1 1) rotate(-168)">${s.g}</g>
    ${flower(0, -2, 11, 0)}
  </svg>`;
}

/** Kelopak untuk animasi melayang. */
export const petalSVG = `<svg viewBox="0 0 20 28" aria-hidden="true"><path d="M10 0C16 6 20 14 10 28 0 14 4 6 10 0Z" fill="currentColor"/></svg>`;

export function petals(count = 10) {
  let html = "";
  for (let i = 0; i < count; i++) {
    const left = (i * 97) % 100;
    const delay = -((i * 2.3) % 14);
    const dur = 12 + ((i * 3) % 9);
    const size = 8 + ((i * 5) % 9);
    const drift = ((i % 2 ? 1 : -1) * (30 + ((i * 11) % 50)));
    html += `<span class="petal" style="--l:${left}%;--d:${delay}s;--t:${dur}s;--s:${size}px;--x:${drift}px">${petalSVG}</span>`;
  }
  return `<div class="petals" aria-hidden="true">${html}</div>`;
}
