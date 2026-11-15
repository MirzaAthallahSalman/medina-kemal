import { esc, fmtDots } from "../utils.js";
import { icons } from "../icons.js";
import { petals, divider } from "../ornaments.js";

/* HALAMAN COVER — layar pembuka dengan nama tamu & tombol Open Invitation */

export function render(c, guestName) {
  const { cover, couple, guest, events } = c;
  const date = events.list[0]?.start;
  const desktopImg = cover.imageDesktop || cover.image;
  return `
  <div class="cover cover--${esc(cover.desktopLayout || "split")}" id="cover" role="dialog" aria-modal="true" aria-labelledby="cover-names">
    <div class="cover__bg">
      <picture>
        ${cover.imageDesktop ? `<source media="(min-width: 1024px)" srcset="${esc(desktopImg)}">` : ""}
        <img src="${esc(cover.image)}" alt="" style="object-position:${esc(cover.imagePosition || "center")};transform-origin:${esc(cover.imagePosition || "center")}" fetchpriority="high" />
      </picture>
    </div>
    <div class="cover__veil"></div>
    ${petals(9)}

    <div class="cover__layout">
      <div class="cover__frame" aria-hidden="true">
        <div class="cover__arch"><img src="${esc(desktopImg)}" alt="" style="object-position:${esc(cover.imagePosition || "center")};transform-origin:${esc(cover.imagePosition || "center")}" /></div>
      </div>

      <div class="cover__content">
        <p class="eyebrow eyebrow--light cover__eyebrow">${esc(cover.eyebrow)}</p>
        <h1 class="cover__names" id="cover-names">
          <span>${esc(couple.bride.nickname)}</span>
          <span class="amp">&amp;</span>
          <span>${esc(couple.groom.nickname)}</span>
        </h1>
        ${date ? `<p class="cover__date">${esc(fmtDots(date))}</p>` : ""}
        <div class="cover__divider">${divider()}</div>

        <div class="cover__guest">
          <p class="cover__guest-label">${esc(guest.label)}</p>
          <p class="cover__guest-name" data-guest-name>${esc(guestName)}</p>
          ${guest.note ? `<p class="cover__guest-note">${esc(guest.note)}</p>` : ""}
        </div>

        <button class="btn btn--light cover__btn" type="button" data-open-invitation>
          ${icons.envelope}<span>${esc(cover.buttonText || "Open Invitation")}</span>
        </button>
      </div>
    </div>
  </div>`;
}

export function mount(root, { onOpen }) {
  const cover = root.querySelector("#cover");
  const btn = cover.querySelector("[data-open-invitation]");

  btn.addEventListener("click", () => {
    if (cover.classList.contains("is-opening")) return;
    onOpen(); // dipanggil langsung di event klik agar musik/video diizinkan diputar
    cover.classList.add("is-opening");
    const done = () => {
      cover.remove();
    };
    setTimeout(done, 1700);
  });
}
