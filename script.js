// Accessible navigation + year + scroll reveal
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const yearSpan = document.getElementById('year');

  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (navToggle && mainNav) {
    if (!navToggle.hasAttribute('aria-controls') && mainNav.id) {
      navToggle.setAttribute('aria-controls', mainNav.id);
    }

    let lastFocusedElement = null;

    function handleOutsidePointerDown(e) {
      if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
        if (mainNav.classList.contains('open')) {
          closeNav();
        }
      }
    }

    function openNav() {
      mainNav.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      const firstLink = mainNav.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
      if (firstLink) firstLink.focus();
      document.addEventListener('pointerdown', handleOutsidePointerDown);
    }

    function closeNav() {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.removeEventListener('pointerdown', handleOutsidePointerDown);
      if (lastFocusedElement) lastFocusedElement.focus();
      lastFocusedElement = null;
    }

    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.contains('open');
      if (!isOpen) {
        lastFocusedElement = document.activeElement;
        openNav();
      } else {
        closeNav();
      }
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => closeNav());
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        if (mainNav.classList.contains('open')) {
          closeNav();
        }
      }
    });
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (prefersReducedMotion) {
      reveals.forEach((el) => el.classList.add('visible'));
    } else if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, root: null, rootMargin: '0px 0px -5% 0px' });
      reveals.forEach((el) => observer.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('visible'));
    }
  }
});
