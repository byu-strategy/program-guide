/* ============================================================
   BYU PM NetTrek · Silicon Valley 2026
   Smooth scroll, mobile nav, scroll reveals
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const allNavLinks = navLinks.querySelectorAll('a');

  // --- Sticky nav background on scroll ---
  const heroSection = document.getElementById('hero');

  function updateNav() {
    const scrolled = window.scrollY > 80;
    nav.classList.toggle('scrolled', scrolled);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // --- Mobile nav toggle ---
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    });
  });

  // --- Active nav link highlight on scroll ---
  const sections = document.querySelectorAll('.section, .hero');

  function updateActiveLink() {
    const scrollPos = window.scrollY + nav.offsetHeight + 60;

    sections.forEach(section => {
      const id = section.getAttribute('id');
      if (!id) return;
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) {
        allNavLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // --- Scroll reveal (IntersectionObserver) ---
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    revealElements.forEach(el => el.classList.add('revealed'));
  }
});
