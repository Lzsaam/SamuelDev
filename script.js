/* ========================================
   Samuel Batista — Portfolio Scripts
   ======================================== */

// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 500);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavbar();
  initMobileNav();
  initSmoothScroll();
  initTypingEffect();
  initCountUp();
  initCursorGlow();
  initThemeToggle();
  initBackToTop();
  initParallaxGlows();
  initSoftSkillStagger();
  initTiltCards();
  initScrollIndicator();
});

/* --- Scroll Reveal (Intersection Observer) --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* --- Navbar Active State on Scroll --- */
function initNavbar() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__links a');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // Navbar background intensity on scroll
    const navbar = document.querySelector('.navbar');
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (window.scrollY > 100) {
      navbar.style.background = isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(22, 22, 29, 0.85)';
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
      navbar.style.background = isLight ? 'rgba(255, 255, 255, 0.7)' : 'rgba(22, 22, 29, 0.6)';
      navbar.style.boxShadow = 'none';
    }
  });
}

/* --- Mobile Navigation --- */
function initMobileNav() {
  const menuBtn = document.querySelector('.navbar__menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.mobile-nav__close');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* --- Smooth Scrolling --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* --- Typing Effect on Hero Role --- */
function initTypingEffect() {
  const el = document.querySelector('.hero__role');
  if (!el) return;

  const roles = [
    'Desenvolvedor de Software',
    'Estagiário no Itaú Unibanco',
    'Web & Mobile — React · React Native',
    'Java | C# | Python | AWS',
    'Estudante de ADS na SPTech',
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const current = roles[roleIndex];

    if (isPaused) {
      isPaused = false;
      isDeleting = true;
      setTimeout(type, 1200);
      return;
    }

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 400);
        return;
      }

      setTimeout(type, 40);
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        isPaused = true;
        setTimeout(type, 100);
        return;
      }

      setTimeout(type, 70);
    }
  }

  setTimeout(type, 1500);
}

/* --- Count Up Animation --- */
function initCountUp() {
  const counters = document.querySelectorAll('.stat-card__number');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          animateCount(el, 0, target, 1800, suffix);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCount(el, start, end, duration, suffix) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.round(start + (end - start) * eased);

    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* --- Cursor Glow Effect --- */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || window.matchMedia('(max-width: 768px)').matches) return;

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    glow.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    glow.classList.remove('active');
  });
}

/* --- Theme Toggle (Light/Dark) --- */
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  // Restore saved preference
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);

    // Update navbar background
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      const isLight = next === 'light';
      if (window.scrollY > 100) {
        navbar.style.background = isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(22, 22, 29, 0.85)';
      } else {
        navbar.style.background = isLight ? 'rgba(255, 255, 255, 0.7)' : 'rgba(22, 22, 29, 0.6)';
      }
    }
  });
}

/* --- Back to Top Button --- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- Parallax Background Glows --- */
function initParallaxGlows() {
  const glowBlue = document.querySelector('.bg-glow--blue');
  const glowPurple = document.querySelector('.bg-glow--purple');
  if (!glowBlue && !glowPurple) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (glowBlue) {
          glowBlue.style.transform = `translate(${scrollY * 0.02}px, ${scrollY * 0.05}px)`;
        }
        if (glowPurple) {
          glowPurple.style.transform = `translate(${scrollY * -0.03}px, ${scrollY * -0.04}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* --- Soft Skill Stagger Indices --- */
function initSoftSkillStagger() {
  const tags = document.querySelectorAll('.stagger-children .soft-skill-tag');
  tags.forEach((tag, i) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(10px) scale(0.9)';
    tag.style.transition = `opacity 0.4s ease ${i * 80}ms, transform 0.4s ease ${i * 80}ms`;
  });

  const container = document.querySelector('.stagger-children');
  if (!container) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tags.forEach((tag) => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0) scale(1)';
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(container);
}

/* --- Tilt Effect on Cards --- */
function initTiltCards() {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const cards = document.querySelectorAll('.featured-project, .skill-card');
  
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });
}

/* --- Scroll Indicator --- */
function initScrollIndicator() {
  const indicator = document.getElementById('scroll-indicator');
  if (!indicator) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      indicator.style.opacity = '0';
      indicator.style.pointerEvents = 'none';
    } else {
      indicator.style.opacity = '1';
      indicator.style.pointerEvents = 'auto';
    }
  });
}
