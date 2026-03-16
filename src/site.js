const header = document.querySelector(".site-header");
const logo = document.querySelector("[data-logo]");
const body = document.body;
const mobileNavPanel = document.querySelector(".mobile-nav-panel");
const mobileNavToggles = Array.from(document.querySelectorAll("[data-mobile-nav-toggle]"));
const mobileNavCloseButtons = Array.from(document.querySelectorAll("[data-mobile-nav-close]"));
const mobileNavLinks = Array.from(document.querySelectorAll(".mobile-nav-links a"));

const ROUTES_WITH_TRANSPARENT_HEADER = ["home", "servizi", "sedi-e-contatti"];
const isTransparentRoute = ROUTES_WITH_TRANSPARENT_HEADER.includes(
  body.dataset.route
);

const LOGO_FULL = "/images/logo-completo.png";
const LOGO_COMPACT = "/images/logo-box.png";

function applyHeaderState(scrolled) {
  if (!header || !logo) return;
  if (scrolled) {
    header.classList.add("scrolled");
    logo.src = LOGO_COMPACT;
  } else {
    header.classList.remove("scrolled");
    logo.src = LOGO_FULL;
  }
}

if (header) {
  if (isTransparentRoute) {
    applyHeaderState(window.scrollY > 10);
    window.addEventListener("scroll", () => {
      applyHeaderState(window.scrollY > 10);
    });
  } else {
    header.classList.add("scrolled");
    if (logo) logo.src = LOGO_COMPACT;
  }
}

function setMobileNavOpen(isOpen) {
  if (!mobileNavPanel || mobileNavToggles.length === 0) return;

  body.classList.toggle("mobile-nav-open", isOpen);
  mobileNavPanel.setAttribute("aria-hidden", String(!isOpen));

  mobileNavToggles.forEach((toggle) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (mobileNavPanel && mobileNavToggles.length > 0) {
  mobileNavToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const isOpen = !body.classList.contains("mobile-nav-open");
      setMobileNavOpen(isOpen);
    });
  });

  mobileNavCloseButtons.forEach((button) => {
    button.addEventListener("click", () => setMobileNavOpen(false));
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => setMobileNavOpen(false));
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMobileNavOpen(false);
    }
  });
}

const slider = document.querySelector("[data-hero-slider]");
if (slider) {
  const slides = Array.from(slider.querySelectorAll(".hero-slide"));
  let index = 0;
  slides[index]?.classList.add("active");
  setInterval(() => {
    slides[index]?.classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index]?.classList.add("active");
  }, 5000);
}
