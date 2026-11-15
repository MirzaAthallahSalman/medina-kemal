import { esc } from "../utils.js";
import { sectionHead } from "./common.js";
import { openLightbox } from "../features/lightbox.js";

/* SECTION 8 — Galeri masonry + lightbox (foto diatur di config.gallery.photos) */

export function render(c) {
  const g = c.gallery;
  if (!g?.photos?.length) return "";
  const items = g.photos.map((p, i) => `
    <button class="gallery__item" type="button" data-index="${i}" data-reveal="fade" data-delay="${(i % 3) * 100}" aria-label="Lihat foto ${i + 1}">
      <img src="${esc(p.thumb || p.src)}" alt="${esc(p.alt || "")}" loading="lazy" decoding="async" />
    </button>`).join("");

  return `
  <section class="section gallery" id="gallery" aria-label="${esc(g.title)}">
    <div class="container">
      ${sectionHead({ eyebrow: "Gallery", title: g.title, subtitle: g.subtitle })}
      <div class="gallery__grid">${items}</div>
    </div>
  </section>`;
}

export function mount(root, c) {
  const grid = root.querySelector(".gallery__grid");
  if (!grid) return;
  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery__item");
    if (item) openLightbox(c.gallery.photos, Number(item.dataset.index), item);
  });
}
