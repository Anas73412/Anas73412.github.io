/**
 * Anas Mansoori — Senior Android Developer Portfolio
 * Lightweight vanilla JS. Progressive enhancement: site works without JS.
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  function prefersReducedMotion() {
    return reduceMotionQuery.matches;
  }

  /* --------------------------------------------------------------------------
     Theme toggle (dark default, light optional)
     -------------------------------------------------------------------------- */
  var themeToggle = document.getElementById("theme-toggle");
  var metaThemeColor = document.getElementById("meta-theme-color");

  function getTheme() {
    return document.documentElement.getAttribute("data-theme") === "light"
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    var next = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch (err) {
      /* ignore private-mode storage errors */
    }
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", next === "dark" ? "#0B1220" : "#3DDC84");
    }
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        next === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      applyTheme(getTheme() === "dark" ? "light" : "dark");
    });
    applyTheme(getTheme());
  }

  var MOBILE_MAX = 768;
  var BACK_TO_TOP_OFFSET = 400;

  var navToggle = document.querySelector(".nav-toggle");
  var primaryNav = document.getElementById("primary-nav");
  var navLinks = primaryNav
    ? primaryNav.querySelectorAll('a[href^="#"]')
    : [];
  var sections = document.querySelectorAll("main section[id]");
  var yearEl = document.getElementById("year");
  var backToTop = document.querySelector(".back-to-top");
  var revealEls = document.querySelectorAll(".reveal");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function isMobileNav() {
    return window.innerWidth <= MOBILE_MAX;
  }

  function setMenuOpen(isOpen) {
    if (!navToggle || !primaryNav) return;

    primaryNav.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", isOpen);

    if (isOpen && isMobileNav()) {
      var firstLink = primaryNav.querySelector("a");
      if (firstLink) firstLink.focus();
    }
  }

  function closeMenu(returnFocus) {
    var wasOpen = navToggle && navToggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(false);
    if (returnFocus && wasOpen && navToggle) {
      navToggle.focus();
    }
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var expanded = navToggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!expanded);
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu(true);
      }
    });

    window.addEventListener("resize", function () {
      if (!isMobileNav()) {
        closeMenu(false);
      }
    });
  }

  /* Smooth scrolling for same-page anchors */
  document.addEventListener("click", function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link) return;

    var hash = link.getAttribute("href");
    if (!hash || hash.length < 2) return;

    var target = null;
    try {
      target = document.querySelector(hash);
    } catch (err) {
      return;
    }
    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });

    if (history.pushState) {
      history.pushState(null, "", hash);
    }

    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
    }
    try {
      target.focus({ preventScroll: true });
    } catch (err) {
      target.focus();
    }
  });

  function setActiveNav(id) {
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      var linkId = href.charAt(0) === "#" ? href.slice(1) : "";
      if (linkId && linkId === id) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (entry) {
            return entry.isIntersecting;
          })
          .sort(function (a, b) {
            return b.intersectionRatio - a.intersectionRatio;
          });

        if (visible.length) {
          setActiveNav(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  } else if (sections.length && navLinks.length) {
    function updateActiveNavScroll() {
      var scrollPos = window.scrollY + window.innerHeight * 0.35;
      var currentId = sections[0].id;

      for (var i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= scrollPos) {
          currentId = sections[i].id;
        }
      }

      setActiveNav(currentId);
    }

    window.addEventListener("scroll", updateActiveNavScroll, { passive: true });
    updateActiveNavScroll();
  }

  function updateBackToTop() {
    if (!backToTop) return;
    var show = window.scrollY > BACK_TO_TOP_OFFSET;
    backToTop.classList.toggle("is-visible", show);
    backToTop.setAttribute("aria-hidden", show ? "false" : "true");
    backToTop.tabIndex = show ? 0 : -1;
  }

  if (backToTop) {
    backToTop.tabIndex = -1;
    backToTop.setAttribute("aria-hidden", "true");
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();
  }

  /* Reveal: enable CSS hide only after observer is ready (avoids blank content) */
  if (revealEls.length) {
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      document.documentElement.classList.add("reveal-ready");

      var revealObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -8% 0px",
          threshold: 0.12,
        }
      );

      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  if (typeof reduceMotionQuery.addEventListener === "function") {
    reduceMotionQuery.addEventListener("change", function () {
      if (prefersReducedMotion()) {
        document.documentElement.classList.remove("reveal-ready");
        revealEls.forEach(function (el) {
          el.classList.add("is-visible");
        });
      }
    });
  }
})();
