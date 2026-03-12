/**
 * Sri Vijaya Durga Pickles — script.js
 * Website Developed by Bhanu Sai Veera Ashok Babu Sonti | Contact: +91 7989331212
 */

// NAVBAR
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Active nav on scroll
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => io.observe(s));
})();

// SPICE PARTICLES
(function initParticles() {
  const container = document.getElementById('spiceParticles');
  if (!container) return;
  const emojis = ['🌶️', '✨', '🌿', '⭐', '🔴', '🍃'];
  for (let i = 0; i < 14; i++) {
    const el = document.createElement('div');
    el.className = 'spice-particle';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `left:${Math.random() * 100}%;animation-duration:${9 + Math.random() * 10}s;animation-delay:${Math.random() * 9}s;font-size:${0.8 + Math.random() * 1.1}rem;`;
    container.appendChild(el);
  }
})();

// SCROLL REVEAL — generic [data-reveal]
(function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');

  // Create intersection observer for reveal elements
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Find delay if present
        const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;

        setTimeout(() => {
          entry.target.classList.add('is-visible');

          // Legacy support for elements relying on 'visible' class
          entry.target.classList.add('visible');
        }, delay);

        // Stop observing once revealed
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  els.forEach(el => observer.observe(el));
})();

// STAGGERED CARDS
(function initCards() {
  const cards = document.querySelectorAll('.pickle-card, .trust-card, .special-card, .contact-card, .gi');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = [...entry.target.parentElement.children];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 100);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  cards.forEach(c => io.observe(c));
})();

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  });
});

// PARALLAX HERO
(function initParallax() {
  const bg = document.querySelector('.hero-bg-img');
  if (!bg) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY < window.innerHeight) {
          bg.style.transform = `scale(1.06) translateY(${window.scrollY * 0.18}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// IMAGE FALLBACK — if Unsplash fails, show gradient fallback
document.querySelectorAll('img[src*="unsplash"]').forEach(img => {
  img.addEventListener('error', function () {
    this.style.display = 'none';
    const fallback = document.createElement('div');
    fallback.style.cssText = 'width:100%;height:100%;background:linear-gradient(135deg,#8B0000,#4a1000);display:flex;align-items:center;justify-content:center;font-size:3rem;';
    const map = {
      'chicken': '🍗', 'boneless': '🍖', 'natukodi': '🐔', 'mutton': '🥩',
      'chepala': '🐟', 'prawns': '🦐', 'boti': '🍢', 'spice': '🌶️',
      'gallery': '🫙', 'about': '🌶️', 'hero': '✨'
    };
    const src = this.src.toLowerCase();
    let emoji = '🌶️';
    for (const [k, v] of Object.entries(map)) { if (src.includes(k)) { emoji = v; break; } }
    fallback.textContent = emoji;
    this.parentElement.appendChild(fallback);
  });
});
