import { esc, toast, timeAgo, initials } from "../utils.js";
import { icons } from "../icons.js";
import { sectionHead } from "./common.js";
import { submitWish, fetchWishes } from "../features/storage.js";

/* SECTION 10 — Ucapan & doa dari tamu */

export function render(c, guestName, isDefaultGuest) {
  const w = c.wishes;
  if (!w?.enabled) return "";
  return `
  <section class="section wishes" id="wishes" aria-label="${esc(w.title)}">
    <div class="container wishes__inner">
      <div class="wishes__intro">
        ${sectionHead({ eyebrow: "Prayers & Wishes", title: w.title, subtitle: w.subtitle })}
        <form class="form wishes__form" data-reveal="up" novalidate>
          <div class="field">
            <label for="wish-name">Nama</label>
            <input id="wish-name" name="name" type="text" maxlength="80" required placeholder="Nama Anda" value="${isDefaultGuest ? "" : esc(guestName)}" />
          </div>
          <div class="field">
            <label for="wish-message">Ucapan</label>
            <textarea id="wish-message" name="message" rows="4" maxlength="500" required placeholder="Tuliskan ucapan &amp; doa terbaik"></textarea>
          </div>
          <button class="btn btn--dark btn--block" type="submit">${icons.chat}<span>Kirim Ucapan</span></button>
        </form>
      </div>

      <div class="wishes__board" data-reveal="up" data-delay="150">
        <p class="wishes__count"><span data-wish-count>0</span> Ucapan</p>
        <ul class="wishes__list" data-wish-list aria-live="polite"><li class="wishes__empty">Memuat ucapan…</li></ul>
      </div>
    </div>
  </section>`;
}

const item = (w) => `
  <li class="wish">
    <span class="wish__avatar" aria-hidden="true">${esc(initials(w.name))}</span>
    <div class="wish__body">
      <p class="wish__head">
        <strong>${esc(w.name)}</strong>
        ${w.attendance === "hadir" ? '<span class="tag">Hadir</span>' : w.attendance === "tidak" ? '<span class="tag tag--muted">Tidak hadir</span>' : ""}
      </p>
      <p class="wish__msg">${esc(w.message)}</p>
      ${w.time ? `<p class="wish__time">${esc(timeAgo(w.time))}</p>` : ""}
    </div>
  </li>`;

export function mount(root) {
  const section = root.querySelector(".wishes");
  if (!section) return {};
  const list = section.querySelector("[data-wish-list]");
  const count = section.querySelector("[data-wish-count]");
  const form = section.querySelector(".wishes__form");

  async function load() {
    try {
      const wishes = (await fetchWishes()).filter((w) => w && w.message);
      count.textContent = wishes.length;
      list.innerHTML = wishes.length
        ? wishes.map(item).join("")
        : '<li class="wishes__empty">Jadilah yang pertama mengirimkan ucapan.</li>';
    } catch (err) {
      console.error(err);
      list.innerHTML = '<li class="wishes__empty">Ucapan belum dapat dimuat.</li>';
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.name?.trim() || !data.message?.trim()) {
      toast("Mohon isi nama dan ucapan");
      return;
    }
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.classList.add("is-loading");
    try {
      await submitWish(data);
      form.message.value = "";
      toast("Terima kasih atas ucapan dan doanya");
      await load();
      list.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      toast("Gagal mengirim. Coba lagi.");
    } finally {
      btn.disabled = false;
      btn.classList.remove("is-loading");
    }
  });

  load();
  return { reload: load };
}
