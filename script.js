// ============================================================
// Devesh Mahajan Portfolio — Design 2 Blue/Cyan JavaScript
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------------------------------------
  // 1. Mobile Menu Toggle
  // ------------------------------------------------------------
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");

      const isOpen = nav.classList.contains("show");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }


  // ------------------------------------------------------------
  // 2. Smooth Scroll + Close Mobile Menu
  // ------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const target = link.getAttribute("href");

      // Ignore empty "#"
      if (!target || target === "#") {
        return;
      }

      const section = document.querySelector(target);

      if (section) {

        event.preventDefault();

        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        // Close mobile menu
        if (nav && nav.classList.contains("show")) {
          nav.classList.remove("show");

          if (toggle) {
            toggle.setAttribute("aria-expanded", "false");
          }
        }
      }

    });

  });


  // ------------------------------------------------------------
  // 3. Active Navigation
  // About / Experience / Education / Projects / Skills / Contact
  // ------------------------------------------------------------

  const navLinks = nav
    ? Array.from(nav.querySelectorAll('a[href^="#"]'))
    : [];

  const sections = navLinks
    .map((link) => {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);


  const updateActiveNav = () => {

    let currentSection = "";

    sections.forEach((section) => {

      const sectionTop = section.offsetTop;

      if (window.scrollY + 180 >= sectionTop) {
        currentSection = "#" + section.id;
      }

    });


    navLinks.forEach((link) => {

      const isActive =
        link.getAttribute("href") === currentSection;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }

    });

  };


  window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    updateActiveNav
  );

  updateActiveNav();


  // ------------------------------------------------------------
  // 4. Current Year
  // ------------------------------------------------------------

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // ------------------------------------------------------------
  // 5. Scroll Reveal Animation
  // ------------------------------------------------------------

  const revealElements = document.querySelectorAll(
    ".card, .hero-content, .hero-card, .section h2, .community-card, .skill-item"
  );


  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("reveal");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );


    revealElements.forEach((element) => {

      element.classList.add("pre-reveal");

      revealObserver.observe(element);

    });

  } else {

    // Browser fallback
    revealElements.forEach((element) => {

      element.classList.add("reveal");

    });

  }


  // ------------------------------------------------------------
  // 6. ESC Key → Close Mobile Menu
  // ------------------------------------------------------------

  if (toggle && nav) {

    document.addEventListener("keydown", (event) => {

      if (
        event.key === "Escape" &&
        nav.classList.contains("show")
      ) {

        nav.classList.remove("show");

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

        toggle.focus();

      }

    });

  }

});