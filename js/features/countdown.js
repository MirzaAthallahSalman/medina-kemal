/* Countdown otomatis menuju tanggal pernikahan */

export function startCountdown(root, targetISO) {
  if (!root || !targetISO) return;
  const target = new Date(targetISO).getTime();
  const nums = {
    days: root.querySelector('[data-unit="days"]'),
    hours: root.querySelector('[data-unit="hours"]'),
    minutes: root.querySelector('[data-unit="minutes"]'),
    seconds: root.querySelector('[data-unit="seconds"]'),
  };
  const pad = (n) => String(n).padStart(2, "0");
  const set = (el, v) => { if (el.textContent !== v) el.textContent = v; };

  const tick = () => {
    const diff = target - Date.now();
    if (diff <= 0) {
      Object.values(nums).forEach((el) => set(el, "00"));
      root.querySelector(".countdown__done")?.removeAttribute("hidden");
      root.classList.add("is-done");
      clearInterval(timer);
      return;
    }
    const s = Math.floor(diff / 1000);
    set(nums.days, pad(Math.floor(s / 86400)));
    set(nums.hours, pad(Math.floor((s % 86400) / 3600)));
    set(nums.minutes, pad(Math.floor((s % 3600) / 60)));
    set(nums.seconds, pad(s % 60));
  };
  const timer = setInterval(tick, 1000);
  tick();
}
