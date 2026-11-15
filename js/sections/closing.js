import { esc } from "../utils.js";
import { crest, divider, petals } from "../ornaments.js";

/* SECTION 12 — Penutup */

export function render(c) {
  const cl = c.closing;
  const { bride, groom } = c.couple;
  return `
  <section class="section closing" id="closing" aria-label="Penutup">
    <div class="closing__bg" aria-hidden="true">
      <img src="${esc(cl.image)}" alt="" loading="lazy" decoding="async" style="object-position:${esc(cl.imagePosition || "center")};transform-origin:${esc(cl.imagePosition || "center")}" data-parallax="0.1" />
    </div>
    <div class="closing__veil" aria-hidden="true"></div>
    ${petals(7)}
    <div class="container container--narrow closing__inner">
      <div class="closing__crest" data-reveal="fade">${crest()}</div>
      <h2 class="closing__title" data-reveal="text">${esc(cl.title)}</h2>
      <p class="closing__message" data-reveal data-delay="150">${esc(cl.message)}</p>
      ${cl.salam ? `<p class="closing__salam" data-reveal data-delay="250">${esc(cl.salam)}</p>` : ""}
      <p class="closing__sign" data-reveal data-delay="300">${esc(cl.signature)}</p>
      <p class="closing__names" data-reveal="text" data-delay="350">${esc(bride.nickname)} <span class="amp">&amp;</span> ${esc(groom.nickname)}</p>
      <div class="closing__divider" data-reveal="fade" data-delay="450">${divider()}</div>
    </div>
  </section>
  <footer class="footer">
    <p>Made with love for ${esc(bride.nickname)} &amp; ${esc(groom.nickname)}</p>
  </footer>`;
}
