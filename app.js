// ========= NAV (mobile) =========
const burger = document.querySelector('.burger');
const nav = document.querySelector('.main-nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// ========= THEME TOGGLE =========
const themeBtn = document.getElementById('themeToggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('netpal_theme', theme);
}

const savedTheme = localStorage.getItem('netpal_theme') || 'light';
applyTheme(savedTheme);

if (themeBtn) {
  themeBtn.textContent = savedTheme === 'dark' ? 'Light' : 'Dark';
  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    themeBtn.textContent = next === 'dark' ? 'Light' : 'Dark';
  });
}

// ========= LANGUAGE TOGGLE (basic) =========
const langBtn = document.getElementById('langToggle');
let currentLang = localStorage.getItem('netpal_lang') || 'en';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('netpal_lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // عناصر عليها data-i18n
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const text = translations[lang]?.[key];
    if (text) el.textContent = text;
  });

  if (langBtn) {
    langBtn.textContent = lang === 'en' ? 'EN' : 'AR';
  }
}

// نصوص بسيطة (ممكن توسّعها بعدين)
const translations = {
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'hero.title': 'Grow your SMM panel with real marketing, not just numbers.',
    'hero.sub':
      'NetPal SMM helps you bring real clients to your SMM panel using WhatsApp, Telegram, social ads and landing pages.',
    'hero.cta.main': 'View plans',
    'hero.cta.secondary': 'See services',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.pricing': 'الأسعار',
    'nav.contact': 'تواصل',
    'hero.title': 'نمِ لوحة الـ SMM عندك بتسويق حقيقي، مو أرقام فقط.',
    'hero.sub':
      'NetPal SMM تساعدك تجيب عملاء حقيقيين للوحة الـ SMM عبر حملات واتساب، تيليجرام، إعلانات وصفحات هبوط.',
    'hero.cta.main': 'شاهد الباقات',
    'hero.cta.secondary': 'تعرف على الخدمات',
  },
};

applyLang(currentLang);

if (langBtn) {
  langBtn.addEventListener('click', () => {
    const next = currentLang === 'en' ? 'ar' : 'en';
    applyLang(next);
  });
}
