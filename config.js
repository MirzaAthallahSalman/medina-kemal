/* =====================================================================
   KONFIGURASI UNDANGAN — SATU-SATUNYA FILE YANG PERLU ANDA UBAH
   ---------------------------------------------------------------------
   • Semua teks, foto, video, musik, tanggal, lokasi & rekening ada di sini.
   • Path file relatif terhadap folder proyek (contoh: "assets/images/x.jpg").
   • Tanggal memakai format ISO + zona waktu, contoh "2027-01-16T08:00:00+07:00"
     (+07:00 = WIB, +08:00 = WITA, +09:00 = WIT).
   • Hapus / kosongkan ("") sebuah field opsional untuk menyembunyikannya.
   ===================================================================== */

const config = {
  /* ---------- Info halaman (judul tab browser) ---------- */
  meta: {
    title: "The Wedding of Medina & Kemal",
    description: "Undangan pernikahan Medina & Kemal",
    lang: "id",
    timeZone: "Asia/Jakarta", // untuk format hari & tanggal
  },

  /* ---------- Mempelai ---------- */
  couple: {
    bride: {
      nickname: "Medina",
      fullName: "Medina Aliyah Shabira, S.T.",
      parentLabel: "Putri dari",
      father: "Bapak Didit Haryanto",
      mother: "Ibu Ratih Ayu Larasati",
      photo: "assets/images/bride-kid.jpg",
      photoPosition: "49% center", // geser fokus foto (x y)
      instagram: "", // username tanpa @, kosongkan untuk menyembunyikan
    },
    groom: {
      nickname: "Kemal",
      fullName: "Kemal",
      parentLabel: "Putra dari",
      father: "Bapak [Nama Ayah]", // kosongkan ("") untuk menyembunyikan
      mother: "Ibu [Nama Ibu]",
      photo: "assets/images/groom-kid.jpg",
      photoPosition: "54% center",
      instagram: "",
    },
    // Salam pembuka di atas profil mempelai
    greeting: {
      salam: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
      text: "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami.",
    },
    // Urutan tampil: "bride-first" atau "groom-first"
    order: "bride-first",
  },

  /* ---------- Nama tamu (diambil dari URL ?to=Nama) ---------- */
  guest: {
    param: "to",
    default: "Tamu Undangan",
    label: "Kepada Yth.",
    note: "Mohon maaf apabila ada kesalahan penulisan nama dan gelar",
  },

  /* ---------- Halaman cover ---------- */
  cover: {
    eyebrow: "The Wedding Of",
    image: "assets/images/couple-cover.jpg",
    imagePosition: "center top", // fokus foto; "center top" = kepala tidak terpotong
    imageDesktop: "", // opsional: foto landscape khusus desktop
    desktopLayout: "split", // "split" (foto dalam bingkai + teks) atau "full" (foto layar penuh)
    buttonText: "Open Invitation",
  },

  /* ---------- Musik latar ---------- */
  music: {
    enabled: true,
    src: "assets/audio/music.mp3", // letakkan file mp3 Anda di sini
    volume: 0.6,
  },

  /* ---------- Section 1: Video intro ---------- */
  intro: {
    eyebrow: "Together With Their Families",
    headline: "Joyfully Invite You To Celebrate Their Wedding",
    video: {
      src: "assets/video/intro.mp4", // ganti file ini untuk mengganti video
      poster: "assets/images/couple-cover.jpg", // ditampilkan sebelum video / jika video belum ada
      posterPosition: "center top", // fokus poster di dalam bingkai
      aspectRatio: "3 / 4", // contoh: "9 / 16", "4 / 5", "16 / 9"
      startMuted: true, // video diputar tanpa suara agar musik latar tetap terdengar
      loop: true,
    },
  },

  /* ---------- Section 2: Ayat Al-Qur'an ----------
     Masukkan teks asli ayat. Placeholder di bawah sengaja dibiarkan kosong. */
  quran: {
    // Tempel teks Arab di sini (salin dari quran.kemenag.go.id atau quran.com). Kosong = disembunyikan.
    arabic: "",
    translation: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.",
    surah: "Ar-Rum",
    ayah: "21",
  },

  /* ---------- Section 5: Love story (tambah / hapus item sesuka hati) ---------- */
  loveStory: {
    title: "Our Love Story",
    subtitle: "Setiap kisah memiliki awal yang indah",
    items: [
      {
        date: "2019",
        title: "First Meet",
        description: "Kami pertama kali bertemu dalam sebuah acara kampus. Sebuah sapaan sederhana yang menjadi awal dari segalanya.",
        photo: "assets/images/story-1.jpg", // opsional
      },
      {
        date: "2021",
        title: "First Date",
        description: "Secangkir kopi di sore hari, obrolan panjang yang tak terasa, dan keyakinan yang perlahan tumbuh.",
        photo: "",
      },
      {
        date: "Agustus 2026",
        title: "The Proposal",
        description: "Dengan restu kedua keluarga, kami memutuskan untuk melangkah ke jenjang yang lebih serius.",
        photo: "assets/images/gallery/02.jpg",
      },
      {
        date: "Maret 2027",
        title: "Wedding Day",
        description: "Hari di mana dua hati dipersatukan dalam ikatan suci. Kami menantikan kehadiran Anda.",
        photo: "",
      },
    ],
  },

  /* ---------- Section 6: Detail acara ---------- */
  events: {
    title: "Wedding Event",
    subtitle: "Dengan penuh rasa syukur, kami mengundang Anda untuk hadir pada:",
    list: [
      {
        name: "Akad Nikah",
        start: "2027-03-27T07:00:00+07:00",
        // end: "2027-03-27T09:00:00+07:00", // opsional, untuk tombol "Simpan" ke kalender
        timeLabel: "07.00 WIB – Selesai",
        venue: "Gedung Patra Jasa",
        address: "Jl. Jend. Gatot Subroto Kav. 32–34, Kuningan Timur, Setiabudi, Jakarta Selatan",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gedung+Patra+Jasa+Jakarta+Selatan",
      },
      {
        name: "Resepsi",
        start: "2027-03-27T10:00:00+07:00",
        timeLabel: "10.00 WIB – Selesai",
        venue: "Gedung Patra Jasa",
        address: "Jl. Jend. Gatot Subroto Kav. 32–34, Kuningan Timur, Setiabudi, Jakarta Selatan",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gedung+Patra+Jasa+Jakarta+Selatan",
      },
    ],
    // Gambar latar section acara (diberi lapisan gelap otomatis)
    background: "assets/images/illustration.jpg",
    // Countdown menuju waktu ini (default: waktu acara pertama)
    countdownTarget: "2027-03-27T07:00:00+07:00",
  },

  /* ---------- Section 7: Lokasi / Google Maps ---------- */
  location: {
    title: "Location",
    venue: "Gedung Patra Jasa",
    address: "Jl. Jend. Gatot Subroto Kav. 32–34, Kuningan Timur, Setiabudi, Jakarta Selatan, DKI Jakarta",
    // Kata kunci / koordinat untuk peta embed, contoh: "-6.2355,106.7993"
    mapQuery: "Gedung Patra Jasa, Jakarta Selatan",
    // Link tombol "Open Google Maps" (salin dari Google Maps > Share)
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gedung+Patra+Jasa+Jakarta+Selatan",
  },

  /* ---------- Section 8: Galeri ---------- */
  gallery: {
    title: "Our Moments",
    subtitle: "Sepenggal cerita dalam bingkai",
    // DRAFT: 3 foto diulang. Ganti / tambah baris saat foto prewedding sudah ada.
    photos: [
      { src: "assets/images/gallery/couple-1.jpg", alt: "Medina & Kemal" },
      { src: "assets/images/gallery/couple-2.jpg", alt: "Medina & Kemal" },
      { src: "assets/images/gallery/couple-3.jpg", alt: "Medina & Kemal" },
      { src: "assets/images/gallery/couple-1.jpg", alt: "Medina & Kemal" },
      { src: "assets/images/gallery/couple-3.jpg", alt: "Medina & Kemal" },
      { src: "assets/images/gallery/couple-2.jpg", alt: "Medina & Kemal" },
      { src: "assets/images/gallery/couple-3.jpg", alt: "Medina & Kemal" },
      { src: "assets/images/gallery/couple-1.jpg", alt: "Medina & Kemal" },
      { src: "assets/images/gallery/couple-2.jpg", alt: "Medina & Kemal" },
    ],
  },

  /* ---------- Section 9: RSVP ---------- */
  rsvp: {
    enabled: true,
    title: "RSVP",
    subtitle: "Mohon konfirmasi kehadiran Anda melalui formulir berikut.",
    maxGuests: 4,
  },

  /* ---------- Section 10: Ucapan & doa ---------- */
  wishes: {
    enabled: true,
    title: "Wedding Wishes",
    subtitle: "Kirimkan doa dan ucapan terbaik untuk kami",
    // Contoh ucapan — hanya tampil selama database (backend) belum diatur
    sampleWishes: [
      { name: "Keluarga Besar", message: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.", attendance: "hadir", time: "2026-11-10T10:00:00+07:00" },
    ],
  },

  /* ---------- Section 11: Wedding gift ---------- */
  gift: {
    enabled: true,
    title: "Wedding Gift",
    subtitle: "Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, dapat melalui:",
    accounts: [
      { bank: "Bank BCA", number: "1234567890", holder: "[Nama Pemilik Rekening]" },
      { bank: "Bank Mandiri", number: "0987654321", holder: "[Nama Pemilik Rekening]" },
    ],
    // Kosongkan address untuk menyembunyikan kartu alamat
    shipping: {
      recipient: "[Nama Penerima]",
      phone: "[Nomor Telepon]",
      address: "[Alamat lengkap pengiriman hadiah]",
    },
  },

  /* ---------- Section 12: Penutup ---------- */
  closing: {
    title: "Thank You",
    message: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.",
    salam: "Wassalamu'alaikum Warahmatullahi Wabarakatuh",
    signature: "Kami yang berbahagia",
    image: "assets/images/illustration.jpg",
    imagePosition: "center 45%",
  },

  /* ---------- Penyimpanan RSVP & ucapan ----------
     Kosong  = mode demo (data hanya tersimpan di browser pengunjung).
     Isi dengan URL Web App Google Apps Script (lihat apps-script/Code.gs & README)
     agar data masuk ke Google Sheets dan ucapan terlihat oleh semua tamu. */
  backend: {
    googleScriptUrl: "",
  },

  /* ---------- Bagikan undangan ---------- */
  share: {
    // {guest} = nama tamu, {link} = link undangan
    message: "Kepada Yth. {guest}\n\nTanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir di acara pernikahan kami.\n\nInfo lengkap:\n{link}\n\nMerupakan suatu kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.\n\nMedina & Kemal",
  },

  /* ---------- Warna (opsional) — timpa palet default ---------- */
  theme: {
    // ivory: "#FBF7F0",
    // gold: "#B08D57",
    // brown: "#3E2C20",
  },
};

export default config;
