/* =====================================================================
   BREAK OF DAWN — motion layer
   Progressive enhancement: core reveals use IntersectionObserver and
   always work; Lenis + GSAP add smooth-scroll & parallax when available.
   ===================================================================== */
(function () {
  "use strict";
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("enhanced");

  const hasGSAP = !!window.gsap;
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------- Lenis smooth scroll ---------- */
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    if (hasGSAP && window.ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* ---------- Smooth anchor scrolling ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          if (lenis) lenis.scrollTo(el, { offset: -80 });
          else el.scrollIntoView({ behavior: "smooth" });
          closeMenu();
        }
      }
    });
  });

  /* ---------- Reveal on scroll (+ auto stagger by sibling index) ---------- */
  const revealSel = "[data-reveal],[data-reveal-up],.reveal-line";
  // give each element a stagger delay based on its position among matching siblings
  document.querySelectorAll(revealSel).forEach((el) => {
    const parent = el.parentElement;
    if (!parent) return;
    const sibs = Array.from(parent.children).filter((c) => c.matches(revealSel));
    if (sibs.length > 1) {
      const i = sibs.indexOf(el);
      el.style.transitionDelay = (i * 0.09).toFixed(2) + "s";
    }
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  document.querySelectorAll(revealSel).forEach((el) => io.observe(el));

  /* ---------- Nav + cinematic hero on scroll ---------- */
  const nav = document.getElementById("nav");
  const heroCine = document.getElementById("heroCine");
  const heroMedia = document.getElementById("heroMedia");
  const heroScrim = document.getElementById("heroScrim");
  const hasVideoHero = !!heroCine;

  const onScroll = () => {
    const y = window.scrollY;
    if (nav) {
      const threshold = hasVideoHero ? window.innerHeight - 90 : 40;
      nav.classList.toggle("nav--solid", y > threshold);
    }
    if (heroCine && !reduce) {
      const p = Math.min(Math.max(y / window.innerHeight, 0), 1);
      if (heroMedia) heroMedia.style.transform = "scale(" + (1 + p * 0.06).toFixed(4) + ")";
      if (heroScrim) heroScrim.style.opacity = (0.9 + p * 0.1).toFixed(3);
      heroCine.style.opacity = (1 - p * 0.22).toFixed(3);
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  if (lenis) lenis.on("scroll", onScroll);

  // entrance: fade the video + overlay in
  if (heroCine) requestAnimationFrame(() => requestAnimationFrame(() => heroCine.classList.add("is-ready")));

  /* ---------- Mobile menu ---------- */
  const toggle = document.getElementById("navToggle");
  function closeMenu() {
    if (!document.body.classList.contains("nav-open")) return;
    document.body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    if (lenis) lenis.start();
  }
  function openMenu() {
    document.body.classList.add("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    if (lenis) lenis.stop();
  }
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.contains("nav-open") ? closeMenu() : openMenu();
    });
  }
  document.querySelectorAll("#mobileMenu a").forEach((a) => a.addEventListener("click", closeMenu));
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  /* ---------- Custom cursor ---------- */
  const cursor = document.getElementById("cursor");
  if (cursor && window.matchMedia("(hover: hover)").matches) {
    const label = cursor.querySelector(".cursor-label");
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
    const speed = 0.2;
    addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; cursor.classList.add("is-on"); }, { passive: true });
    const loop = () => {
      cx += (tx - cx) * speed; cy += (ty - cy) * speed;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    const hoverSel = "a, button, input, .flavour-item";
    document.querySelectorAll(hoverSel).forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("is-hover");
        const v = el.getAttribute("data-view");
        if (v) { cursor.classList.add("is-view"); if (label) label.textContent = v; }
      });
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover", "is-view"));
    });
  }

  /* ---------- GSAP parallax (optional) ---------- */
  if (hasGSAP && window.ScrollTrigger && !reduce) {
    // hero sunrise drifts up + fades as you scroll past
    const sun = document.querySelector(".hero-sun");
    if (sun) {
      gsap.to(sun, {
        yPercent: -22, opacity: 0.35, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
    }
    // subtle image parallax
    gsap.utils.toArray(".founder-media img, .feature-media video").forEach((el) => {
      gsap.fromTo(el, { yPercent: -8 }, {
        yPercent: 8, ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    // product cards gently parallax their domes
    gsap.utils.toArray(".range-prod").forEach((el) => {
      gsap.fromTo(el, { yPercent: 6 }, {
        yPercent: -6, ease: "none",
        scrollTrigger: { trigger: el.closest(".range-card"), start: "top bottom", end: "bottom top", scrub: true },
      });
    });
  }

  /* ---------- Hero video pause toggle ---------- */
  const pauseBtn = document.getElementById("heroPause");
  const heroVid = document.querySelector(".hero-video");
  if (pauseBtn && heroVid && heroVid.tagName === "VIDEO") {
    pauseBtn.addEventListener("click", () => {
      const paused = heroVid.paused;
      paused ? heroVid.play() : heroVid.pause();
      pauseBtn.textContent = paused ? "❚❚" : "▶";
      pauseBtn.setAttribute("aria-pressed", String(!paused));
      pauseBtn.setAttribute("aria-label", paused ? "Pause background video" : "Play background video");
    });
  }

  /* ---------- Flavour scroller: drag to scroll ---------- */
  const fs = document.getElementById("flavourScroll");
  if (fs) {
    let down = false, startX = 0, startL = 0, moved = false;
    fs.addEventListener("pointerdown", (e) => {
      down = true; moved = false; startX = e.clientX; startL = fs.scrollLeft;
    });
    addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) { moved = true; fs.classList.add("is-dragging"); }
      if (moved) fs.scrollLeft = startL - dx;
    }, { passive: true });
    addEventListener("pointerup", () => { down = false; fs.classList.remove("is-dragging"); });
  }

  /* ---------- Testimonials slider ---------- */
  const stage = document.getElementById("testiStage");
  if (stage) {
    const items = Array.from(stage.querySelectorAll(".testi-item"));
    const dotsWrap = document.getElementById("testiDots");
    const prev = document.getElementById("testiPrev");
    const next = document.getElementById("testiNext");
    let idx = 0, timer = null;

    const dots = items.map((_, i) => {
      const d = document.createElement("button");
      d.className = "testi-dot" + (i === 0 ? " active" : "");
      d.setAttribute("aria-label", "Review " + (i + 1));
      d.addEventListener("click", () => { go(i); restart(); });
      dotsWrap.appendChild(d);
      return d;
    });

    function go(n) {
      idx = (n + items.length) % items.length;
      items.forEach((el, i) => el.classList.toggle("active", i === idx));
      dots.forEach((d, i) => d.classList.toggle("active", i === idx));
    }
    function restart() {
      if (reduce) return;
      clearInterval(timer);
      timer = setInterval(() => go(idx + 1), 6500);
    }
    prev.addEventListener("click", () => { go(idx - 1); restart(); });
    next.addEventListener("click", () => { go(idx + 1); restart(); });
    const section = stage.closest(".testimonials");
    section.addEventListener("mouseenter", () => clearInterval(timer));
    section.addEventListener("mouseleave", restart);
    section.addEventListener("focusin", () => clearInterval(timer));
    section.addEventListener("focusout", restart);
    section.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { go(idx - 1); restart(); }
      if (e.key === "ArrowRight") { go(idx + 1); restart(); }
    });
    restart();
  }

  /* ---------- Footer year ---------- */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Products page: filter ---------- */
  const filterBar = document.getElementById("filterBar");
  if (filterBar) {
    const cards = Array.from(document.querySelectorAll("[data-cat]"));
    const apply = (cat) => {
      filterBar.querySelectorAll("button").forEach((b) => {
        const on = b.dataset.filter === cat;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      cards.forEach((c) => c.classList.toggle("is-hidden", !(cat === "all" || c.dataset.cat === cat)));
      if (hasGSAP && window.ScrollTrigger) ScrollTrigger.refresh();
    };
    filterBar.querySelectorAll("button").forEach((btn) => btn.addEventListener("click", () => apply(btn.dataset.filter)));
    // deep-link: products.html#almond-milk preselects that filter
    const hash = decodeURIComponent(location.hash.replace("#", ""));
    if (hash && filterBar.querySelector(`[data-filter="${hash}"]`)) {
      apply(hash);
      const bar = document.querySelector(".filter-wrap");
      if (bar) setTimeout(() => bar.scrollIntoView({ behavior: "instant", block: "start" }), 0);
    }
  }
})();
