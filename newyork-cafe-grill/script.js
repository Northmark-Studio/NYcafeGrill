// Newyork Cafe & Grill — nav toggle, reveal, year

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

  /* ---- Hero image slider ---- */
  var heroTrack = document.getElementById("hero-track");

  if (heroTrack && heroTrack.children.length > 1) {
    var slides = heroTrack.children;
    var dotsWrap = document.getElementById("hero-dots");
    var index = 0;
    var timer = null;
    var DELAY = 6000;

    function render() {
      heroTrack.style.transform = "translateX(" + (-index * 100) + "%)";
      Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
        dot.classList.toggle("is-active", i === index);
        dot.setAttribute("aria-selected", String(i === index));
      });
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      render();
      restart();
    }

    function restart() {
      if (timer) clearInterval(timer);
      if (!reducedMotion) timer = setInterval(function () { goToAuto(); }, DELAY);
    }

    function goToAuto() {
      index = (index + 1) % slides.length;
      render();
    }

    Array.prototype.forEach.call(slides, function (slide, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Slide " + (i + 1));
      dot.addEventListener("click", function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });

    document.getElementById("hero-prev").addEventListener("click", function () { goTo(index - 1); });
    document.getElementById("hero-next").addEventListener("click", function () { goTo(index + 1); });

    heroTrack.parentElement.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); });
    heroTrack.parentElement.addEventListener("mouseleave", restart);

    render();
    restart();
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

  /* ---- Contact form ----
     Static site: no server. Submitting builds a prefilled email to the shop
     and hands it to the visitor's mail app. To switch to a hosted form
     service later, point the <form> action/method at it and delete this block. */
  var CONTACT_EMAIL = "newyorkcafegrill@gmail.com";
  var contactForm = document.getElementById("contact-form");
  var contactStatus = document.getElementById("contact-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = contactForm.elements.name.value.trim();
      var email = contactForm.elements.email.value.trim();
      var phone = contactForm.elements.phone.value.trim();
      var topic = contactForm.elements.topic.value;
      var message = contactForm.elements.message.value.trim();

      var invalid = [];
      if (!name) invalid.push(contactForm.elements.name);
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) invalid.push(contactForm.elements.email);
      if (!message) invalid.push(contactForm.elements.message);

      [contactForm.elements.name, contactForm.elements.email, contactForm.elements.message]
        .forEach(function (el) { el.classList.remove("has-error"); });

      if (invalid.length) {
        invalid.forEach(function (el) { el.classList.add("has-error"); });
        contactStatus.classList.add("is-error");
        contactStatus.textContent = "Please add your name, a valid email and a message.";
        invalid[0].focus();
        return;
      }

      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + (phone || "-") + "\n" +
        "Topic: " + topic + "\n\n" +
        message + "\n";

      var href = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent("Website enquiry — " + topic) +
        "&body=" + encodeURIComponent(body);

      contactStatus.classList.remove("is-error");
      contactStatus.textContent = "Opening your email app… if nothing happens, write to " + CONTACT_EMAIL + ".";
      window.location.href = href;
    });
  }

  /* ---- Footer year ---- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
