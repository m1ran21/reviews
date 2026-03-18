const CONTENT = {
  hotelName: "Porto Bello Hotel",
  links: {
    google: "https://g.page/r/CfdprlLUQFm2EBM/review",
    tripadvisor: "http://www.tripadvisor.com/UserReviewEdit-d24084649?m=68676",
    gis2: "https://2gis.uz/reviews/70000001063186863/addReview?utm_source=lk",
    yandex: "https://yandex.uz/maps/?text=Porto%20Bello%20Hotel%20Tashkent%20Botkin%20119"
  },
  order: ["google", "tripadvisor", "gis2", "yandex"],
  i18n: {
    en: {
      heroSubtitle: "Share your experience with us",
      heroMeta: "Your review helps future guests and supports our team",
      sectionTitle: "Leave a Review",
      footerThanks: "Thank you for your feedback",
      note: "Yandex button currently opens Porto Bello search in Yandex Maps. Replace with direct review link after account access.",
      actions: {
        google: "Google Reviews",
        tripadvisor: "Tripadvisor",
        gis2: "2GIS Reviews",
        yandex: "Yandex Maps"
      }
    },
    ru: {
      heroSubtitle: "Поделитесь вашим впечатлением о нас",
      heroMeta: "Ваш отзыв помогает будущим гостям и нашей команде",
      sectionTitle: "Оставить отзыв",
      footerThanks: "Спасибо за ваш отзыв",
      note: "Кнопка Yandex пока открывает поиск Porto Bello в Yandex Maps. После доступа к аккаунту замените на прямую ссылку отзыва.",
      actions: {
        google: "Отзывы Google",
        tripadvisor: "Tripadvisor",
        gis2: "Отзывы 2GIS",
        yandex: "Yandex Maps"
      }
    },
    uz: {
      heroSubtitle: "Biz haqimizdagi fikringizni qoldiring",
      heroMeta: "Sizning sharhingiz kelajak mehmonlarga va jamoamizga yordam beradi",
      sectionTitle: "Sharh qoldirish",
      footerThanks: "Fikringiz uchun rahmat",
      note: "Yandex tugmasi hozircha Yandex Maps ichida Porto Bello qidiruvini ochadi. Hisobga kirish bo'lgach to'g'ridan-to'g'ri sharh havolasiga almashtiring.",
      actions: {
        google: "Google sharhlari",
        tripadvisor: "Tripadvisor",
        gis2: "2GIS sharhlari",
        yandex: "Yandex Maps"
      }
    }
  }
};

const ICONS = {
  google: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12.2c0 4.7-3.1 8.1-8 8.1a8.3 8.3 0 1 1 0-16.6c2.3 0 4.2.8 5.6 2.2"/><path d="M21 12h-9"/><path d="M12 12h4"/></svg>`,
  tripadvisor: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="12" r="3.2"/><circle cx="16" cy="12" r="3.2"/><path d="M4 8.5h16"/><path d="M11.2 12h1.6"/><circle cx="8" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="12" r="1" fill="currentColor" stroke="none"/></svg>`,
  gis2: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.1 6-10a6 6 0 1 0-12 0c0 4.9 6 10 6 10Z"/><rect x="10.1" y="9.1" width="3.8" height="3.8" rx=".5"/></svg>`,
  yandex: `<svg class="icon-filled" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8c-3.8 0-6.8 2.9-6.8 6.6 0 5.2 6.8 11.8 6.8 11.8s6.8-6.6 6.8-11.8c0-3.7-3-6.6-6.8-6.6Z"/><circle cx="12" cy="9.4" r="2.2" fill="#ffffff"/></svg>`
};

const byId = (id) => document.getElementById(id);
let currentLang = "en";

function applyText(lang) {
  const t = CONTENT.i18n[lang];
  byId("hotelName").textContent = CONTENT.hotelName;
  byId("brandFallback").textContent = CONTENT.hotelName;
  byId("heroSubtitle").textContent = t.heroSubtitle;
  byId("heroMeta").textContent = t.heroMeta;
  byId("actionsTitle").textContent = t.sectionTitle;
  byId("footerHotel").textContent = CONTENT.hotelName;
  byId("footerThanks").textContent = t.footerThanks;
  byId("year").textContent = String(new Date().getFullYear());
}

function createReviewButton(key, lang) {
  const t = CONTENT.i18n[lang];
  const a = document.createElement("a");
  a.className = "action-link";
  a.href = CONTENT.links[key];
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.setAttribute("aria-label", `${t.actions[key]} - Porto Bello Hotel`);
  a.innerHTML = `
    <span class="icon-wrap">${ICONS[key]}</span>
    <span class="action-label">${t.actions[key]}</span>
  `;
  return a;
}

function renderReviewButtons(lang) {
  const grid = byId("actionGrid");
  grid.innerHTML = "";
  CONTENT.order.forEach((key) => {
    grid.appendChild(createReviewButton(key, lang));
  });

  const existingNote = document.querySelector(".note");
  if (existingNote) existingNote.remove();
  const note = document.createElement("p");
  note.className = "note";
  note.textContent = CONTENT.i18n[lang].note;
  grid.parentElement.appendChild(note);
}

function setupLanguageSwitcher() {
  const buttons = document.querySelectorAll(".lang-btn");
  const updateState = (lang) => {
    buttons.forEach((button) => {
      const active = button.dataset.lang === lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.dataset.lang;
      if (!CONTENT.i18n[lang]) return;
      currentLang = lang;
      applyText(currentLang);
      renderReviewButtons(currentLang);
      updateState(currentLang);
    });
  });
}

function setupRevealAnimation() {
  const items = document.querySelectorAll(".reveal");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  items.forEach((item, index) => {
    window.setTimeout(() => item.classList.add("is-visible"), 90 + index * 80);
  });
}

function setupBrandFallback() {
  const brandLockup = document.querySelector(".brand-lockup");
  const brandFallback = byId("brandFallback");
  const brandImages = document.querySelectorAll("[data-brand-image]");
  if (!brandLockup || !brandFallback || !brandImages.length) return;

  let failed = false;
  brandImages.forEach((img) => {
    img.addEventListener("error", () => {
      if (failed) return;
      failed = true;
      brandLockup.style.display = "none";
      brandFallback.hidden = false;
    });
  });
}

function setupBrandTilt() {
  const tiltItems = document.querySelectorAll("[data-tilt]");
  if (!tiltItems.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  tiltItems.forEach((item) => {
    const setTilt = (x, y) => {
      const rect = item.getBoundingClientRect();
      const px = (x - rect.left) / rect.width;
      const py = (y - rect.top) / rect.height;
      item.style.setProperty("--rx", `${((0.5 - py) * 7).toFixed(2)}deg`);
      item.style.setProperty("--ry", `${((px - 0.5) * 7).toFixed(2)}deg`);
    };

    item.addEventListener("pointerenter", () => item.classList.add("is-tilting"));
    item.addEventListener("pointermove", (event) => setTilt(event.clientX, event.clientY));
    item.addEventListener("pointerleave", () => {
      item.classList.remove("is-tilting");
      item.style.setProperty("--rx", "0deg");
      item.style.setProperty("--ry", "0deg");
    });
    item.addEventListener("pointerdown", (event) => {
      item.classList.add("is-tilting");
      setTilt(event.clientX, event.clientY);
    });
    item.addEventListener("pointerup", () => {
      item.classList.remove("is-tilting");
      item.style.setProperty("--rx", "0deg");
      item.style.setProperty("--ry", "0deg");
    });
  });
}

function init() {
  applyText(currentLang);
  renderReviewButtons(currentLang);
  setupLanguageSwitcher();
  setupBrandFallback();
  setupBrandTilt();
  setupRevealAnimation();
}

document.addEventListener("DOMContentLoaded", init);
