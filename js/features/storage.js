/* Penyimpanan RSVP & ucapan.
   - Jika config.backend.googleScriptUrl diisi  -> dikirim ke Google Sheets (Apps Script).
   - Jika kosong                              -> mode demo: disimpan di localStorage browser. */

let cfg;
const LS_WISHES = "wedding-invitation:wishes";
const LS_RSVP = "wedding-invitation:rsvp";

export function initStorage(config) { cfg = config; }

const endpoint = () => (cfg?.backend?.googleScriptUrl || "").trim();
export const isRemote = () => Boolean(endpoint());

function readLS(key) {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
}
function writeLS(key, list) {
  try { localStorage.setItem(key, JSON.stringify(list)); } catch { /* storage penuh / diblokir */ }
}

async function post(payload) {
  // text/plain menghindari CORS preflight yang tidak didukung Apps Script.
  const res = await fetch(endpoint(), {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({ ok: res.ok }));
  if (!res.ok || data.ok === false) throw new Error(data.error || "Gagal mengirim data");
  return data;
}

const clean = (s, max) => String(s || "").trim().slice(0, max);

export async function submitRSVP({ name, guests, attendance, message }) {
  const entry = {
    type: "rsvp",
    name: clean(name, 80),
    guests: attendance === "hadir" ? Math.max(1, Number(guests) || 1) : 0,
    attendance,
    message: clean(message, 500),
    time: new Date().toISOString(),
  };
  if (isRemote()) return post(entry);
  writeLS(LS_RSVP, [entry, ...readLS(LS_RSVP)]);
  if (entry.message) writeLS(LS_WISHES, [{ name: entry.name, message: entry.message, attendance, time: entry.time }, ...readLS(LS_WISHES)]);
  return { ok: true, local: true };
}

export async function submitWish({ name, message }) {
  const entry = { type: "wish", name: clean(name, 80), message: clean(message, 500), time: new Date().toISOString() };
  if (isRemote()) return post(entry);
  writeLS(LS_WISHES, [entry, ...readLS(LS_WISHES)]);
  return { ok: true, local: true };
}

export async function fetchWishes() {
  if (isRemote()) {
    const url = new URL(endpoint());
    url.searchParams.set("action", "wishes");
    const res = await fetch(url.toString());
    const data = await res.json();
    return Array.isArray(data.wishes) ? data.wishes : [];
  }
  const samples = cfg?.wishes?.sampleWishes || [];
  return [...readLS(LS_WISHES), ...samples];
}
