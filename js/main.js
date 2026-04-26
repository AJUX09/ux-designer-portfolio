/* ═══════════════════════════════════════════
   MAIN.JS — Portfolio interactions
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Custom Cursor ── */
  const cursor         = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursor-follower');

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth follower
  function animateCursor() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top  = followerY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Expand cursor on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .project-card, .skill-pill, .magnetic, input, textarea'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('expand');
      cursorFollower.classList.add('expand');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('expand');
      cursorFollower.classList.remove('expand');
    });
  });


  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  /* ── Mobile menu toggle ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  /* ── Smooth anchor scroll (override default) ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ── Scroll reveal (IntersectionObserver) ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-line');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll('.reveal, .reveal-line');
        siblings.forEach((el, idx) => {
          if (el === entry.target) {
            setTimeout(() => el.classList.add('visible'), idx * 80);
          }
        });
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── Count-up animation ── */
  const statNums = document.querySelectorAll('.stat-num');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1400;
        const start    = performance.now();

        function update(now) {
          const elapsed  = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease     = 1 - Math.pow(1 - progress, 4);
          el.textContent = Math.floor(ease * target);
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = target;
        }

        requestAnimationFrame(update);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => countObserver.observe(el));


  /* ── Magnetic button effect ── */
  const magneticBtns = document.querySelectorAll('.magnetic');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect   = btn.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) * 0.3;
      const dy     = (e.clientY - cy) * 0.3;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });


  /* ── Parallax orbs on mouse move ── */
  const orbs = document.querySelectorAll('.orb');

  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 12;
      orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  });


  /* ── Hero image fallback (if no profile.jpg) ── */
  const heroImg = document.getElementById('hero-img');
  if (heroImg) {
    heroImg.addEventListener('error', () => {
      // Replace with a generated avatar placeholder
      heroImg.style.display = 'none';
      const wrap = heroImg.parentElement;
      wrap.innerHTML = `
        <svg viewBox="0 0 100 100" style="width:100%;height:100%;" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ag" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#c8ff3e"/>
              <stop offset="100%" style="stop-color:#7c3aed"/>
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="url(#ag)" rx="50"/>
          <circle cx="50" cy="38" r="16" fill="rgba(0,0,0,0.4)"/>
          <ellipse cx="50" cy="78" rx="24" ry="16" fill="rgba(0,0,0,0.4)"/>
          <text x="50" y="52" text-anchor="middle" font-family="Syne,sans-serif" font-weight="800" font-size="18" fill="rgba(0,0,0,0.6)">ME</text>
        </svg>`;
    });

    const aboutImg = document.querySelector('.about-img');
    if (aboutImg) {
      aboutImg.addEventListener('error', () => {
        aboutImg.style.display = 'none';
        const container = aboutImg.parentElement;
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
          width:100%; height:380px; border-radius:20px;
          background: linear-gradient(135deg, #c8ff3e22 0%, #7c3aed22 100%);
          border: 1px solid rgba(255,255,255,0.08);
          display:flex; align-items:center; justify-content:center;
        `;
        placeholder.innerHTML = `
          <svg viewBox="0 0 100 100" style="width:120px;height:120px;" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ag2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#c8ff3e"/>
                <stop offset="100%" style="stop-color:#7c3aed"/>
              </linearGradient>
            </defs>
            <rect width="100" height="100" fill="url(#ag2)" rx="50"/>
            <circle cx="50" cy="38" r="16" fill="rgba(0,0,0,0.4)"/>
            <ellipse cx="50" cy="78" rx="24" ry="16" fill="rgba(0,0,0,0.4)"/>
          </svg>`;
        container.insertBefore(placeholder, aboutImg);
      });
    }
  }


  /* ── Project thumbnail: hide placeholder on load ── */
  document.querySelectorAll('.thumb-img').forEach(img => {
    const hide = () => img.classList.add('loaded');
    if (img.complete && img.naturalWidth) hide();
    else img.addEventListener('load', hide);
  });


  /* ── Contact form → FormSubmit (sends to uxcelwithaj@gmail.com) ── */
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btnText = submitBtn.querySelector('.btn-text');
      btnText.textContent = 'Sending…';
      submitBtn.disabled  = true;
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      const data = {
        name:     form.name.value.trim(),
        email:    form.email.value.trim(),
        message:  form.message.value.trim(),
        _subject: `Portfolio inquiry from ${form.name.value.trim()}`,
        _captcha: 'false',
        _template:'table',
      };

      try {
        const res  = await fetch('https://formsubmit.co/ajax/uxcelwithaj@gmail.com', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body:    JSON.stringify(data),
        });
        const json = await res.json();

        if (json.success === 'true' || json.success === true) {
          formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';
          formStatus.classList.add('success');
          form.reset();
        } else {
          throw new Error('Submission failed. Please try again.');
        }
      } catch (err) {
        formStatus.textContent = '✗ ' + err.message;
        formStatus.classList.add('error');
      } finally {
        btnText.textContent = 'Send Message';
        submitBtn.disabled  = false;
      }
    });
  }


  /* ── Active nav link on scroll ── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  /* ── Subtle tilt effect on project cards ── */
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) scale(1.012) perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
