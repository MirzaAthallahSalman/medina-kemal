import { icons } from "../icons.js";

/* Lightbox galeri: tombol prev/next, keyboard (← → Esc), dan swipe di mobile */

let box, img, counter, photos = [], index = 0, opener = null;

function build() {
  box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Galeri foto");
  box.innerHTML = `
    <button class="lightbox__close icon-btn" type="button" aria-label="Tutup">${icons.close}</button>
    <button class="lightbox__nav lightbox__nav--prev icon-btn" type="button" aria-label="Sebelumnya">${icons.left}</button>
    <figure class="lightbox__stage"><img class="lightbox__img" alt="" /></figure>
    <button class="lightbox__nav lightbox__nav--next icon-btn" type="button" aria-label="Berikutnya">${icons.right}</button>
    <p class="lightbox__counter"></p>`;
  document.body.appendChild(box);
  img = box.querySelector(".lightbox__img");
  counter = box.querySelector(".lightbox__counter");

  box.querySelector(".lightbox__close").addEventListener("click", close);
  box.querySelector(".lightbox__nav--prev").addEventListener("click", () => go(-1));
  box.querySelector(".lightbox__nav--next").addEventListener("click", () => go(1));
  box.addEventListener("click", (e) => { if (e.target === box || e.target.classList.contains("lightbox__stage")) close(); });

  let sx = 0, sy = 0;
  box.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  box.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) close();
  });
}

function onKey(e) {
  if (e.key === "Escape") close();
  else if (e.key === "ArrowRight") go(1);
  else if (e.key === "ArrowLeft") go(-1);
}

function show() {
  const p = photos[index];
  img.classList.remove("is-loaded");
  img.onload = () => img.classList.add("is-loaded");
  img.src = p.src;
  img.alt = p.alt || "";
  counter.textContent = `${index + 1} / ${photos.length}`;
  // Pre-load foto berikutnya agar transisi mulus
  const next = photos[(index + 1) % photos.length];
  if (next) new Image().src = next.src;
}

function go(step) {
  index = (index + step + photos.length) % photos.length;
  show();
}

export function openLightbox(list, start = 0, trigger = null) {
  if (!box) build();
  photos = list;
  index = start;
  opener = trigger;
  show();
  box.classList.add("is-open");
  document.documentElement.classList.add("has-modal");
  document.addEventListener("keydown", onKey);
  box.querySelector(".lightbox__close").focus({ preventScroll: true });
}

function close() {
  box.classList.remove("is-open");
  document.documentElement.classList.remove("has-modal");
  document.removeEventListener("keydown", onKey);
  opener?.focus({ preventScroll: true });
}
