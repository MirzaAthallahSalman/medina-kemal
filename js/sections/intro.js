import { esc, fmtFull } from "../utils.js";
import { icons } from "../icons.js";
import { corner } from "../ornaments.js";

/* SECTION 1 — Video intro sinematik */

export function render(c) {
  const { intro, couple, events } = c;
  const v = intro.video || {};
  const date = events.list[0]?.start;
  return `
  <section class="section intro" id="home" aria-label="Pembuka">
    <div class="intro__glow" aria-hidden="true"></div>
    <div class="container intro__inner">
      <div class="intro__text">
        <p class="eyebrow" data-reveal>${esc(intro.eyebrow)}</p>
        <h2 class="intro__names" data-reveal="text" data-delay="100">
          ${esc(couple.bride.nickname)} <span class="intro__line2"><span class="amp">&amp;</span> ${esc(couple.groom.nickname)}</span>
        </h2>
        <p class="intro__headline" data-reveal data-delay="250">${esc(intro.headline)}</p>
        ${date ? `<p class="intro__date" data-reveal data-delay="400"><span class="line"></span>${esc(fmtFull(date))}<span class="line"></span></p>` : ""}
      </div>

      <figure class="intro__media" data-reveal="zoom" data-delay="150">
        ${corner("intro__corner intro__corner--tl")}
        ${corner("intro__corner intro__corner--br")}
        <div class="intro__frame" style="aspect-ratio:${esc(v.aspectRatio || "4 / 5")}">
          <img class="intro__poster" src="${esc(v.poster || c.cover.image)}" alt="" loading="lazy" decoding="async" style="object-position:${esc(v.posterPosition || "center")};transform-origin:${esc(v.posterPosition || "center")}" />
          <video class="intro__video" playsinline ${v.startMuted !== false ? "muted" : ""} ${v.loop !== false ? "loop" : ""}
            preload="none" poster="${esc(v.poster || "")}" data-src="${esc(v.src || "")}" aria-label="Video pernikahan"></video>
          <div class="intro__controls">
            <button class="icon-btn" type="button" data-video-play aria-label="Putar / jeda video">${icons.pause}</button>
            <button class="icon-btn" type="button" data-video-mute aria-label="Suara video">${icons.mute}</button>
          </div>
        </div>
      </figure>
    </div>
  </section>`;
}

/**
 * Video dimuat saat undangan dibuka. Jika file video belum ada / gagal dimuat,
 * section otomatis menampilkan poster dengan efek slow-zoom.
 */
export function mount(root, { music }) {
  const section = root.querySelector(".intro");
  const frame = section.querySelector(".intro__frame");
  const video = section.querySelector(".intro__video");
  const playBtn = section.querySelector("[data-video-play]");
  const muteBtn = section.querySelector("[data-video-mute]");
  let userPaused = false;

  const fallback = () => frame.classList.add("is-fallback");
  const syncUI = () => {
    playBtn.innerHTML = video.paused ? icons.play : icons.pause;
    muteBtn.innerHTML = video.muted ? icons.mute : icons.volume;
  };

  if (!video.dataset.src) fallback();
  video.addEventListener("error", fallback);
  video.addEventListener("playing", () => frame.classList.add("is-playing"));
  video.addEventListener("play", syncUI);
  video.addEventListener("pause", syncUI);
  video.addEventListener("volumechange", syncUI);

  playBtn.addEventListener("click", () => {
    if (video.paused) { userPaused = false; video.play().catch(() => {}); }
    else { userPaused = true; video.pause(); }
  });

  muteBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    // Saat suara video dinyalakan, musik latar dijeda agar tidak bertabrakan.
    if (!video.muted) { music?.duck(true); if (video.paused) video.play().catch(() => {}); }
    else music?.duck(false);
  });

  // Jeda video saat tidak terlihat untuk menghemat baterai.
  const io = new IntersectionObserver(([e]) => {
    if (!section.classList.contains("is-started") || frame.classList.contains("is-fallback")) return;
    if (e.isIntersecting && !userPaused) video.play().catch(() => {});
    else if (!e.isIntersecting && !video.paused) {
      video.pause();
      if (!video.muted) { video.muted = true; music?.duck(false); }
    }
  }, { threshold: 0.25 });
  io.observe(frame);

  return {
    start() {
      section.classList.add("is-started");
      if (!video.dataset.src || frame.classList.contains("is-fallback")) return;
      video.src = video.dataset.src;
      video.preload = "auto";
      video.play().catch(() => syncUI());
      syncUI();
    },
  };
}
