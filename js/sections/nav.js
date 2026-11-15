import { icons } from "../icons.js";

/* Navigasi melayang (dock) + tombol musik & bagikan */

const LINKS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "couple", label: "Mempelai", icon: "couple" },
  { id: "event", label: "Acara", icon: "calendar" },
  { id: "gallery", label: "Galeri", icon: "image" },
  { id: "rsvp", label: "RSVP", icon: "mail", alt: "wishes" },
  { id: "gift", label: "Gift", icon: "gift" },
];

export function render(c) {
  const links = LINKS.filter((l) => document.getElementById(l.id) || document.getElementById(l.alt || ""));
  return `
  <nav class="dock" aria-label="Navigasi undangan">
    ${links.map((l) => {
      const target = document.getElementById(l.id) ? l.id : l.alt;
      return `<a class="dock__link" href="#${target}" data-nav="${target}">${icons[l.icon]}<span>${l.label}</span></a>`;
    }).join("")}
  </nav>
  <div class="fab-stack">
    <button class="fab" type="button" data-share aria-label="Bagikan undangan">${icons.share}</button>
    ${c.music?.enabled && c.music?.src ? `<button class="fab fab--music" type="button" data-music aria-label="Putar / jeda musik" aria-pressed="false">${icons.music}</button>` : ""}
  </div>`;
}

export function mount(root) {
  const dock = root.querySelector(".dock");
  const links = [...dock.querySelectorAll("[data-nav]")];

  dock.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-nav]");
    if (!a) return;
    e.preventDefault();
    document.getElementById(a.dataset.nav)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Tandai link aktif sesuai section yang sedang terlihat.
  const targets = links.map((l) => document.getElementById(l.dataset.nav)).filter(Boolean);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((l) => l.classList.toggle("is-active", l.dataset.nav === en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  targets.forEach((t) => io.observe(t));
}
