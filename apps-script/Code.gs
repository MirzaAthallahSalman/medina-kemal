/**
 * BACKEND RSVP & UCAPAN — Google Apps Script + Google Sheets
 * -----------------------------------------------------------
 * 1. Buat Google Sheet baru → menu Extensions → Apps Script.
 * 2. Hapus isi Code.gs bawaan, tempel seluruh file ini, lalu Save.
 * 3. Deploy → New deployment → pilih "Web app"
 *      - Execute as : Me
 *      - Who has access : Anyone
 * 4. Salin "Web app URL" (berakhiran /exec) ke config.js → backend.googleScriptUrl
 *
 * Sheet "RSVP" dan "Wishes" dibuat otomatis saat data pertama masuk.
 * Setiap kali file ini diubah, buat deployment versi baru (Manage deployments → Edit → New version).
 */

const SHEET_RSVP = "RSVP";
const SHEET_WISHES = "Wishes";
const MAX_WISHES = 300;

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const now = new Date();
    const name = clean_(data.name, 80);
    const message = clean_(data.message, 500);
    if (!name) return json_({ ok: false, error: "Nama wajib diisi" });

    if (data.type === "rsvp") {
      const attendance = data.attendance === "hadir" ? "Hadir" : "Tidak Hadir";
      const guests = data.attendance === "hadir" ? Math.min(20, Math.max(1, Number(data.guests) || 1)) : 0;
      sheet_(ss, SHEET_RSVP, ["Waktu", "Nama", "Kehadiran", "Jumlah Tamu", "Ucapan"])
        .appendRow([now, name, attendance, guests, message]);
      if (message) {
        sheet_(ss, SHEET_WISHES, ["Waktu", "Nama", "Ucapan", "Kehadiran"])
          .appendRow([now, name, message, data.attendance === "hadir" ? "hadir" : "tidak"]);
      }
    } else if (data.type === "wish") {
      if (!message) return json_({ ok: false, error: "Ucapan wajib diisi" });
      sheet_(ss, SHEET_WISHES, ["Waktu", "Nama", "Ucapan", "Kehadiran"]).appendRow([now, name, message, ""]);
    } else {
      return json_({ ok: false, error: "Tipe data tidak dikenal" });
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  if ((e.parameter.action || "") !== "wishes") return json_({ ok: true });
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_WISHES);
  if (!sh || sh.getLastRow() < 2) return json_({ ok: true, wishes: [] });
  const start = Math.max(2, sh.getLastRow() - MAX_WISHES + 1);
  const rows = sh.getRange(start, 1, sh.getLastRow() - start + 1, 4).getValues();
  const wishes = rows
    .filter((r) => r[1] && r[2])
    .map((r) => ({ time: new Date(r[0]).toISOString(), name: String(r[1]), message: String(r[2]), attendance: String(r[3] || "") }))
    .reverse();
  return json_({ ok: true, wishes: wishes });
}

/* ---------- helpers ---------- */
function sheet_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  return sh;
}

// Potong panjang teks & cegah formula injection (=, +, -, @) di spreadsheet.
function clean_(v, max) {
  let s = String(v || "").trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
