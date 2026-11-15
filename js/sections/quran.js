import { esc, nl2br } from "../utils.js";
import { corner, divider } from "../ornaments.js";

/* SECTION 2 — Ayat Al-Qur'an (isi teks dari config.quran) */

export function render(c) {
  const q = c.quran;
  // Teks Arab ditulis kanan-ke-kiri; placeholder Latin tetap kiri-ke-kanan.
  const isArabic = /[؀-ۿ]/.test(q.arabic || "");
  return `
  <section class="section quran" id="quran" aria-label="Ayat Al-Qur'an">
    <div class="container container--narrow">
      <div class="quran__card" data-reveal="fade">
        ${corner("quran__corner quran__corner--tl")}
        ${corner("quran__corner quran__corner--tr")}
        ${corner("quran__corner quran__corner--bl")}
        ${corner("quran__corner quran__corner--br")}
        ${q.arabic?.trim() ? `
        <p class="quran__arabic ${isArabic ? "" : "is-placeholder"}" ${isArabic ? 'lang="ar" dir="rtl"' : ""} data-reveal data-delay="150">${nl2br(q.arabic)}</p>
        <div class="quran__divider" data-reveal="fade" data-delay="250">${divider()}</div>` : ""}
        <p class="quran__translation" data-reveal data-delay="300">${nl2br(q.translation)}</p>
        <p class="quran__source" data-reveal data-delay="400">QS. ${esc(q.surah)} : ${esc(q.ayah)}</p>
      </div>
    </div>
  </section>`;
}
