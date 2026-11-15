/* Titik masuk aplikasi: membaca config, merender semua section, lalu memasang interaksi. */

import config from "../config.js";
import { $, setTimeZone } from "./utils.js";
import { initStorage } from "./features/storage.js";
import { createMusic } from "./features/music.js";
import { initReveal, initParallax } from "./features/motion.js";
import { openShare } from "./features/share.js";

import * as Cover from "./sections/cover.js";
import * as Intro from "./sections/intro.js";
import * as Quran from "./sections/quran.js";
import * as Couple from "./sections/couple.js";
import * as Story from "./sections/story.js";
import * as Events from "./sections/events.js";
import * as Location from "./sections/location.js";
import * as Gallery from "./sections/gallery.js";
import * as Rsvp from "./sections/rsvp.js";
import * as Wishes from "./sections/wishes.js";
import * as Gift from "./sections/gift.js";
import * as Closing from "./sections/closing.js";
import * as Nav from "./sections/nav.js";

/* ---------- Nama tamu dari URL (?to=Nama) ---------- */
function readGuest() {
  const raw = new URLSearchParams(location.search).get(config.guest.param || "to");
  const name = (raw || "").replace(/\s+/g, " ").trim().slice(0, 100);
  return { guestName: name || config.guest.default, isDefaultGuest: !name };
}

/* ---------- Tema & meta dari config ---------- */
function applyMeta() {
  document.title = config.meta.title;
  document.documentElement.lang = config.meta.lang || "id";
  document.querySelector('meta[name="description"]')?.setAttribute("content", config.meta.description || "");
  setTimeZone(config.meta.timeZone);
  const map = { ivory: "--ivory", cream: "--cream", champagne: "--champagne", beige: "--beige", gold: "--gold", brown: "--brown" };
  Object.entries(config.theme || {}).forEach(([k, v]) => {
    if (v) document.documentElement.style.setProperty(map[k] || `--${k}`, v);
  });
}

function boot() {
  applyMeta();
  initStorage(config);
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  const { guestName, isDefaultGuest } = readGuest();
  const app = $("#app");

  // Urutan section mengikuti brief. Hapus / pindahkan baris untuk mengubah urutan.
  app.innerHTML = `
    <main class="main" id="main">
      ${Intro.render(config)}
      ${Quran.render(config)}
      ${Couple.render(config)}
      ${Story.render(config)}
      ${Events.render(config)}
      ${Location.render(config)}
      ${Gallery.render(config)}
      ${Rsvp.render(config, guestName, isDefaultGuest)}
      ${Wishes.render(config, guestName, isDefaultGuest)}
      ${Gift.render(config)}
      ${Closing.render(config)}
    </main>
    ${Cover.render(config, guestName)}`;

  // Navigasi dirender setelah section ada (hanya menampilkan link yang tersedia).
  const chrome = document.createElement("div");
  chrome.className = "chrome";
  chrome.innerHTML = Nav.render(config);
  app.appendChild(chrome);

  const music = createMusic(config.music, $("[data-music]", chrome));
  const intro = Intro.mount(app, { music });
  Events.mount(app, config);
  Gallery.mount(app, config);
  Gift.mount(app);
  const wishes = Wishes.mount(app);
  Rsvp.mount(app, { onWish: () => wishes.reload?.() });
  Nav.mount(chrome);
  $("[data-share]", chrome).addEventListener("click", () => openShare(config));

  Cover.mount(app, {
    onOpen() {
      music?.start();
      window.scrollTo(0, 0);
      document.documentElement.classList.remove("is-locked");
      document.documentElement.classList.add("is-open");
      // Konten mulai dianimasikan saat tirai cover terangkat.
      setTimeout(() => {
        intro.start();
        initReveal(app);
        initParallax(app);
      }, 650);
    },
  });

  // Sembunyikan layar loading setelah foto cover siap.
  const hideBoot = () => {
    $("#boot")?.classList.add("is-hidden");
    document.documentElement.classList.add("is-ready"); // memicu animasi cover
  };
  const coverImg = $(".cover__bg img");
  if (coverImg?.complete) hideBoot();
  else {
    coverImg?.addEventListener("load", hideBoot, { once: true });
    coverImg?.addEventListener("error", hideBoot, { once: true });
    setTimeout(hideBoot, 3000);
  }
}

boot();
