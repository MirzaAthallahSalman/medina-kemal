import { copyText, toast } from "../utils.js";
import { icons } from "../icons.js";

/* Bagikan undangan + pembuat link personal untuk setiap tamu (?to=Nama) */

let modal;

function baseUrl() {
  const u = new URL(location.href);
  u.hash = "";
  u.search = "";
  return u.toString();
}

function guestLink(name, param) {
  const u = new URL(baseUrl());
  if (name.trim()) u.searchParams.set(param, name.trim());
  return u.toString().replace(/\+/g, "%20");
}

function message(cfg, name, link) {
  return (cfg.share?.message || "{link}")
    .replace(/\{guest\}/g, name.trim() || cfg.guest.default)
    .replace(/\{link\}/g, link);
}

function build(cfg) {
  modal = document.createElement("div");
  modal.className = "modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "share-title");
  modal.innerHTML = `
    <div class="modal__card">
      <button class="modal__close icon-btn" type="button" aria-label="Tutup">${icons.close}</button>
      <p class="eyebrow">Share Invitation</p>
      <h2 class="modal__title" id="share-title">Bagikan Undangan</h2>
      <p class="modal__sub">Tulis nama tamu untuk membuat link undangan personal.</p>
      <div class="field">
        <label for="share-name">Nama Tamu</label>
        <input id="share-name" type="text" placeholder="contoh: Bapak Ahmad dan Keluarga" maxlength="80" />
      </div>
      <div class="share__link" aria-live="polite"><span class="share__url"></span></div>
      <div class="share__actions">
        <button class="btn btn--dark btn--sm" type="button" data-act="copy">${icons.link}<span>Salin Link</span></button>
        <button class="btn btn--ghost btn--sm" type="button" data-act="text">${icons.copy}<span>Salin Pesan</span></button>
        <a class="btn btn--ghost btn--sm" data-act="wa" target="_blank" rel="noopener">${icons.whatsapp}<span>WhatsApp</span></a>
        ${navigator.share ? `<button class="btn btn--ghost btn--sm" type="button" data-act="native">${icons.share}<span>Lainnya</span></button>` : ""}
      </div>
    </div>`;
  document.body.appendChild(modal);

  const input = modal.querySelector("#share-name");
  const urlEl = modal.querySelector(".share__url");
  const wa = modal.querySelector('[data-act="wa"]');
  const param = cfg.guest.param || "to";

  const update = () => {
    const link = guestLink(input.value, param);
    urlEl.textContent = link;
    wa.href = `https://wa.me/?text=${encodeURIComponent(message(cfg, input.value, link))}`;
  };
  input.addEventListener("input", update);
  update();

  modal.addEventListener("click", async (e) => {
    if (e.target === modal || e.target.closest(".modal__close")) return close();
    const act = e.target.closest("[data-act]")?.dataset.act;
    const link = guestLink(input.value, param);
    if (act === "copy") toast((await copyText(link)) ? "Link undangan disalin" : "Gagal menyalin");
    if (act === "text") toast((await copyText(message(cfg, input.value, link))) ? "Pesan undangan disalin" : "Gagal menyalin");
    if (act === "native") {
      navigator.share({ title: cfg.meta.title, text: message(cfg, input.value, ""), url: link }).catch(() => {});
    }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("is-open")) close(); });
}

function close() {
  modal.classList.remove("is-open");
  document.documentElement.classList.remove("has-modal");
}

export function openShare(cfg) {
  if (!modal) build(cfg);
  modal.classList.add("is-open");
  document.documentElement.classList.add("has-modal");
  setTimeout(() => modal.querySelector("#share-name").focus({ preventScroll: true }), 50);
}
