/* ============================================
   BASIL V MATHEW PORTFOLIO — MAIN JS
   ============================================ */
(function () {
  'use strict';

  /* ─────────────────────────────────────────
     CUSTOM CURSOR
  ───────────────────────────────────────── */
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0, fX = 0, fY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  (function animateFollower() {
    fX += (mouseX - fX) * 0.12;
    fY += (mouseY - fY) * 0.12;
    follower.style.left = fX + 'px';
    follower.style.top  = fY + 'px';
    requestAnimationFrame(animateFollower);
  })();

  document.addEventListener('mouseleave', () => { cursor.style.opacity='0'; follower.style.opacity='0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity='1'; follower.style.opacity='1'; });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });

  /* ─────────────────────────────────────────
     NAVBAR SCROLL
  ───────────────────────────────────────── */
  const nav = document.getElementById('nav');
  function handleScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ─────────────────────────────────────────
     MOBILE MENU
  ───────────────────────────────────────── */
  const menuBtn    = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;
  function toggleMenu() {
    menuOpen = !menuOpen;
    menuBtn.classList.toggle('active', menuOpen);
    mobileMenu.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }
  menuBtn.addEventListener('click', toggleMenu);
  mobileMenu.querySelectorAll('.mobile-menu__link').forEach(l => l.addEventListener('click', () => { if(menuOpen) toggleMenu(); }));

  /* ─────────────────────────────────────────
     SCROLL REVEAL
  ───────────────────────────────────────── */
  function setupReveal() {
    const els = document.querySelectorAll('.reveal:not(.visible)');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => entry.target.classList.add('visible'), idx * 80);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => obs.observe(el));
  }
  setupReveal();

  /* ─────────────────────────────────────────
     SMOOTH SCROLL
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight, behavior: 'smooth' });
      }
    });
  });

  /* ─────────────────────────────────────────
     PARALLAX HERO CIRCLES
  ───────────────────────────────────────── */
  const circles = document.querySelectorAll('.hero__circle');
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    circles.forEach((c, i) => { c.style.transform = `translateY(${sy * (i===0?0.08:0.14)}px)`; });
  }, { passive: true });

  /* ─────────────────────────────────────────
     PROJECT HOVER TILT
  ───────────────────────────────────────── */
  function attachTilt() {
    document.querySelectorAll('.project__media').forEach(media => {
      media.addEventListener('mousemove', e => {
        const r = media.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        media.style.transform = `perspective(800px) rotateY(${x*5}deg) rotateX(${-y*5}deg)`;
      });
      media.addEventListener('mouseleave', () => { media.style.transform = ''; });
    });
  }
  attachTilt();

  /* ─────────────────────────────────────────
     ★  MODE SWITCHING  ★
  ───────────────────────────────────────── */
  const html      = document.documentElement;
  const overlay   = document.getElementById('modeOverlay');
  const fab       = document.getElementById('modeFab');
  const fabLabel  = document.getElementById('modeFabLabel');
  const mainPanel = document.getElementById('mainPanel');
  const funPanel  = document.getElementById('funPanel');

  // All mode buttons (top + bottom switchers + FAB)
  const allModeBtns = document.querySelectorAll('.mode-btn[data-target]');
  const allPips     = document.querySelectorAll('.mode-switcher__pip');

  let currentMode = 'main';
  let switching   = false;

  // Marquee content per mode
  const marqueeMain = `
    <span>Android · Kotlin</span><span class="dot">·</span>
    <span>Spring Boot</span><span class="dot">·</span>
    <span>Python</span><span class="dot">·</span>
    <span>REST APIs</span><span class="dot">·</span>
    <span>MySQL</span><span class="dot">·</span>
    <span>Firebase</span><span class="dot">·</span>
    <span>Git &amp; GitHub</span><span class="dot">·</span>
    <span>Android · Kotlin</span><span class="dot">·</span>
    <span>Spring Boot</span><span class="dot">·</span>
    <span>Python</span><span class="dot">·</span>
    <span>REST APIs</span><span class="dot">·</span>
    <span>MySQL</span><span class="dot">·</span>
    <span>Firebase</span><span class="dot">·</span>
    <span>Git &amp; GitHub</span><span class="dot">·</span>
  `;
  const marqueeFun = `
    <span>Message Encrypter</span><span class="dot">·</span>
    <span>GitHub Automation</span><span class="dot">·</span>
    <span>Custom Flames</span><span class="dot">·</span>
    <span>Date Invites</span><span class="dot">·</span>
    <span>Portfolio</span><span class="dot">·</span>
    <span>Fun &amp; Games</span><span class="dot">·</span>
    <span>Message Encrypter</span><span class="dot">·</span>
    <span>GitHub Automation</span><span class="dot">·</span>
    <span>Custom Flames</span><span class="dot">·</span>
    <span>Date Invites</span><span class="dot">·</span>
    <span>Portfolio</span><span class="dot">·</span>
    <span>Fun &amp; Games</span><span class="dot">·</span>
  `;

  function setActiveButtons(mode) {
    allModeBtns.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.target === mode);
    });
  }

  function switchMode(targetMode) {
    if (switching || targetMode === currentMode) return;
    switching = true;
    currentMode = targetMode;

    // ① Flash overlay in
    overlay.classList.add('flash');

    setTimeout(() => {
      // ② Apply new theme
      html.setAttribute('data-mode', targetMode);

      // ③ Swap panels
      if (targetMode === 'fun') {
        mainPanel.style.display = 'none';
        funPanel.style.display  = 'block';
        funPanel.style.opacity  = '0';
        funPanel.style.transform = 'translateY(28px)';
        fabLabel.textContent = 'Main Mode';
      } else {
        funPanel.style.display  = 'none';
        mainPanel.style.display = 'block';
        mainPanel.style.opacity = '0';
        mainPanel.style.transform = 'translateY(28px)';
        fabLabel.textContent = 'Fun Mode';
      }

      // ④ Swap marquee
      const marqueeTrack = document.querySelector('.marquee-track');
      marqueeTrack.innerHTML = targetMode === 'fun' ? marqueeFun : marqueeMain;

      // ⑤ Update hero bg text
      const heroBgText = document.getElementById('heroBgText');
      heroBgText.textContent = targetMode === 'fun' ? 'CREATIVE' : 'DEVELOPER';

      // ⑥ Flash overlay out
      overlay.classList.remove('flash');

      // ⑦ Animate panel in
      requestAnimationFrame(() => {
        const activePanel = targetMode === 'fun' ? funPanel : mainPanel;
        activePanel.style.transition = 'opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)';
        requestAnimationFrame(() => {
          activePanel.style.opacity   = '1';
          activePanel.style.transform = 'translateY(0)';
        });
      });

      // ⑧ Update buttons
      setActiveButtons(targetMode);

      // ⑨ Re-trigger reveals on new panel items
      setTimeout(() => {
        const activePanel = targetMode === 'fun' ? funPanel : mainPanel;
        activePanel.querySelectorAll('.reveal').forEach(el => el.classList.remove('visible'));
        setupReveal();
        attachTilt();
        switching = false;
      }, 200);

    }, 220); // wait for flash in
  }

  // Wire mode buttons
  allModeBtns.forEach(btn => {
    btn.addEventListener('click', () => switchMode(btn.dataset.target));
  });

  // Wire FAB (toggles between modes)
  fab.addEventListener('click', () => {
    switchMode(currentMode === 'main' ? 'fun' : 'main');
  });

  // Also make the toggle track itself clickable
  document.querySelectorAll('.mode-switcher__track').forEach(track => {
    track.addEventListener('click', () => {
      switchMode(currentMode === 'main' ? 'fun' : 'main');
    });
  });

  // Init button states
  setActiveButtons('main');
  // Init panel visibility
  mainPanel.style.display = 'block';
  mainPanel.style.opacity = '1';
  funPanel.style.display  = 'none';

})();
