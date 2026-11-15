/* Ikon garis tipis (24×24, stroke = currentColor) */

const wrap = (body, extra = "") =>
  `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${body}</svg>`;

export const icons = {
  envelope: wrap('<rect x="3" y="5.5" width="18" height="13" rx="1.5"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>'),
  play: wrap('<path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none"/>'),
  pause: wrap('<path d="M8.5 5.5v13M15.5 5.5v13" stroke-width="2.2"/>'),
  volume: wrap('<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>'),
  mute: wrap('<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="m16 9.5 5 5M21 9.5l-5 5"/>'),
  music: wrap('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M12 3a9 9 0 0 1 6.4 2.6"/>'),
  share: wrap('<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="m8.2 10.8 7.6-4M8.2 13.2l7.6 4"/>'),
  copy: wrap('<rect x="8.5" y="8.5" width="11" height="11" rx="1.5"/><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5"/>'),
  pin: wrap('<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>'),
  calendar: wrap('<rect x="3.5" y="5" width="17" height="15.5" rx="1.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>'),
  clock: wrap('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
  home: wrap('<path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M9.5 20v-5.5h5V20"/>'),
  couple: wrap('<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>'),
  story: wrap('<path d="M5 4.5h10.5L19 8v11.5H5z"/><path d="M8.5 10h7M8.5 13.5h7M8.5 17h4"/>'),
  image: wrap('<rect x="3.5" y="4.5" width="17" height="15" rx="1.5"/><circle cx="9" cy="10" r="1.8"/><path d="m4 18 5.5-5 4 3.5 2.5-2 4 3.5"/>'),
  mail: wrap('<path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/>'),
  chat: wrap('<path d="M4.5 5.5h15v10h-8l-4.5 3.5v-3.5H4.5z"/>'),
  gift: wrap('<rect x="4" y="9" width="16" height="11" rx="1"/><path d="M3 9h18M12 9v11M12 9S10.5 4.5 8 4.5 5.5 8 8.5 9M12 9s1.5-4.5 4-4.5 2.5 3.5-.5 4.5"/>'),
  instagram: wrap('<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.7"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>'),
  close: wrap('<path d="m6 6 12 12M18 6 6 18"/>'),
  left: wrap('<path d="m14.5 5.5-6.5 6.5 6.5 6.5"/>'),
  right: wrap('<path d="m9.5 5.5 6.5 6.5-6.5 6.5"/>'),
  check: wrap('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
  link: wrap('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'),
  whatsapp: wrap('<path d="M4.5 19.5 5.6 16A8 8 0 1 1 8 18.4z"/><path d="M9 8.8c0 3 2.6 5.9 5.8 6.4l1.2-1.4-1.9-1-1 .8c-1-.4-2.2-1.6-2.6-2.6l.8-1-1-1.9z" fill="currentColor" stroke="none"/>'),
  arrowDown: wrap('<path d="M12 5v14M6.5 13.5 12 19l5.5-5.5"/>'),
};
