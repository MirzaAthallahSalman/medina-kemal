import { esc, fmtDay, fmtDate } from "../utils.js";
import { icons } from "../icons.js";
import { sectionHead } from "./common.js";
import { corner } from "../ornaments.js";
import { startCountdown } from "../features/countdown.js";

/* SECTION 6 — Detail acara (Akad & Resepsi) + countdown */

const gcalDate = (iso) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

function calendarUrl(ev, c) {
  const end = ev.end || new Date(new Date(ev.start).getTime() + 2 * 3600e3).toISOString();
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${ev.name} — ${c.couple.bride.nickname} & ${c.couple.groom.nickname}`,
    dates: `${gcalDate(ev.start)}/${gcalDate(end)}`,
    details: c.meta.title,
    location: [ev.venue, ev.address].filter(Boolean).join(", "),
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

function eventCard(ev, c, i) {
  return `
  <article class="event" data-reveal="up" data-delay="${i * 150}">
    ${corner("event__corner event__corner--bl")}
    ${corner("event__corner event__corner--br")}
    <h3 class="event__name">${esc(ev.name)}</h3>
    <div class="event__date">
      <span class="event__day">${esc(fmtDay(ev.start))}</span>
      <span class="event__num">${esc(fmtDate(ev.start, { day: "numeric" }))}</span>
      <span class="event__my">${esc(fmtDate(ev.start, { month: "long", year: "numeric" }))}</span>
    </div>
    <p class="event__row">${icons.clock}<span>${esc(ev.timeLabel)}</span></p>
    <div class="event__venue">
      <p class="event__venue-name">${esc(ev.venue)}</p>
      <p class="event__address">${esc(ev.address)}</p>
    </div>
    <div class="event__actions">
      ${ev.mapsUrl ? `<a class="btn btn--outline-light btn--sm" href="${esc(ev.mapsUrl)}" target="_blank" rel="noopener">${icons.pin}<span>Lokasi</span></a>` : ""}
      <a class="btn btn--outline-light btn--sm" href="${esc(calendarUrl(ev, c))}" target="_blank" rel="noopener">${icons.calendar}<span>Simpan</span></a>
    </div>
  </article>`;
}

export function render(c) {
  const e = c.events;
  return `
  <section class="section events" id="event" aria-label="${esc(e.title)}">
    <div class="events__bg" aria-hidden="true"><img src="${esc(e.background || c.cover.image)}" alt="" loading="lazy" data-parallax="0.12" /></div>
    <div class="container">
      ${sectionHead({ eyebrow: "Save The Date", title: e.title, subtitle: e.subtitle })}
      <div class="events__grid">${e.list.map((ev, i) => eventCard(ev, c, i)).join("")}</div>

      <div class="countdown" data-reveal="up" data-delay="200" aria-label="Hitung mundur menuju hari pernikahan">
        <p class="countdown__label">Counting Down To Our Big Day</p>
        <div class="countdown__grid" data-countdown>
          ${["Days", "Hours", "Minutes", "Seconds"].map((u) => `
            <div class="countdown__unit"><span class="countdown__num" data-unit="${u.toLowerCase()}">00</span><span class="countdown__text">${u}</span></div>`).join('<span class="countdown__sep" aria-hidden="true">:</span>')}
        </div>
        <p class="countdown__done" hidden>Hari bahagia telah tiba — terima kasih atas doa restu Anda.</p>
      </div>
    </div>
  </section>`;
}

export function mount(root, c) {
  const el = root.querySelector(".countdown");
  startCountdown(el, c.events.countdownTarget || c.events.list[0]?.start);
}
