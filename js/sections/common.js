import { esc } from "../utils.js";
import { crest } from "../ornaments.js";

/** Judul section yang konsisten: ornamen + eyebrow + judul + subjudul. */
export function sectionHead({ eyebrow = "", title = "", subtitle = "", ornament = true } = {}) {
  return `
    <header class="section-head">
      ${ornament ? `<div class="section-head__crest" data-reveal="fade">${crest()}</div>` : ""}
      ${eyebrow ? `<p class="eyebrow" data-reveal>${esc(eyebrow)}</p>` : ""}
      ${title ? `<h2 class="section-title" data-reveal="text">${esc(title)}</h2>` : ""}
      ${subtitle ? `<p class="section-sub" data-reveal data-delay="150">${esc(subtitle)}</p>` : ""}
    </header>`;
}

/** Foto berbingkai lengkung (arch) dengan ornamen sudut opsional. */
export function archImage({ src, alt = "", position = "center", lazy = true, className = "" }) {
  return `
    <div class="arch ${className}">
      <img src="${esc(src)}" alt="${esc(alt)}" ${lazy ? 'loading="lazy"' : ""} decoding="async" style="object-position:${esc(position)}" />
    </div>`;
}
