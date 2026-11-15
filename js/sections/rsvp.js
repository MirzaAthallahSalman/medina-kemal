import { esc, toast } from "../utils.js";
import { icons } from "../icons.js";
import { sectionHead } from "./common.js";
import { submitRSVP } from "../features/storage.js";

/* SECTION 9 — RSVP / konfirmasi kehadiran */

export function render(c, guestName, isDefaultGuest) {
  const r = c.rsvp;
  if (!r?.enabled) return "";
  const max = Math.max(1, r.maxGuests || 2);
  const options = Array.from({ length: max }, (_, i) => `<option value="${i + 1}">${i + 1} orang</option>`).join("");
  return `
  <section class="section rsvp" id="rsvp" aria-label="${esc(r.title)}">
    <div class="container container--narrow">
      ${sectionHead({ eyebrow: "Kindly Respond", title: r.title, subtitle: r.subtitle })}
      <div class="panel" data-reveal="up">
        <form class="form rsvp__form" novalidate>
          <div class="field">
            <label for="rsvp-name">Nama</label>
            <input id="rsvp-name" name="name" type="text" autocomplete="name" maxlength="80" required
              placeholder="Nama lengkap Anda" value="${isDefaultGuest ? "" : esc(guestName)}" />
          </div>

          <fieldset class="field">
            <legend>Konfirmasi Kehadiran</legend>
            <div class="choice">
              <label class="choice__opt"><input type="radio" name="attendance" value="hadir" checked /><span>${icons.check} Hadir</span></label>
              <label class="choice__opt"><input type="radio" name="attendance" value="tidak" /><span>${icons.close} Tidak Hadir</span></label>
            </div>
          </fieldset>

          <div class="field" data-guests-field>
            <label for="rsvp-guests">Jumlah Tamu</label>
            <div class="select"><select id="rsvp-guests" name="guests">${options}</select></div>
          </div>

          <div class="field">
            <label for="rsvp-message">Ucapan &amp; Doa <span class="field__opt">(opsional)</span></label>
            <textarea id="rsvp-message" name="message" rows="4" maxlength="500" placeholder="Tuliskan ucapan untuk kedua mempelai"></textarea>
          </div>

          <button class="btn btn--dark btn--block" type="submit"><span>Submit RSVP</span></button>
        </form>

        <div class="rsvp__success" hidden>
          <span class="rsvp__check">${icons.check}</span>
          <h3>Terima Kasih</h3>
          <p data-rsvp-msg></p>
          <button class="btn btn--ghost btn--sm" type="button" data-rsvp-again>Ubah konfirmasi</button>
        </div>
      </div>
    </div>
  </section>`;
}

export function mount(root, { onWish }) {
  const form = root.querySelector(".rsvp__form");
  if (!form) return;
  const success = root.querySelector(".rsvp__success");
  const guestsField = form.querySelector("[data-guests-field]");

  form.addEventListener("change", (e) => {
    if (e.target.name === "attendance") guestsField.hidden = e.target.value !== "hadir";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.name?.trim()) {
      toast("Mohon isi nama Anda");
      form.name.focus();
      return;
    }
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.classList.add("is-loading");
    try {
      await submitRSVP(data);
      success.querySelector("[data-rsvp-msg]").textContent = data.attendance === "hadir"
        ? `${data.name.trim()}, konfirmasi kehadiran Anda (${data.guests} orang) telah kami terima. Sampai jumpa di hari bahagia kami!`
        : `${data.name.trim()}, terima kasih telah memberi kabar. Doa restu Anda sangat berarti bagi kami.`;
      form.hidden = true;
      success.hidden = false;
      if (data.message?.trim()) onWish?.();
    } catch (err) {
      console.error(err);
      toast("Gagal mengirim. Periksa koneksi lalu coba lagi.");
    } finally {
      btn.disabled = false;
      btn.classList.remove("is-loading");
    }
  });

  root.querySelector("[data-rsvp-again]").addEventListener("click", () => {
    success.hidden = true;
    form.hidden = false;
  });
}
