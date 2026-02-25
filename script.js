/* ==================== PyOneers Landing Page JS ==================== */

'use strict';

/* ==================== DOMContentLoaded Init ==================== */
document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initHeader();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initTabs();
  initFAQ();
  initForm();
  initActivityFeed();
  initTaskCounter();
});

/* ==================== Year ==================== */
function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ==================== Sticky Header ==================== */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==================== Mobile Menu ==================== */
function initMobileMenu() {
  const btn  = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-hidden', String(!isOpen));
  });

  // Close on nav link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    }
  });
}

/* ==================== Smooth Scroll ==================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const headerH = 72;
      const y = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
}

/* ==================== Scroll Animations ==================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Small stagger for sibling elements
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('[data-animate]'));
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Math.min(idx * 80, 400));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ==================== Tabs (Agent Capabilities) ==================== */
function initTabs() {
  const tabNav = document.querySelector('.tab-nav');
  if (!tabNav) return;

  const buttons = tabNav.querySelectorAll('.tab-btn');
  const panels  = document.querySelectorAll('.tab-panel');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      // Update buttons
      buttons.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', String(b === btn));
      });

      // Update panels
      panels.forEach(panel => {
        const isMatch = panel.id === `tab-${target}`;
        panel.classList.toggle('active', isMatch);
      });
    });
  });
}

/* ==================== FAQ Accordion ==================== */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(i => {
        i.classList.remove('open');
        const q = i.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      // Open clicked (unless it was already open)
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==================== Multi-Step Contact Form ==================== */
function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const steps        = form.querySelectorAll('.form-step');
  const progressFill = document.getElementById('formProgressFill');
  const stepNumEl    = document.getElementById('formStepNum');
  const successEl    = document.getElementById('formSuccess');
  const statusEl     = document.getElementById('formStatus');

  let currentStep = 1;
  const totalSteps = 3;

  function setProgress(step) {
    if (progressFill) progressFill.style.width = `${(step / totalSteps) * 100}%`;
    if (stepNumEl)    stepNumEl.textContent = step;
  }

  function showStep(n) {
    steps.forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`formStep${n}`);
    if (target) target.classList.add('active');
    currentStep = n;
    setProgress(n);
  }

  function clearError(fieldId) {
    const el = document.getElementById(`err-${fieldId}`);
    if (el) el.textContent = '';
  }

  function setError(fieldId, msg) {
    const el = document.getElementById(`err-${fieldId}`);
    if (el) el.textContent = msg;
  }

  function validateStep1() {
    let valid = true;
    const firstName = document.getElementById('firstName');
    const email     = document.getElementById('email');
    const company   = document.getElementById('company');

    clearError('firstName');
    clearError('email');
    clearError('company');

    if (!firstName || !firstName.value.trim()) {
      setError('firstName', 'First name is required');
      valid = false;
    }

    if (!email || !email.value.trim()) {
      setError('email', 'Email is required');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      setError('email', 'Please enter a valid email address');
      valid = false;
    }

    if (!company || !company.value.trim()) {
      setError('company', 'Company name is required');
      valid = false;
    }

    return valid;
  }

  function validateStep2() {
    let valid = true;
    const challenge  = document.getElementById('challenge');
    const teamSizeEl = form.querySelector('input[name="teamSize"]:checked');

    clearError('challenge');
    clearError('teamSize');

    if (!challenge || !challenge.value) {
      setError('challenge', 'Please select your primary challenge');
      valid = false;
    }

    if (!teamSizeEl) {
      setError('teamSize', 'Please select your team size');
      valid = false;
    }

    return valid;
  }

  // Step 1 → 2
  const next1 = document.getElementById('nextStep1');
  if (next1) {
    next1.addEventListener('click', () => {
      if (validateStep1()) showStep(2);
    });
  }

  // Step 2 → 1
  const prev2 = document.getElementById('prevStep2');
  if (prev2) prev2.addEventListener('click', () => showStep(1));

  // Step 2 → 3
  const next2 = document.getElementById('nextStep2');
  if (next2) {
    next2.addEventListener('click', () => {
      if (validateStep2()) showStep(3);
    });
  }

  // Step 3 → 2
  const prev3 = document.getElementById('prevStep3');
  if (prev3) prev3.addEventListener('click', () => showStep(2));

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitForm');

    if (statusEl) statusEl.textContent = '';

    // Collect all form data
    const data = {
      firstName: document.getElementById('firstName')?.value?.trim(),
      email:     document.getElementById('email')?.value?.trim(),
      company:   document.getElementById('company')?.value?.trim(),
      challenge: document.getElementById('challenge')?.value,
      teamSize:  form.querySelector('input[name="teamSize"]:checked')?.value,
      aiExp:     document.getElementById('aiExp')?.value,
      pilotType: form.querySelector('input[name="pilotType"]:checked')?.value,
      notes:     document.getElementById('notes')?.value?.trim(),
    };

    // Disable button
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    }

    // Simulate form submission (replace with real endpoint)
    setTimeout(() => {
      // Hide form steps, show success
      steps.forEach(s => s.style.display = 'none');
      const progress = form.querySelector('.form-progress');
      const indicator = form.querySelector('.form-step-indicator');
      if (progress) progress.style.display = 'none';
      if (indicator) indicator.style.display = 'none';
      if (successEl) successEl.style.display = 'block';

      // Re-enable button (for robustness)
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Application';
      }

      // Log for debugging (remove in production)
      console.log('Pilot application submitted:', data);

      /*
        Production: Replace the setTimeout above with:

        fetch('/api/pilot-application', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(() => {
          steps.forEach(s => s.style.display = 'none');
          if (successEl) successEl.style.display = 'block';
        })
        .catch(() => {
          if (statusEl) statusEl.textContent = 'Something went wrong. Please email us at hello@pyoneers.ai';
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Application'; }
        });
      */
    }, 1200);
  });
}

/* ==================== Live Activity Feed Animation ==================== */
function initActivityFeed() {
  const feed = document.getElementById('activityFeed');
  if (!feed) return;

  const activities = [
    { text: 'Code Review Agent: reviewing PR #247...', type: 'processing' },
    { text: 'Lead Agent: scored 12 new leads ✓',      type: 'done' },
    { text: 'Invoice Agent: 34 invoices processed ✓', type: 'done' },
    { text: 'Crop Agent: sent irrigation alert ✓',    type: 'done' },
    { text: 'Research Agent: analyzing 500 tickets...', type: 'processing' },
    { text: 'DevOps Agent: deployment passed checks ✓', type: 'done' },
    { text: 'Lead Agent: new ICP match found ✓',       type: 'done' },
  ];

  let actIndex = 3; // Start cycling from the 4th item

  setInterval(() => {
    const rows = feed.querySelectorAll('.activity-row');
    if (!rows.length) return;

    // Shift items up (first row removed, new one appended)
    rows[0].style.transition = 'opacity 0.3s ease';
    rows[0].style.opacity = '0';

    setTimeout(() => {
      rows[0].remove();

      const next = activities[actIndex % activities.length];
      actIndex++;

      const row = document.createElement('div');
      row.className = 'activity-row';
      row.style.opacity = '0';
      row.innerHTML = `
        <span class="act-dot ${next.type === 'processing' ? 'act-processing' : 'act-done'}"></span>
        <span class="act-text">${next.text}</span>
      `;
      feed.appendChild(row);

      // Fade in
      requestAnimationFrame(() => {
        row.style.transition = 'opacity 0.4s ease';
        row.style.opacity = '1';
      });
    }, 300);
  }, 2500);
}

/* ==================== Task Counter Animation (Hero Dashboard) ==================== */
function initTaskCounter() {
  const counter = document.getElementById('taskCounter');
  if (!counter) return;

  let value = 47;

  // Slowly increment the task counter to simulate real-time work
  setInterval(() => {
    if (Math.random() > 0.5) {
      value++;
      counter.textContent = value;
    }
  }, 4000);
}
