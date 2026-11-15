import { $$, reducedMotion } from "../utils.js";

/* Animasi saat elemen masuk layar + parallax halus pada foto latar.
   Pemakaian di markup:
     data-reveal            -> fade + naik (default)
     data-reveal="fade|zoom|left|right|up"
     data-reveal="text"     -> teks muncul per kata
     data-delay="150"       -> jeda (ms)
     data-parallax="0.12"   -> kecepatan parallax gambar */

function splitWords(el) {
  if (el.dataset.split) return;
  el.dataset.split = "1";
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
          const outer = document.createElement("span");
          outer.className = "w";
          const inner = document.createElement("span");
          inner.textContent = part;
          outer.appendChild(inner);
          frag.appendChild(outer);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1) {
        // elemen inline (mis. <span class="amp">) dianimasikan sebagai satu kata
        if (child.children.length === 0 && !child.classList.contains("w")) {
          const outer = document.createElement("span");
          outer.className = "w";
          child.replaceWith(outer);
          outer.appendChild(child);
        } else walk(child);
      }
    });
  };
  walk(el);
  $$(".w > *", el).forEach((w, i) => w.style.setProperty("--i", i));
}

export function initReveal(root = document) {
  const els = $$("[data-reveal]", root);
  els.forEach((el) => {
    if (el.dataset.delay) el.style.setProperty("--delay", `${el.dataset.delay}ms`);
    if (el.dataset.reveal === "text") splitWords(el);
  });

  if (reducedMotion() || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("is-visible");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  els.forEach((el) => io.observe(el));

  // Pengaman: saat mencapai dasar halaman, tampilkan semua yang tersisa.
  const atBottom = () => {
    if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 4) return;
    els.forEach((el) => { el.classList.add("is-visible"); io.unobserve(el); });
    window.removeEventListener("scroll", atBottom);
  };
  window.addEventListener("scroll", atBottom, { passive: true });
}

export function initParallax(root = document) {
  if (reducedMotion()) return;
  const els = $$("[data-parallax]", root);
  if (!els.length) return;
  let ticking = false;
  const visible = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => (en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)));
  }, { rootMargin: "100px 0px" });
  els.forEach((el) => io.observe(el.parentElement || el));

  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    els.forEach((el) => {
      const host = el.parentElement || el;
      if (!visible.has(host)) return;
      const r = host.getBoundingClientRect();
      const offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax || 0.1);
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.15)`;
    });
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}
