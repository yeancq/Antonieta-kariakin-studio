(function () {
  "use strict";

  /* Footer: dynamic copyright year */
  var yearEl = document.getElementById("currentYear");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* Header: solid background after scrolling past the hero */
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav toggle */
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");
  navToggle.addEventListener("click", function () {
    var isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });
  siteNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir menú");
    });
  });

  /* Hero video: accessible play/pause control (WCAG 2.2.2) */
  var video = document.getElementById("heroVideo");
  var toggle = document.getElementById("heroToggle");
  var iconPause = toggle.querySelector(".icon--pause");
  var iconPlay = toggle.querySelector(".icon--play");

  var setPausedUI = function (paused) {
    iconPause.hidden = paused;
    iconPlay.hidden = !paused;
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.setAttribute("aria-label", paused ? "Reproducir video de fondo" : "Pausar video de fondo");
  };

  toggle.addEventListener("click", function () {
    if (video.paused) {
      video.play();
      setPausedUI(false);
    } else {
      video.pause();
      setPausedUI(true);
    }
  });

  /* Respect reduced-motion preference: start paused on first paint */
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (prefersReducedMotion.matches) {
    video.pause();
    setPausedUI(true);
  }

  /* Accessible tabs (WAI-ARIA tabs pattern), works for any .tabs block on the page */
  document.querySelectorAll(".tabs").forEach(function (tabGroup) {
    var tabs = Array.prototype.slice.call(tabGroup.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (tab) {
      return document.getElementById(tab.getAttribute("aria-controls"));
    });

    var activate = function (index) {
      tabs.forEach(function (tab, i) {
        var selected = i === index;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[i].hidden = !selected;
      });
      tabs[index].focus();
    };

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        activate(index);
      });
      tab.addEventListener("keydown", function (e) {
        var lastIndex = tabs.length - 1;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          activate(index === lastIndex ? 0 : index + 1);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          activate(index === 0 ? lastIndex : index - 1);
        } else if (e.key === "Home") {
          e.preventDefault();
          activate(0);
        } else if (e.key === "End") {
          e.preventDefault();
          activate(lastIndex);
        }
      });
    });
  });
})();
