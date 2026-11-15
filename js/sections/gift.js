import { esc, copyText, toast } from "../utils.js";
import { icons } from "../icons.js";
import { sectionHead } from "./common.js";

/* SECTION 11 — Wedding gift (rekening & alamat di config.gift) */

export function render(c) {
  const g = c.gift;
  if (!g?.enabled) return "";
  const accounts = (g.accounts || []).map((a, i) => `
    <article class="bank-card" data-reveal="up" data-delay="${i * 120}">
      <div class="bank-card__top">
        <span class="bank-card__chip" aria-hidden="true"></span>
        <span class="bank-card__bank">${esc(a.bank)}</span>
      </div>
      <p class="bank-card__number">${esc(String(a.number).replace(/(\d{4})(?=\d)/g, "$1 "))}</p>
      <div class="bank-card__bottom">
        <p class="bank-card__holder"><span>a.n.</span> ${esc(a.holder)}</p>
        <button class="btn btn--card btn--sm" type="button" data-copy="${esc(a.number)}" data-copy-label="Nomor rekening">
          ${icons.copy}<span>Copy</span>
        </button>
      </div>
    </article>`).join("");

  const s = g.shipping;
  const shipping = s?.address ? `
    <article class="gift__address" data-reveal="up" data-delay="200">
      <span class="gift__address-icon">${icons.gift}</span>
      <h3>Kirim Hadiah</h3>
      <p class="gift__recipient">${esc(s.recipient)}${s.phone ? ` · ${esc(s.phone)}` : ""}</p>
      <p class="gift__addr-text">${esc(s.address)}</p>
      <button class="btn btn--ghost btn--sm" type="button"
        data-copy="${esc([s.recipient, s.phone, s.address].filter(Boolean).join(", "))}" data-copy-label="Alamat">
        ${icons.copy}<span>Copy Alamat</span>
      </button>
    </article>` : "";

  return `
  <section class="section gift" id="gift" aria-label="${esc(g.title)}">
    <div class="container">
      ${sectionHead({ eyebrow: "Wedding Gift", title: g.title, subtitle: g.subtitle })}
      <div class="gift__grid">${accounts}${shipping}</div>
    </div>
  </section>`;
}

export function mount(root) {
  root.querySelector(".gift")?.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;
    const ok = await copyText(btn.dataset.copy);
    toast(ok ? `${btn.dataset.copyLabel} berhasil disalin` : "Gagal menyalin, silakan salin manual");
    if (ok) {
      const label = btn.querySelector("span");
      const prev = label.textContent;
      btn.classList.add("is-copied");
      label.textContent = "Tersalin";
      setTimeout(() => { btn.classList.remove("is-copied"); label.textContent = prev; }, 2000);
    }
  });
}
