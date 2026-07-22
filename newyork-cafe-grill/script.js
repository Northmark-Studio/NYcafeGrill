// Newyork Cafe & Grill — nav toggle, hero slider, product scroll, reveal, year

(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      links.classList.toggle("is-open", !open);
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        links.classList.remove("is-open");
      }
    });
  }

  /* ---- Hero banner slider ---- */
  var track = document.getElementById("hero-track");
  var dotsWrap = document.getElementById("hero-dots");

  if (track) {
    var slides = track.children.length;
    var index = 0;
    var timer = null;
    var AUTOPLAY_MS = 5500;

    // Build dots
    var dots = [];
    if (dotsWrap) {
      for (var i = 0; i < slides; i++) {
        var b = document.createElement("button");
        b.setAttribute("role", "tab");
        b.setAttribute("aria-label", "Go to slide " + (i + 1));
        b.dataset.i = i;
        b.addEventListener("click", (function (n) {
          return function () { go(n); restart(); };
        })(i));
        dotsWrap.appendChild(b);
        dots.push(b);
      }
    }

    function render() {
      // Each slide is flex:0 0 100% of the viewport, so shift a full 100% per index.
      track.style.transform = "translateX(" + (-index * 100) + "%)";
      dots.forEach(function (d, n) {
        d.classList.toggle("is-active", n === index);
        if (n === index) d.setAttribute("aria-selected", "true");
        else d.removeAttribute("aria-selected");
      });
    }

    function go(n) { index = (n + slides) % slides; render(); }
    function next() { go(index + 1); }
    function prev() { go(index - 1); }

    function start() {
      if (reducedMotion) return;
      timer = setInterval(next, AUTOPLAY_MS);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    var nextBtn = document.getElementById("hero-next");
    var prevBtn = document.getElementById("hero-prev");
    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restart(); });

    // Pause on hover / when tab hidden
    var viewport = track.parentElement;
    if (viewport) {
      viewport.addEventListener("mouseenter", stop);
      viewport.addEventListener("mouseleave", start);
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });

    render();
    start();
  }

  /* ---- Product horizontal scroller ---- */
  var prodTrack = document.getElementById("prodtrack");
  if (prodTrack) {
    var STEP = 344; // card width (300) + gap (22) + a touch
    var pNext = document.getElementById("prod-next");
    var pPrev = document.getElementById("prod-prev");
    if (pNext) pNext.addEventListener("click", function () { prodTrack.scrollBy({ left: STEP, behavior: "smooth" }); });
    if (pPrev) pPrev.addEventListener("click", function () { prodTrack.scrollBy({ left: -STEP, behavior: "smooth" }); });
  }

  /* ---- Scroll reveal (once per element) ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if (!reducedMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Footer year ---- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
