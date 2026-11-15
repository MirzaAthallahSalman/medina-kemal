import { esc } from "../utils.js";
import { icons } from "../icons.js";
import { sectionHead } from "./common.js";

/* SECTION 7 — Lokasi & Google Maps (diatur di config.location) */

export function render(c) {
  const l = c.location;
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(l.mapQuery || l.address)}&z=16&output=embed`;
  const open = l.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.mapQuery || l.address)}`;
  return `
  <section class="section location" id="location" aria-label="${esc(l.title)}">
    <div class="container location__inner">
      <div class="location__info">
        ${sectionHead({ eyebrow: "Find Us Here", title: l.title })}
        <div class="location__text" data-reveal data-delay="100">
          <span class="location__icon">${icons.pin}</span>
          <p class="location__venue">${esc(l.venue)}</p>
          <p class="location__address">${esc(l.address)}</p>
        </div>
        <a class="btn btn--dark" href="${esc(open)}" target="_blank" rel="noopener" data-reveal data-delay="200">
          ${icons.pin}<span>Open Google Maps</span>
        </a>
      </div>
      <div class="location__map" data-reveal="zoom" data-delay="150">
        <iframe src="${esc(embed)}" title="Peta lokasi ${esc(l.venue)}" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      </div>
    </div>
  </section>`;
}
