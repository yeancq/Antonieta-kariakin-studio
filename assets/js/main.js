(function () {
  "use strict";

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
})();
