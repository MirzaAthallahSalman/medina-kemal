import { esc } from "../utils.js";
import { sectionHead } from "./common.js";

/* SECTION 5 — Love story timeline (item diatur di config.loveStory.items) */

export function render(c) {
  const s = c.loveStory;
  if (!s?.items?.length) return "";
  const items = s.items.map((it, i) => `
    <li class="story__item ${i % 2 ? "story__item--alt" : ""}" data-reveal="${i % 2 ? "right" : "left"}">
      <span class="story__node" aria-hidden="true"></span>
      <article class="story__card">
        ${it.photo ? `<div class="story__photo"><img src="${esc(it.photo)}" alt="${esc(it.title)}" loading="lazy" decoding="async" /></div>` : ""}
        <div class="story__body">
          <p class="story__date">${esc(it.date)}</p>
          <h3 class="story__title">${esc(it.title)}</h3>
          <p class="story__desc">${esc(it.description)}</p>
        </div>
      </article>
    </li>`).join("");

  return `
  <section class="section story" id="story" aria-label="${esc(s.title)}">
    <div class="container">
      ${sectionHead({ eyebrow: "Our Journey", title: s.title, subtitle: s.subtitle })}
      <ol class="story__list">${items}</ol>
    </div>
  </section>`;
}
