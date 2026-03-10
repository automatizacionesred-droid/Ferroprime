/* ═══════════════════════════════════════
   FERROPRIME SAS – main.js
   Performance-optimized
═══════════════════════════════════════ */

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(10,10,10,0.98)';
  } else {
    navbar.style.background = 'rgba(10,10,10,0.85)';
  }
});

// ── Mobile menu toggle ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ── PARALLAX SUAVE Y LIVIANO (GPU) ──
// Solo en desktop — mobile usa imagen estática
const heroBefore = document.getElementById('hero');
const isMobile = () => window.innerWidth <= 768;

let ticking = false; // requestAnimationFrame throttle

window.addEventListener('scroll', () => {
  if (isMobile()) return;
  if (!ticking) {
    requestAnimationFrame(() => {
      // Mueve la imagen ::before en Y con CSS custom property
      // Efecto suave: la imagen se mueve a la mitad de velocidad del scroll
      const offset = window.scrollY * 0.25;
      heroBefore.style.setProperty('--parallax-y', `${offset}px`);
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true }); // passive: no bloquea el scroll

// ── Scroll Reveal ──
const reveals = document.querySelectorAll('.service-row, .quienes-inner, .contacto-inner, .services-grid');
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// ── Smooth active nav highlight ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.style.opacity = a.getAttribute('href') === `#${current}` ? '1' : '0.65';
  });
}, { passive: true });

// ── WhatsApp Form Submit ──
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre        = document.getElementById('nombre').value.trim();
  const email         = document.getElementById('email').value.trim();
  const requerimiento = document.getElementById('requerimiento').value.trim();

  if (!nombre || !email || !requerimiento) {
    alert('Por favor completa todos los campos.');
    return;
  }

  const mensaje = `Hola Ferroprime SAS 👋\n\n*Nombre:* ${nombre}\n*Email:* ${email}\n\n*Requerimiento:*\n${requerimiento}`;
  const encoded = encodeURIComponent(mensaje);
  const waUrl   = `https://wa.me/573046657025?text=${encoded}`;

  window.open(waUrl, '_blank');
});

