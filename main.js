// mobile nav
const burger = document.getElementById("burgerBtn");
const nav = document.getElementById("mainNav");
if (burger && nav) {
  burger.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// theme toggle
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
const savedTheme = localStorage.getItem("netpal-theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", prefersDark ? "dark" : "light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", current);
    localStorage.setItem("netpal-theme", current);
  });
}

// language toggle (EN/AR)
const langBtn = document.getElementById("langToggle");
const savedLang = localStorage.getItem("netpal-lang");
if (savedLang) {
  document.documentElement.lang = savedLang;
} else {
  document.documentElement.lang = "en";
}

if (langBtn) {
  const updateLabel = () => {
    langBtn.textContent = document.documentElement.lang === "en" ? "AR" : "EN";
  };
  updateLabel();
  langBtn.addEventListener("click", () => {
    const current = document.documentElement.lang === "en" ? "ar" : "en";
    document.documentElement.lang = current;
    localStorage.setItem("netpal-lang", current);
    updateLabel();
  });
}

// reveal on scroll
const reveals = document.querySelectorAll(".reveal");
if (reveals.length) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );
  reveals.forEach(el => observer.observe(el));
}

// load services.json into any container with [data-services-list]
async function loadServices() {
  const container = document.querySelector("[data-services-list]");
  if (!container) return;
  try {
    const res = await fetch("services.json?cache=" + Date.now());
    if (!res.ok) throw new Error("Failed to load services.json");
    const services = await res.json();

    container.innerHTML = "";
    services.forEach(service => {
      const card = document.createElement("article");
      card.className = "service-card reveal";
      card.innerHTML = `
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <div class="service-meta">
          <span>${service.category}</span>
          <span> ${service.price}</span>
        </div>
        <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
          <a href="contact.html" class="btn btn-sm">Contact</a>
          <a href="plans.html" class="btn-outline btn-sm">View plans</a>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Could not load services at the moment.</p>";
  }
}

loadServices();
