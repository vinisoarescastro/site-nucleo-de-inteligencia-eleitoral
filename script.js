/* ============================================
   NIE · Núcleo de Inteligência Eleitoral
   JavaScript v1.0
   ============================================ */
'use strict';

// Header scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.nav-mobile');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Territory bars
const barsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.territory-fill').forEach(fill => {
        fill.style.width = fill.dataset.width;
      });
      barsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.territory-bars').forEach(el => barsObserver.observe(el));

// Counter animation
function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  const isFloat = String(target).includes('.');
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = isFloat ? (eased * target).toFixed(1) : Math.round(eased * target);
    el.textContent = prefix + current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target, parseFloat(entry.target.dataset.count));
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// Form validation
const form = document.getElementById('contact-form');
const formContent = document.getElementById('form-content');
const formSuccess = document.getElementById('form-success');

function validateField(group, input) {
  const val = input.value.trim();
  const type = input.type || input.tagName.toLowerCase();
  let valid = true;
  if (input.required && !val) valid = false;
  else if (type === 'email' && val) valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  else if (input.name === 'phone' && val) valid = /^[\d\s\(\)\-\+]{8,}$/.test(val);
  group.classList.toggle('err', !valid);
  return valid;
}

form?.querySelectorAll('.finput, .fselect, .ftextarea').forEach(input => {
  input.addEventListener('blur', () => { const g = input.closest('.fgroup'); if (g) validateField(g, input); });
  input.addEventListener('input', () => { const g = input.closest('.fgroup'); if (g && g.classList.contains('err')) validateField(g, input); });
});

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  let allValid = true;
  form.querySelectorAll('.finput[required], .fselect[required], .ftextarea[required]').forEach(input => {
    const g = input.closest('.fgroup');
    if (g && !validateField(g, input)) allValid = false;
  });
  if (!allValid) { showToast('Por favor, preencha todos os campos obrigatórios.'); return; }
  const btn = form.querySelector('.fsub');
  btn.innerHTML = 'Enviando…';
  btn.disabled = true;
  setTimeout(() => {
    formContent.style.display = 'none';
    formSuccess.classList.add('show');
    showToast('Mensagem enviada com sucesso!');
  }, 1600);
});

// Toast
function showToast(message, duration = 4000) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// Card tilt
document.querySelectorAll('.svc-card, .p-card, .pers-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});
