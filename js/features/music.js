/* Musik latar: fade in/out, jeda otomatis saat tab disembunyikan,
   dan "duck" (jeda sementara) saat suara video dinyalakan. */

export function createMusic(cfg, button) {
  if (!cfg?.enabled || !cfg.src) return null;

  const audio = new Audio();
  audio.src = cfg.src;
  audio.loop = true;
  audio.preload = "none";
  audio.volume = 0;
  const target = Math.min(1, Math.max(0, cfg.volume ?? 0.6));

  let wanted = false; // keinginan pengguna (tombol)
  let ducked = false; // dijeda sementara oleh video
  let fadeTimer;

  const ui = () => {
    if (!button) return;
    const on = !audio.paused;
    button.classList.toggle("is-playing", on);
    button.setAttribute("aria-pressed", String(on));
  };
  audio.addEventListener("play", ui);
  audio.addEventListener("pause", ui);
  audio.addEventListener("error", () => { if (button) button.hidden = true; });

  function fadeTo(vol, ms, done) {
    clearInterval(fadeTimer);
    const steps = 20, start = audio.volume, delta = (vol - start) / steps;
    let i = 0;
    fadeTimer = setInterval(() => {
      i++;
      audio.volume = Math.min(1, Math.max(0, start + delta * i));
      if (i >= steps) { clearInterval(fadeTimer); done?.(); }
    }, ms / steps);
  }

  function play() {
    const p = audio.play();
    if (p) p.then(() => fadeTo(target, 1200)).catch(() => ui());
  }
  function pause() { fadeTo(0, 400, () => audio.pause()); }

  const api = {
    start() { wanted = true; if (!ducked) play(); },
    toggle() {
      wanted = audio.paused;
      if (wanted) { ducked = false; play(); } else pause();
    },
    duck(on) {
      ducked = on;
      if (on) pause();
      else if (wanted) play();
    },
  };

  button?.addEventListener("click", api.toggle);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { if (!audio.paused) audio.pause(); }
    else if (wanted && !ducked) play();
  });

  return api;
}
