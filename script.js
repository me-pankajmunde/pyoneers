/* ==================== PyOneers Website JS ==================== */

// Set current year in footer
document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  initScrollAnimations();
  initSmoothScroll();
  initHeaderScroll();
});

/* ==================== Intersection Observer Animations ==================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  if (!animatedElements.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation delays for elements in the same section
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/* ==================== Smooth Scroll for Navigation ==================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip empty anchors or form actions
      if (href === '#' || href === '#contact-form') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==================== Header Scroll Effect ==================== */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.style.boxShadow = 'none';
    } else {
      header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
  });
}

/* ==================== Form Handling ==================== */
function submitForm(e) {
  e.preventDefault();
  
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const submitButton = form.querySelector('button[type="submit"]');
  
  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    company: document.getElementById('company').value,
    project: document.getElementById('project').value,
    message: document.getElementById('message').value
  };
  
  // Basic validation
  if (!formData.name || !formData.email || !formData.project || !formData.message) {
    status.textContent = '⚠️ Please fill in all required fields';
    status.style.color = '#ef4444';
    return false;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    status.textContent = '⚠️ Please enter a valid email address';
    status.style.color = '#ef4444';
    return false;
  }
  
  // Disable button and show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = '<span>Sending...</span>';
  status.textContent = '📤 Sending your message...';
  status.style.color = '#00d9ff';
  
  // Simulate API call (replace with actual endpoint)
  setTimeout(() => {
    // Success state
    status.textContent = '✅ Message sent! We\'ll respond within 48 hours.';
    status.style.color = '#10b981';
    
    // Reset form
    form.reset();
    
    // Re-enable button
    submitButton.disabled = false;
    submitButton.innerHTML = '<span>Send Message</span>';
    
    // Clear status after 5 seconds
    setTimeout(() => {
      status.textContent = '';
    }, 5000);
    
    // Log form data (for demo purposes - remove in production)
    console.log('Form submitted:', formData);
    
    // In production, replace the setTimeout with actual fetch call:
    /*
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      status.textContent = '✅ Message sent! We\'ll respond within 48 hours.';
      status.style.color = '#10b981';
      form.reset();
    })
    .catch(error => {
      status.textContent = '❌ Error sending message. Please try again.';
      status.style.color = '#ef4444';
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.innerHTML = '<span>Send Message</span>';
    });
    */
  }, 1500);
  
  return false;
}

/* ==================== Tech Stack Hover Effects ==================== */
document.addEventListener('DOMContentLoaded', () => {
  const techItems = document.querySelectorAll('.tech-item');
  
  techItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-4px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateY(0) scale(1)';
    });
  });
});

/* ==================== Expertise Card Interactions ==================== */
document.addEventListener('DOMContentLoaded', () => {
  const expertiseCards = document.querySelectorAll('.expertise-card');
  
  expertiseCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.expertise-icon');
      if (icon) {
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.expertise-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });
});

/* ==================== Stats Counter Animation ==================== */
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + '+';
    }
  }, 16);
}

// Observe stats and trigger counter animation
document.addEventListener('DOMContentLoaded', () => {
  const statValues = document.querySelectorAll('.stat-value');
  
  if (!statValues.length) return;
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text = entry.target.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        
        if (number) {
          entry.target.textContent = '0+';
          setTimeout(() => {
            animateCounter(entry.target, number);
          }, 300);
        }
        
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statValues.forEach(stat => statsObserver.observe(stat));
});

/* ==================== Hero Particle Animation ==================== */
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrameId;
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
      ctx.fillStyle = `rgba(79, 209, 197, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Create particles
  function initParticles() {
    particles = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 8000);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.strokeStyle = `rgba(79, 209, 197, ${0.1 * (1 - distance / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    animationFrameId = requestAnimationFrame(animate);
  }
  
  initParticles();
  animate();
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationFrameId);
  });
});

/* ==================== Typing Effect ==================== */
document.addEventListener('DOMContentLoaded', () => {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;
  
  const phrases = [
    'AI Automation',
    'Intelligent Agents',
    'LangGraph Orchestration',
    'Custom LLM Solutions',
    'Production AI Systems'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before next phrase
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Start typing effect after a short delay
  setTimeout(type, 1000);
});

/* ==================== AI Demo Playground ==================== */
document.addEventListener('DOMContentLoaded', () => {
  const demoButtons = document.querySelectorAll('.demo-btn');
  const demoOutput = document.querySelector('.demo-output');
  
  if (!demoButtons.length || !demoOutput) return;
  
  const demos = {
    agent: {
      title: 'LangGraph Agent Flow',
      steps: [
        '⚡ Initializing multi-agent system...',
        '🤖 Agent 1: Analyzing user query...',
        '🔍 Agent 2: Retrieving relevant context...',
        '⚙️ Agent 3: Processing with GPT-4...',
        '📊 Agent 4: Validating output...',
        '✅ Complete! Multi-step workflow executed successfully.'
      ]
    },
    code: {
      title: 'AI Code Generation',
      steps: [
        '💻 Parsing requirements...',
        '🧠 Generating function skeleton...',
        '✍️ Writing implementation logic...',
        '🔧 Adding error handling...',
        '📝 Generating documentation...',
        '✅ Code generated and validated!'
      ]
    },
    data: {
      title: 'Intelligent Data Processing',
      steps: [
        '📥 Loading dataset (10,000 records)...',
        '🧹 Cleaning and preprocessing...',
        '🤖 AI-powered pattern detection...',
        '📊 Statistical analysis complete...',
        '🎯 Generating insights...',
        '✅ Analysis complete! 15 key insights identified.'
      ]
    }
  };
  
  demoButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const demoType = button.dataset.demo;
      const demo = demos[demoType];
      
      if (!demo) return;
      
      // Disable all buttons during demo
      demoButtons.forEach(btn => btn.disabled = true);
      
      // Clear output and show title
      demoOutput.innerHTML = `<div class="demo-title">${demo.title}</div>`;
      
      // Animate through steps
      for (let i = 0; i < demo.steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        const stepDiv = document.createElement('div');
        stepDiv.className = 'demo-step';
        stepDiv.textContent = demo.steps[i];
        stepDiv.style.animation = 'fadeInUp 0.5s ease';
        demoOutput.appendChild(stepDiv);
        
        // Auto-scroll to bottom
        demoOutput.scrollTop = demoOutput.scrollHeight;
      }
      
      // Re-enable buttons
      setTimeout(() => {
        demoButtons.forEach(btn => btn.disabled = false);
      }, 1000);
    });
  });
});

/* ==================== Requirements Discovery Quiz ==================== */
document.addEventListener('DOMContentLoaded', () => {
  const quizContainer = document.getElementById('quiz-container');
  if (!quizContainer) return;
  
  const questions = [
    {
      q: 'What challenge are you looking to solve?',
      options: [
        { text: 'Automate repetitive tasks', tags: ['automation', 'agents'] },
        { text: 'Process and analyze data', tags: ['data', 'ml'] },
        { text: 'Build intelligent chatbots', tags: ['llm', 'agents'] },
        { text: 'Integrate AI into existing systems', tags: ['integration', 'api'] }
      ]
    },
    {
      q: 'What\'s your primary industry or use case?',
      options: [
        { text: 'E-commerce & Retail', tags: ['automation', 'data'] },
        { text: 'Healthcare & Life Sciences', tags: ['data', 'ml'] },
        { text: 'Finance & Banking', tags: ['automation', 'security'] },
        { text: 'Manufacturing & Operations', tags: ['automation', 'integration'] }
      ]
    },
    {
      q: 'What scale of solution do you need?',
      options: [
        { text: 'MVP / Proof of Concept', tags: ['mvp'] },
        { text: 'Production-ready system', tags: ['production'] },
        { text: 'Enterprise-scale deployment', tags: ['enterprise'] },
        { text: 'Just exploring options', tags: ['consulting'] }
      ]
    }
  ];
  
  let currentQuestion = 0;
  let answers = [];
  
  function renderQuestion() {
    const question = questions[currentQuestion];
    
    quizContainer.innerHTML = `
      <div class="quiz-progress">
        <div class="quiz-progress-bar" style="width: ${((currentQuestion + 1) / questions.length) * 100}%"></div>
      </div>
      <div class="quiz-question">
        <h4>Question ${currentQuestion + 1} of ${questions.length}</h4>
        <p>${question.q}</p>
        <div class="quiz-options">
          ${question.options.map((opt, i) => `
            <button class="quiz-option" data-index="${i}">
              ${opt.text}
            </button>
          `).join('')}
        </div>
      </div>
    `;
    
    // Add click handlers
    const optionButtons = quizContainer.querySelectorAll('.quiz-option');
    optionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const index = parseInt(button.dataset.index);
        handleAnswer(question.options[index]);
      });
    });
  }
  
  function handleAnswer(option) {
    answers.push(option.tags);
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      showResults();
    }
  }
  
  function showResults() {
    // Count tag frequencies
    const tagCounts = {};
    answers.flat().forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    
    // Determine recommendations
    const recommendations = [];
    if (tagCounts['agents'] >= 2) {
      recommendations.push('🤖 <strong>AI Agent Development</strong> - Build intelligent agents to automate complex workflows');
    }
    if (tagCounts['data'] >= 2) {
      recommendations.push('📊 <strong>Data Intelligence Platform</strong> - Process and extract insights from your data');
    }
    if (tagCounts['llm'] >= 1) {
      recommendations.push('💬 <strong>Custom LLM Integration</strong> - Deploy conversational AI tailored to your needs');
    }
    if (tagCounts['automation'] >= 2) {
      recommendations.push('⚡ <strong>End-to-End Automation</strong> - Streamline operations with intelligent automation');
    }
    if (recommendations.length === 0) {
      recommendations.push('🎯 <strong>Consulting Session</strong> - Let\'s discuss your unique requirements');
    }
    
    quizContainer.innerHTML = `
      <div class="quiz-results">
        <h4>✨ Here's what we recommend:</h4>
        <ul class="recommendations">
          ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
        <p style="margin-top: 20px; color: #9aa6b2;">Based on your answers, these solutions would be a great fit. Let's discuss your project!</p>
        <div style="margin-top: 24px;">
          <a href="#contact" class="btn">Get Started</a>
          <button class="btn btn-ghost" onclick="location.reload()">Retake Quiz</button>
        </div>
      </div>
    `;
  }
  
  // Start quiz
  renderQuestion();
});

