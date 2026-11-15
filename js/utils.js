/* Helper kecil yang dipakai ulang di seluruh komponen */

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
/** Escape teks agar aman dimasukkan ke template HTML. */
export const esc = (v = "") => String(v ?? "").replace(/[&<>"']/g, (c) => ESC[c]);
/** Escape + ubah baris baru menjadi <br>. */
export const nl2br = (v = "") => esc(v).replace(/\n/g, "<br>");

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let tz = "Asia/Jakarta";
export const setTimeZone = (zone) => { if (zone) tz = zone; };

/** Format tanggal Indonesia. */
export function fmtDate(iso, opts) {
  try {
    return new Intl.DateTimeFormat("id-ID", { timeZone: tz, ...opts }).format(new Date(iso));
  } catch {
    return "";
  }
}
export const fmtDay = (iso) => fmtDate(iso, { weekday: "long" });
export const fmtLong = (iso) => fmtDate(iso, { day: "numeric", month: "long", year: "numeric" });
export const fmtFull = (iso) => fmtDate(iso, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
/** "16 . 01 . 2027" */
export function fmtDots(iso) {
  const p = new Intl.DateTimeFormat("en-GB", { timeZone: tz, day: "2-digit", month: "2-digit", year: "numeric" })
    .formatToParts(new Date(iso))
    .reduce((a, x) => ((a[x.type] = x.value), a), {});
  return `${p.day} . ${p.month} . ${p.year}`;
}

export function timeAgo(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return "";
  const s = Math.max(0, (Date.now() - d.getTime()) / 1000);
  const units = [[31536000, "tahun"], [2592000, "bulan"], [604800, "minggu"], [86400, "hari"], [3600, "jam"], [60, "menit"]];
  for (const [sec, label] of units) if (s >= sec) return `${Math.floor(s / sec)} ${label} lalu`;
  return "baru saja";
}

/** Salin teks ke clipboard (dengan fallback untuk browser lama / non-HTTPS). */
export async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* fallback di bawah */ }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand("copy"); } catch { ok = false; }
  ta.remove();
  return ok;
}

let toastTimer;
export function toast(message) {
  let el = $("#toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add("is-shown");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-shown"), 2600);
}

/** Ambil inisial dari nama, contoh "Bapak Ahmad" -> "BA". */
export const initials = (name = "") =>
  name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() || "").join("") || "?";
