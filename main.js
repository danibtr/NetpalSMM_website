// ====== YEAR IN FOOTER ======
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ====== MOBILE MENU ======
const burgerBtn = document.getElementById('burgerBtn');
const mainNav = document.getElementById('mainNav');
if (burgerBtn && mainNav) {
  burgerBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
}

// ====== THEME TOGGLE (DARK / LIGHT) ======
const htmlEl = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function setTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('netpal_theme', theme);
  if (themeIcon) {
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }
}

const savedTheme = localStorage.getItem('netpal_theme') || 'dark';
setTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// ====== LANGUAGE TOGGLE (EN / AR) ======
const langToggle = document.getElementById('langToggle');
const langCodeSpan = document.getElementById('langCode');

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',

    'hero.badge': 'Smart Marketing for SMM Panels',
    'hero.title': 'Grow your SMM Panel\nwith real marketing, not fake numbers.',
    'hero.subtitle': 'We build professional campaigns on WhatsApp, Telegram and social media to bring real paying clients to your SMM panel.',
    'hero.cta.primary': 'View pricing',
    'hero.cta.secondary': 'Explore services',
    'hero.meta1': '120+ campaigns delivered',
    'hero.meta2': '60+ SMM panels served',
    'hero.meta3': '24/7 support',

    'home.servicesTitle': 'What we do for your SMM panel',
    'home.servicesSub': 'We drive real traffic and orders to your panel with targeted campaigns and clean design.',

    'services.title': 'Services for serious SMM panels',
    'services.subtitle': 'We help you bring real clients, not just numbers, using WhatsApp, Telegram and social media funnels.',

    'pricing.title': 'Pricing plans for your SMM panel',
    'pricing.subtitle': 'Start small, test campaigns, then scale once you see results.',

    'contact.title': 'Let’s talk about your SMM panel',
    'contact.subtitle': 'Tell us about your niche, country and current traffic – we’ll suggest a plan that fits you.',
    'contact.contactUs': 'Contact options',
    'contact.text': 'The fastest way is WhatsApp, but you can also send a message from the form.',
    'contact.follow': 'Follow us',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email (optional)',
    'contact.form.panel': 'SMM panel URL',
    'contact.form.details': 'What do you need?',
    'contact.form.send': 'Send message'
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.pricing': 'الخطط',
    'nav.contact': 'تواصل',

    'hero.badge': 'تسويق ذكي للوحات SMM',
    'hero.title': 'كبّر لوحة الـ SMM\nبتسويق حقيقي مو أرقام وهمية.',
    'hero.subtitle': 'نطلق حملات احترافية على واتساب وتيليجرام والسوشال ميديا لجلب عملاء حقيقيين للّوحة الخاصة فيك.',
    'hero.cta.primary': 'شاهد الأسعار',
    'hero.cta.secondary': 'تعرّف على الخدمات',
    'hero.meta1': 'أكثر من 120 حملة منفَّذة',
    'hero.meta2': 'أكثر من 60 لوحة SMM خدمناها',
    'hero.meta3': 'دعم متواصل 24/7',

    'home.servicesTitle': 'ماذا نفعل للّوحة SMM الخاصة بك؟',
    'home.servicesSub': 'نرسل زيارات وطلبات حقيقية للّوحة من خلال حملات مستهدفة وتصاميم مرتّبة.',

    'services.title': 'خدمات مخصصة للوحات SMM الجدية',
    'services.subtitle': 'نساعدك تجيب عملاء حقيقيين، مو بس أرقام، عبر واتساب وتيليجرام والسوشال ميديا.',

    'pricing.title': 'خطط أسعار تناسب لوحتك',
    'pricing.subtitle': 'ابدأ بحملة صغيرة، جرّب النتائج، وبعدها كبّر على راحتك.',

    'contact.title': 'خلينا نحكي عن لوحة الـ SMM تبعك',
    'contact.subtitle': 'احكيلنا عن النيتش، والدول المستهدفة، والزيارات الحالية – ونعطيك خطة مناسبة.',
    'contact.contactUs': 'طرق التواصل',
    'contact.text': 'أسرع شيء واتساب، بس كمان فيك تبعت رسالة من النموذج.',
    'contact.follow': 'تابعنا',
    'contact.form.name': 'الاسم',
    'contact.form.email': 'الإيميل (اختياري)',
    'contact.form.panel': 'رابط لوحة الـ SMM',
    'contact.form.details': 'شو الخدمات أو الحملات اللي محتاجها؟',
    'contact.form.send': 'إرسال الرسالة'
  }
};

function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  if (langCodeSpan) langCodeSpan.textContent = lang.toUpperCase();

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const txt = dict[key];
    if (!txt) return;
    if (txt.includes('\n')) {
      el.innerHTML = txt.replace('\n', '<br>');
    } else {
      el.textContent = txt;
    }
  });
  localStorage.setItem('netpal_lang', lang);
}

const savedLang = localStorage.getItem('netpal_lang') || 'en';
applyLanguage(savedLang);

if (langToggle) {
  langToggle.addEventListener('click', () => {
    const current = localStorage.getItem('netpal_lang') || 'en';
    applyLanguage(current === 'en' ? 'ar' : 'en');
  });
}

// ====== HERO SLIDER ======
(function initSlider() {
  const slider = document.getElementById('homeSlider');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.slide'));
  const dotsContainer = document.getElementById('sliderDots');
  let currentIndex = 0;
  let timerId;

  if (dotsContainer) {
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = 'slider-dot' + (idx === 0 ? ' active' : '');
      dot.dataset.index = String(idx);
      dot.addEventListener('click', () => goToSlide(idx, true));
      dotsContainer.appendChild(dot);
    });
  }

  const prevBtn = slider.querySelector('[data-slider-prev]');
  const nextBtn = slider.querySelector('[data-slider-next]');

  function updateUI() {
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentIndex);
    });
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.slider-dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }
  }

  function goToSlide(idx, manual = false) {
    currentIndex = (idx + slides.length) % slides.length;
    updateUI();
    if (manual) {
      resetTimer();
    }
  }

  function next() {
    goToSlide(currentIndex + 1);
  }

  function resetTimer() {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(next, 5000);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1, true));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1, true));

  updateUI();
  resetTimer();
})();
