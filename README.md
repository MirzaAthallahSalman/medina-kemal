# Undangan Digital — Medina & Kemal

Website undangan pernikahan premium. Dibangun dengan HTML, CSS & JavaScript modern (ES modules), **tanpa build step**: cukup edit `config.js`, upload, selesai.

## Menjalankan di komputer

Modul JavaScript tidak bisa dibuka langsung lewat klik dua kali (`file://`). Jalankan server lokal dari folder ini:

```bash
npx serve .
# lalu buka http://localhost:3000
```

Coba nama tamu: `http://localhost:3000/?to=Bapak%20Ahmad%20dan%20Keluarga`

## Mengubah konten — cukup `config.js`

Semua teks, foto, video, musik, tanggal, lokasi, rekening ada di **`config.js`** (lengkap dengan komentar). Yang biasanya diganti:

| Apa | Di mana |
|---|---|
| Nama, nama lengkap, orang tua, Instagram | `couple.bride` / `couple.groom` |
| Foto cover (+ posisi fokus wajah) | `cover.image`, `cover.imagePosition` |
| Video intro | taruh file di `assets/video/intro.mp4` (atau ubah `intro.video.src`) |
| Musik latar | taruh file di `assets/audio/music.mp3` |
| Ayat Al-Qur'an | `quran` (teks Arab otomatis ditampilkan kanan-ke-kiri) |
| Tanggal & waktu acara | `events.list[].start` — format `2027-01-16T08:00:00+07:00` |
| Lokasi & peta | `location` |
| Galeri | `gallery.photos` — tambah/hapus baris |
| Love story | `loveStory.items` |
| Rekening & alamat hadiah | `gift` |
| Warna | `theme` (opsional) |

**Tips foto:** gunakan JPG lebar ±1200–1600px, kualitas 80% (sekitar 150–350 KB). Foto portrait mempelai rasio 3:4. Jika wajah tertutup teks di cover, ubah `cover.imagePosition` (misal `"center 20%"`).

**Tips video:** MP4 (H.264), durasi pendek 15–40 detik, maksimal ±8 MB. Jika file belum ada, section otomatis menampilkan poster dengan efek slow-zoom.

**Pratinjau link WhatsApp:** judul & gambar pratinjau diatur di tag `og:` dalam `index.html` (crawler tidak membaca JavaScript). Gunakan URL gambar lengkap (`https://...`) setelah website online.

## Link personal untuk setiap tamu

- Format: `https://domain-anda.com/?to=Nama%20Tamu`
- Atau buka undangan → tombol **Bagikan** (ikon share) → ketik nama tamu → salin link / kirim langsung via WhatsApp.

## RSVP & ucapan → Google Sheets

Tanpa pengaturan, website berjalan dalam **mode demo**: data hanya tersimpan di browser pengunjung. Agar data terkumpul dan ucapan terlihat oleh semua tamu:

1. Buat Google Sheet → **Extensions → Apps Script**.
2. Tempel isi `apps-script/Code.gs`, simpan.
3. **Deploy → New deployment → Web app** (Execute as: *Me*, Who has access: *Anyone*).
4. Salin URL `/exec` ke `config.js` → `backend.googleScriptUrl`.

## Deploy online (gratis)

- **Netlify:** buka app.netlify.com/drop → seret folder `wedding-invitation`.
- **Vercel:** `npx vercel` di folder ini.
- **GitHub Pages:** push ke repo → Settings → Pages → branch `main`, folder `/root`.

## Struktur

```
config.js              ← SEMUA konten undangan
index.html             ← kerangka halaman & meta pratinjau
css/base.css           ← warna, huruf, layout, animasi reveal
css/components.css     ← tombol, ornamen, form, nav, modal, lightbox
css/sections.css       ← gaya tiap section (mobile-first)
js/main.js             ← merangkai semua section
js/sections/*.js       ← satu file per section (cover, intro, quran, couple, story, events, …)
js/features/*.js       ← musik, countdown, lightbox, share, penyimpanan, animasi
js/ornaments.js        ← ornamen botanical SVG
apps-script/Code.gs    ← backend Google Sheets
```

Mengubah urutan / menyembunyikan section: edit daftar di `js/main.js` (fungsi `boot`), atau set `enabled: false` untuk RSVP, wishes, dan gift di `config.js`.
