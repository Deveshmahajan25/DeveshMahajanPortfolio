document.addEventListener("DOMContentLoaded", function () {

  const toggle = document.getElementById("menuToggle");

  const nav = document.getElementById("nav");


  /* ================= MOBILE MENU ================= */

  if (toggle && nav) {

    toggle.addEventListener("click", function () {

      nav.classList.toggle("show");

      const isOpen = nav.classList.contains("show");

      toggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });

  }


  /* ================= SMOOTH SCROLL ================= */

  const anchorLinks = document.querySelectorAll(
    'a[href^="#"]'
  );


  anchorLinks.forEach(function (link) {

    link.addEventListener(
      "click",
      function (event) {

        const target = link.getAttribute("href");


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


          if (
            nav &&
            nav.classList.contains("show")
          ) {

            nav.classList.remove("show");


            if (toggle) {

              toggle.setAttribute(
                "aria-expanded",
                "false"
              );

            }

          }

        }

      }
    );

  });


  /* ================= ACTIVE NAVIGATION ================= */

  const navLinks = nav
    ? Array.from(
        nav.querySelectorAll('a[href^="#"]')
      )
    : [];


  const sections = navLinks
    .map(function (link) {

      const target = link.getAttribute("href");

      return document.querySelector(target);

    })
    .filter(function (section) {

      return section !== null;

    });


  function updateActiveNav() {

    let currentSection = "";


    sections.forEach(function (section) {

      const sectionTop = section.offsetTop;


      if (
        window.scrollY + 180 >= sectionTop
      ) {

        currentSection =
          "#" + section.id;

      }

    });


    navLinks.forEach(function (link) {

      const linkTarget =
        link.getAttribute("href");


      const isActive =
        linkTarget === currentSection;


      link.classList.toggle(
        "active",
        isActive
      );


      if (isActive) {

        link.setAttribute(
          "aria-current",
          "page"
        );

      } else {

        link.removeAttribute(
          "aria-current"
        );

      }

    });

  }


  window.addEventListener(
    "scroll",
    updateActiveNav,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    updateActiveNav
  );


  updateActiveNav();


  /* ================= CURRENT YEAR ================= */

  const yearElement =
    document.getElementById("year");


  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }


  /* ================= SCROLL REVEAL ================= */

  const revealElements =
    document.querySelectorAll(
      ".card, .hero-content, .hero-card, .section h2, .community-card, .skill-item"
    );


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(

        function (entries, observer) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "reveal"
              );


              observer.unobserve(
                entry.target
              );

            }

          });

        },

        {
          threshold: 0.12
        }

      );


    revealElements.forEach(function (element) {

      element.classList.add(
        "pre-reveal"
      );


      revealObserver.observe(
        element
      );

    });

  } else {

    revealElements.forEach(function (element) {

      element.classList.add(
        "reveal"
      );

    });

  }


  /* ================= ESC CLOSE MENU ================= */

  if (toggle && nav) {

    document.addEventListener(
      "keydown",
      function (event) {

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

      }
    );

  }

});