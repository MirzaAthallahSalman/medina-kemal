import { esc } from "../utils.js";
import { icons } from "../icons.js";
import { corner, sprig } from "../ornaments.js";

/* SECTION 3 & 4 — Profil mempelai (satu komponen dipakai ulang untuk bride & groom)
   Mobile: dua section bertumpuk. Desktop: berdampingan dengan "&" di tengah. */

function person(p, role) {
  const label = role === "bride" ? "The Bride" : "The Groom";
  const side = role === "bride" ? "left" : "right";
  return `
  <section class="person person--${role}" id="${role}" aria-label="${label}">
    <p class="eyebrow person__label" data-reveal>${label}</p>
    <figure class="person__photo" data-reveal="zoom">
      ${corner(`person__corner person__corner--a`)}
      ${corner(`person__corner person__corner--b`)}
      <div class="arch arch--portrait" data-parallax-wrap>
        <img src="${esc(p.photo)}" alt="${esc(p.nickname)}" loading="lazy" decoding="async"
             style="object-position:${esc(p.photoPosition || "center 30%")}" />
      </div>
    </figure>
    <h3 class="person__nick" data-reveal="text">${esc(p.nickname)}</h3>
    ${p.fullName && p.fullName.trim() !== p.nickname.trim() ? `<p class="person__full" data-reveal data-delay="100">${esc(p.fullName)}</p>` : ""}
    ${p.father || p.mother ? `
    <div class="person__parents" data-reveal data-delay="200">
      <p class="person__parents-label">${esc(p.parentLabel)}</p>
      ${p.father ? `<p>${esc(p.father)}</p>` : ""}
      ${p.father && p.mother ? '<p class="person__and">&amp;</p>' : ""}
      ${p.mother ? `<p>${esc(p.mother)}</p>` : ""}
    </div>` : ""}
    ${p.instagram ? `
    <a class="chip" data-reveal data-delay="300" href="https://instagram.com/${encodeURIComponent(p.instagram)}" target="_blank" rel="noopener">
      ${icons.instagram}<span>@${esc(p.instagram)}</span>
    </a>` : ""}
    <div class="person__sprig person__sprig--${side}" aria-hidden="true">${sprig({ length: 260, leaves: 9, bend: 0.2 })}</div>
  </section>`;
}

export function render(c) {
  const { bride, groom, greeting = {}, order } = c.couple;
  const [first, second] = order === "groom-first" ? [[groom, "groom"], [bride, "bride"]] : [[bride, "bride"], [groom, "groom"]];
  return `
  <div class="couple" id="couple">
    <header class="couple__intro container container--narrow">
      ${greeting.salam ? `<p class="couple__salam" data-reveal>${esc(greeting.salam)}</p>` : ""}
      ${greeting.text ? `<p class="couple__text" data-reveal data-delay="150">${esc(greeting.text)}</p>` : ""}
    </header>
    <div class="container couple__grid">
      ${person(...first)}
      <div class="couple__amp" aria-hidden="true" data-reveal="fade"><span>&amp;</span></div>
      ${person(...second)}
    </div>
  </div>`;
}
