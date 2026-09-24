/**
 * ApexPlanet Software Pvt. Ltd. - Internship Portal
 * Advanced Styling and JavaScript – Task 3
 * Main Interactive Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. State Management & Milestone Progress Tracker
     ========================================================================== */
  const AppState = {
    milestones: {
      task1: true,   // Task 1 initial verified
      task2: false,  // Task 2: Quiz or Carousel
      task3: false   // Task 3: API Data Fetched
    },
    quiz: {
      currentQuestion: 0,
      score: 0,
      answered: false,
      questions: [
        {
          category: 'CSS Responsive Design',
          prompt: 'Which CSS at-rule is used to apply custom styles based on device screen widths?',
          options: [
            '@media screen and (min-width: 768px)',
            '@viewport (width: 768px)',
            '@device-query (min-width: 768px)',
            '@screen-size: 768px'
          ],
          correct: 0,
          explanation: 'Media queries (@media) test viewport properties such as width, orientation, and resolution.'
        },
        {
          category: 'JavaScript Web APIs',
          prompt: 'Which native JavaScript method is used to make asynchronous HTTP network requests returning Promises?',
          options: [
            'XMLHttpRequest.open()',
            'fetch()',
            'async.request()',
            'http.get()'
          ],
          correct: 1,
          explanation: 'The native fetch() API provides an elegant, Promise-based interface for fetching remote resources.'
        },
        {
          category: 'CSS Layout Architecture',
          prompt: 'Which CSS property value enables a flexible one-dimensional layout along rows or columns?',
          options: [
            'display: table;',
            'display: flex;',
            'display: inline-block;',
            'display: float;'
          ],
          correct: 1,
          explanation: 'Flexbox (display: flex) establishes flexible box formatting for distributing space along an axis.'
        },
        {
          category: 'Modern JavaScript (ES6+)',
          prompt: 'What keyword pair makes asynchronous promise-based code read synchronously?',
          options: [
            'try and catch',
            'async and await',
            'then and catch',
            'defer and resolve'
          ],
          correct: 1,
          explanation: 'The async/await syntax lets you write clean, non-blocking asynchronous code without callback hell.'
        },
        {
          category: 'Responsive HTML Standards',
          prompt: 'Which meta tag in the HTML head is required to enable proper viewport scaling on mobile devices?',
          options: [
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
            '<meta name="responsive" content="true">',
            '<meta name="screen" content="mobile, tablet, desktop">',
            '<meta name="scale" content="100%">'
          ],
          correct: 0,
          explanation: 'The viewport meta tag instructs mobile browsers to set screen width to the device width and initial scale to 1.'
        }
      ]
    },
    carousel: {
      currentIndex: 0,
      totalSlides: 4,
      autoSlideInterval: null,
      duration: 3500,
      elapsed: 0,
      isPlaying: true
    },
    api: {
      users: [],
      filteredUsers: [],
      isLoading: false
    }
  };

  // Helper to update milestone UI
  function updateMilestoneUI() {
    const total = 3;
    let completedCount = 0;
    if (AppState.milestones.task1) completedCount++;
    if (AppState.milestones.task2) completedCount++;
    if (AppState.milestones.task3) completedCount++;

    const percent = Math.round((completedCount / total) * 100);

    const progressBar = document.getElementById('masterProgressBar');
    const percentDisplay = document.getElementById('totalProgressPercent');

    if (progressBar) progressBar.style.width = `${percent}%`;
    if (percentDisplay) percentDisplay.textContent = `${percent}%`;

    // Task 2 milestone item
    const m2Item = document.getElementById('milestoneTask2');
    const m2Badge = document.getElementById('milestone2Badge');
    const m2Icon = document.getElementById('milestone2Icon');
    if (m2Item && AppState.milestones.task2) {
      m2Item.classList.add('completed');
      if (m2Badge) {
        m2Badge.textContent = 'Completed';
        m2Badge.classList.remove('pending');
      }
      if (m2Icon) m2Icon.textContent = '✓';
    } else if (m2Item) {
      m2Item.classList.remove('completed');
      if (m2Badge) {
        m2Badge.textContent = 'In Progress';
        m2Badge.classList.add('pending');
      }
      if (m2Icon) m2Icon.textContent = '○';
    }

    // Task 3 milestone item
    const m3Item = document.getElementById('milestoneTask3');
    const m3Badge = document.getElementById('milestone3Badge');
    const m3Icon = document.getElementById('milestone3Icon');
    if (m3Item && AppState.milestones.task3) {
      m3Item.classList.add('completed');
      if (m3Badge) {
        m3Badge.textContent = 'Completed';
        m3Badge.classList.remove('pending');
      }
      if (m3Icon) m3Icon.textContent = '✓';
    } else if (m3Item) {
      m3Item.classList.remove('completed');
      if (m3Badge) {
        m3Badge.textContent = 'In Progress';
        m3Badge.classList.add('pending');
      }
      if (m3Icon) m3Icon.textContent = '○';
    }
  }

  // Reset progress listener
  const btnResetProgress = document.getElementById('btnResetProgress');
  if (btnResetProgress) {
    btnResetProgress.addEventListener('click', () => {
      AppState.milestones.task2 = false;
      AppState.milestones.task3 = false;
      updateMilestoneUI();
    });
  }

  /* ==========================================================================
     2. Header Navigation, Scroll Effects & Breakpoint Indicator
     ========================================================================== */
  const siteHeader = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const headerBreakpointText = document.getElementById('headerBreakpointText');

  // Real-time Breakpoint Detection in Header
  function updateBreakpointIndicator() {
    const width = window.innerWidth;
    if (!headerBreakpointText) return;

    if (width <= 640) {
      headerBreakpointText.textContent = `Mobile (${width}px)`;
    } else if (width <= 1024) {
      headerBreakpointText.textContent = `Tablet (${width}px)`;
    } else {
      headerBreakpointText.textContent = `Desktop (${width}px)`;
    }
  }

  window.addEventListener('resize', updateBreakpointIndicator);
  updateBreakpointIndicator();

  // Scroll header styling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section spy on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const activeNav = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-links .nav-link').forEach(l => l.classList.remove('active'));
        if (activeNav) activeNav.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     3. Module 1: Interactive Viewport Simulator
     ========================================================================== */
  const presetButtons = document.querySelectorAll('.preset-btn');
  const simulatedFrame = document.getElementById('simulatedFrame');
  const frameSizeBadge = document.getElementById('frameSizeBadge');
  const simNavStatus = document.getElementById('simNavStatus');
  const simCssState = document.getElementById('simCssState');
  const btnCopyCode = document.getElementById('btnCopyCode');

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-mode');
      if (!simulatedFrame) return;

      simulatedFrame.classList.remove('mode-desktop', 'mode-tablet', 'mode-mobile');
      simulatedFrame.classList.add(`mode-${mode}`);

      if (mode === 'desktop') {
        if (frameSizeBadge) frameSizeBadge.textContent = 'Width: 100% (Desktop)';
        if (simNavStatus) simNavStatus.textContent = 'Desktop Nav Active';
        if (simCssState) simCssState.textContent = 'Desktop Multi-Column Grid (min-width: 1025px)';
      } else if (mode === 'tablet') {
        if (frameSizeBadge) frameSizeBadge.textContent = 'Width: 768px (Tablet)';
        if (simNavStatus) simNavStatus.textContent = 'Tablet Nav Compact';
        if (simCssState) simCssState.textContent = 'Tablet 2-Column Grid (641px - 1024px)';
      } else if (mode === 'mobile') {
        if (frameSizeBadge) frameSizeBadge.textContent = 'Width: 375px (Mobile)';
        if (simNavStatus) simNavStatus.textContent = 'Mobile Drawer Active';
        if (simCssState) simCssState.textContent = 'Mobile Single Column Stack (max-width: 640px)';
      }

      AppState.milestones.task1 = true;
      updateMilestoneUI();
    });
  });

  // Copy CSS code snippet
  if (btnCopyCode) {
    btnCopyCode.addEventListener('click', () => {
      const code = `/* Mobile Base Rules */
.cards-grid { display: flex; flex-direction: column; gap: 1rem; }

/* Tablet Breakpoint (min-width: 641px) */
@media (min-width: 641px) and (max-width: 1024px) {
  .cards-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
}

/* Desktop Breakpoint (min-width: 1025px) */
@media (min-width: 1025px) {
  .cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
}`;
      navigator.clipboard.writeText(code).then(() => {
        const original = btnCopyCode.textContent;
        btnCopyCode.textContent = '✓ Copied!';
        btnCopyCode.style.color = '#38bdf8';
        setTimeout(() => {
          btnCopyCode.textContent = original;
          btnCopyCode.style.color = '';
        }, 2000);
      }).catch(() => {
        btnCopyCode.textContent = 'Copied!';
      });
    });
  }

  /* ==========================================================================
     4. Module 2: Interactive JavaScript Quiz
     ========================================================================== */
  const quizStartView = document.getElementById('quizStartView');
  const quizQuestionView = document.getElementById('quizQuestionView');
  const quizResultView = document.getElementById('quizResultView');

  const btnStartQuiz = document.getElementById('btnStartQuiz');
  const btnNextQuestion = document.getElementById('btnNextQuestion');
  const btnRetakeQuiz = document.getElementById('btnRetakeQuiz');

  const quizQuestionPrompt = document.getElementById('quizQuestionPrompt');
  const quizCategory = document.getElementById('quizCategory');
  const quizOptionsList = document.getElementById('quizOptionsList');
  const quizFeedbackBox = document.getElementById('quizFeedbackBox');
  const feedbackIcon = document.getElementById('feedbackIcon');
  const feedbackText = document.getElementById('feedbackText');
  const liveScoreCount = document.getElementById('liveScoreCount');
  const quizQuestionCount = document.getElementById('quizQuestionCount');
  const quizProgressFill = document.getElementById('quizProgressFill');

  // Results elements
  const finalScoreText = document.getElementById('finalScoreText');
  const finalPercentText = document.getElementById('finalPercentText');
  const resultMessage = document.getElementById('resultMessage');
  const statCorrect = document.getElementById('statCorrect');
  const statAccuracy = document.getElementById('statAccuracy');
  const resultEmoji = document.getElementById('resultEmoji');

  function renderQuizQuestion() {
    const qIndex = AppState.quiz.currentQuestion;
    const currentQ = AppState.quiz.questions[qIndex];
    AppState.quiz.answered = false;

    // Update Progress & Badges
    const totalQ = AppState.quiz.questions.length;
    quizQuestionCount.textContent = `Question ${qIndex + 1} of ${totalQ}`;
    quizProgressFill.style.width = `${((qIndex + 1) / totalQ) * 100}%`;
    quizCategory.textContent = currentQ.category;
    quizQuestionPrompt.textContent = currentQ.prompt;

    // Reset Next Button & Feedback
    btnNextQuestion.disabled = true;
    quizFeedbackBox.classList.add('hidden');
    quizFeedbackBox.classList.remove('error');

    // Populate Options
    quizOptionsList.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    currentQ.options.forEach((optText, idx) => {
      const optBtn = document.createElement('button');
      optBtn.className = 'quiz-option-btn';
      optBtn.setAttribute('data-index', idx);
      optBtn.innerHTML = `
        <span class="option-prefix">${letters[idx]}</span>
        <span class="option-label">${optText}</span>
      `;

      optBtn.addEventListener('click', () => handleOptionSelected(idx, optBtn));
      quizOptionsList.appendChild(optBtn);
    });
  }

  function handleOptionSelected(selectedIndex, selectedBtn) {
    if (AppState.quiz.answered) return;
    AppState.quiz.answered = true;

    const qIndex = AppState.quiz.currentQuestion;
    const currentQ = AppState.quiz.questions[qIndex];
    const isCorrect = selectedIndex === currentQ.correct;

    const allOptionBtns = quizOptionsList.querySelectorAll('.quiz-option-btn');
    allOptionBtns.forEach(btn => btn.disabled = true);

    if (isCorrect) {
      AppState.quiz.score++;
      selectedBtn.classList.add('correct');
      feedbackIcon.textContent = '✓';
      feedbackText.textContent = `Correct! ${currentQ.explanation}`;
      quizFeedbackBox.classList.remove('error');
    } else {
      selectedBtn.classList.add('wrong');
      allOptionBtns[currentQ.correct].classList.add('correct');
      feedbackIcon.textContent = '✕';
      feedbackText.textContent = `Incorrect. ${currentQ.explanation}`;
      quizFeedbackBox.classList.add('error');
    }

    quizFeedbackBox.classList.remove('hidden');
    liveScoreCount.textContent = AppState.quiz.score;
    btnNextQuestion.disabled = false;

    if (qIndex === AppState.quiz.questions.length - 1) {
      btnNextQuestion.querySelector('span').textContent = 'View Final Results';
    } else {
      btnNextQuestion.querySelector('span').textContent = 'Next Question';
    }
  }

  function showQuizResults() {
    quizQuestionView.classList.add('hidden');
    quizResultView.classList.remove('hidden');

    const score = AppState.quiz.score;
    const total = AppState.quiz.questions.length;
    const percent = Math.round((score / total) * 100);

    finalScoreText.textContent = `${score} / ${total}`;
    finalPercentText.textContent = `${percent}% Score`;
    statCorrect.textContent = `${score} / ${total}`;
    statAccuracy.textContent = `${percent}%`;

    if (percent >= 80) {
      resultEmoji.textContent = '🏆';
      resultMessage.textContent = 'Distinction! Outstanding performance! You demonstrated mastery in advanced CSS styling and JavaScript concepts.';
    } else if (percent >= 60) {
      resultEmoji.textContent = '👍';
      resultMessage.textContent = 'Good work! You have a solid grasp of web design fundamentals. Review media queries and promises to achieve full mastery.';
    } else {
      resultEmoji.textContent = '📚';
      resultMessage.textContent = 'Keep practicing! Review media queries, DOM events, and fetch API concepts to improve your score.';
    }

    // Mark Task 2 milestone completed
    AppState.milestones.task2 = true;
    updateMilestoneUI();
  }

  // Quiz Event Listeners
  if (btnStartQuiz) {
    btnStartQuiz.addEventListener('click', () => {
      quizStartView.classList.add('hidden');
      quizQuestionView.classList.remove('hidden');
      AppState.quiz.currentQuestion = 0;
      AppState.quiz.score = 0;
      liveScoreCount.textContent = '0';
      renderQuizQuestion();

      AppState.milestones.task2 = true;
      updateMilestoneUI();
    });
  }

  if (btnNextQuestion) {
    btnNextQuestion.addEventListener('click', () => {
      if (AppState.quiz.currentQuestion < AppState.quiz.questions.length - 1) {
        AppState.quiz.currentQuestion++;
        renderQuizQuestion();
      } else {
        showQuizResults();
      }
    });
  }

  if (btnRetakeQuiz) {
    btnRetakeQuiz.addEventListener('click', () => {
      quizResultView.classList.add('hidden');
      quizStartView.classList.remove('hidden');
      AppState.quiz.currentQuestion = 0;
      AppState.quiz.score = 0;
      liveScoreCount.textContent = '0';
      quizProgressFill.style.width = '20%';
      quizQuestionCount.textContent = 'Question 1 of 5';
    });
  }

  /* ==========================================================================
     5. Module 2: Technology Showcase Image Carousel
     ========================================================================== */
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  const carouselPrevBtn = document.getElementById('carouselPrevBtn');
  const carouselNextBtn = document.getElementById('carouselNextBtn');
  const carouselTimerFill = document.getElementById('carouselTimerFill');
  const btnCarouselPlayPause = document.getElementById('btnCarouselPlayPause');
  const playPauseLabel = document.getElementById('playPauseLabel');
  const carouselViewport = document.getElementById('carouselViewport');

  function showSlide(index) {
    // Wrap index boundaries
    if (index >= AppState.carousel.totalSlides) {
      AppState.carousel.currentIndex = 0;
    } else if (index < 0) {
      AppState.carousel.currentIndex = AppState.carousel.totalSlides - 1;
    } else {
      AppState.carousel.currentIndex = index;
    }

    const cur = AppState.carousel.currentIndex;

    carouselSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === cur);
    });

    carouselDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === cur);
    });

    // Reset progress bar on change
    AppState.carousel.elapsed = 0;
    if (carouselTimerFill) carouselTimerFill.style.width = '0%';
  }

  function nextSlide() {
    showSlide(AppState.carousel.currentIndex + 1);
  }

  function prevSlide() {
    showSlide(AppState.carousel.currentIndex - 1);
  }

  // Timer Tick Loop for smooth auto-slide progress
  const tickStep = 50;
  function startCarouselTimer() {
    stopCarouselTimer();
    AppState.carousel.autoSlideInterval = setInterval(() => {
      if (!AppState.carousel.isPlaying) return;

      AppState.carousel.elapsed += tickStep;
      const progressPercent = Math.min((AppState.carousel.elapsed / AppState.carousel.duration) * 100, 100);

      if (carouselTimerFill) {
        carouselTimerFill.style.width = `${progressPercent}%`;
      }

      if (AppState.carousel.elapsed >= AppState.carousel.duration) {
        nextSlide();
      }
    }, tickStep);
  }

  function stopCarouselTimer() {
    if (AppState.carousel.autoSlideInterval) {
      clearInterval(AppState.carousel.autoSlideInterval);
      AppState.carousel.autoSlideInterval = null;
    }
  }

  // Carousel Controls
  if (carouselNextBtn) {
    carouselNextBtn.addEventListener('click', () => {
      nextSlide();
      AppState.milestones.task2 = true;
      updateMilestoneUI();
    });
  }

  if (carouselPrevBtn) {
    carouselPrevBtn.addEventListener('click', () => {
      prevSlide();
      AppState.milestones.task2 = true;
      updateMilestoneUI();
    });
  }

  carouselDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      AppState.milestones.task2 = true;
      updateMilestoneUI();
    });
  });

  // Hover Pause & Resume
  if (carouselViewport) {
    carouselViewport.addEventListener('mouseenter', () => {
      AppState.carousel.isPlaying = false;
    });

    carouselViewport.addEventListener('mouseleave', () => {
      if (btnCarouselPlayPause.getAttribute('data-state') !== 'paused') {
        AppState.carousel.isPlaying = true;
      }
    });
  }

  // Manual Play/Pause Button
  if (btnCarouselPlayPause) {
    btnCarouselPlayPause.addEventListener('click', () => {
      const isCurrentlyPlaying = AppState.carousel.isPlaying;
      AppState.carousel.isPlaying = !isCurrentlyPlaying;

      if (AppState.carousel.isPlaying) {
        btnCarouselPlayPause.removeAttribute('data-state');
        playPauseLabel.textContent = 'Auto (3.5s)';
      } else {
        btnCarouselPlayPause.setAttribute('data-state', 'paused');
        playPauseLabel.textContent = 'Paused';
        if (carouselTimerFill) carouselTimerFill.style.width = '0%';
      }
    });
  }

  // Start carousel initially
  startCarouselTimer();

  /* ==========================================================================
     6. Module 3: Fetch Data from an API Using JavaScript
     ========================================================================== */
  const btnLoadApiData = document.getElementById('btnLoadApiData');
  const btnClearApiData = document.getElementById('btnClearApiData');
  const apiSearchInput = document.getElementById('apiSearchInput');
  const btnClearSearch = document.getElementById('btnClearSearch');
  const apiStatusBadge = document.getElementById('apiStatusBadge');
  const apiStatusText = document.getElementById('apiStatusText');
  const apiCardsContainer = document.getElementById('apiCardsContainer');
  const apiMessageBanner = document.getElementById('apiMessageBanner');
  const apiMessageText = document.getElementById('apiMessageText');
  const apiMessageIcon = document.getElementById('apiMessageIcon');
  const btnDismissMsg = document.getElementById('btnDismissMsg');
  const apiBtnText = document.getElementById('apiBtnText');

  // Fallback dataset for offline resilience / instant demo
  const fallbackUsers = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: { city: 'Gwenborough' },
      phone: '1-770-736-8031',
      website: 'hildegard.org',
      company: { name: 'Romaguera-Crona' }
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      address: { city: 'Wisokyburgh' },
      phone: '010-692-6593',
      website: 'anastasia.net',
      company: { name: 'Deckow-Crist' }
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
      address: { city: 'McKenziehaven' },
      phone: '1-463-123-4447',
      website: 'ramiro.info',
      company: { name: 'Romaguera-Jacobson' }
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org',
      address: { city: 'South Elvis' },
      phone: '493-170-9623',
      website: 'kale.biz',
      company: { name: 'Robel-Corkery' }
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca',
      address: { city: 'Roscoeview' },
      phone: '(254)954-1289',
      website: 'demarco.info',
      company: { name: 'Keebler LLC' }
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      username: 'Leopoldo_Corkery',
      email: 'Karley_Dach@jasper.info',
      address: { city: 'South Christy' },
      phone: '1-477-935-8478',
      website: 'ola.org',
      company: { name: 'Considine-Lockman' }
    }
  ];

  // Helper to show Skeleton Loading Cards
  function renderSkeletonLoaders(count = 6) {
    let skeletonsHtml = '';
    for (let i = 0; i < count; i++) {
      skeletonsHtml += `
        <div class="skeleton-card">
          <div class="user-card-top">
            <div class="skeleton-avatar skeleton-pulse"></div>
            <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
              <div class="skeleton-title skeleton-pulse"></div>
              <div class="skeleton-subtitle skeleton-pulse"></div>
            </div>
          </div>
          <div class="skeleton-line skeleton-pulse"></div>
          <div class="skeleton-line skeleton-pulse"></div>
          <div class="skeleton-line skeleton-pulse" style="width: 70%;"></div>
        </div>
      `;
    }
    apiCardsContainer.innerHTML = skeletonsHtml;
  }

  // Helper to render user cards dynamically
  function renderUserCards(usersList) {
    if (!usersList || usersList.length === 0) {
      apiCardsContainer.innerHTML = `
        <div class="empty-api-state">
          <div class="empty-icon">🔍</div>
          <h3>No Matching Users Found</h3>
          <p>No user records matched your search query. Try clearing the filter or searching for another name/city.</p>
        </div>
      `;
      return;
    }

    let cardsHtml = '';
    usersList.forEach(user => {
      // Initials for avatar
      const initials = user.name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

      cardsHtml += `
        <article class="api-user-card" data-id="${user.id}">
          <div class="user-card-top">
            <div class="user-avatar">${initials}</div>
            <div class="user-names">
              <h4 class="user-name" title="${user.name}">${user.name}</h4>
              <span class="user-handle">@${user.username}</span>
            </div>
          </div>

          <div class="user-meta-list">
            <div class="meta-row">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>${user.email}</span>
            </div>
            <div class="meta-row">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${user.address?.city || 'Apex City'}</span>
            </div>
          </div>

          <div class="user-card-footer">
            <span class="company-tag">${user.company?.name || 'Apex Tech Partner'}</span>
            <a href="https://${user.website || 'example.com'}" target="_blank" rel="noopener noreferrer" class="btn-visit">
              <span>${user.website || 'visit site'}</span>
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" fill="none" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </article>
      `;
    });

    apiCardsContainer.innerHTML = cardsHtml;
  }

  // Display Status Banner
  function showApiMessage(msg, isSuccess = false) {
    if (!apiMessageBanner) return;
    apiMessageText.textContent = msg;
    apiMessageIcon.textContent = isSuccess ? '✓' : '⚠️';
    apiMessageBanner.classList.remove('hidden');
    apiMessageBanner.classList.toggle('success', isSuccess);
  }

  // Set Status Badge
  function setApiStatus(text, state = 'default') {
    if (!apiStatusText || !apiStatusBadge) return;
    apiStatusText.textContent = text;
    const dot = apiStatusBadge.querySelector('.status-dot');
    if (!dot) return;

    dot.className = 'status-dot';
    if (state === 'active') dot.classList.add('active');
    else if (state === 'error') dot.classList.add('error');
    else if (state === 'loading') dot.classList.add('loading');
  }

  // Asynchronous Fetch Request
  async function fetchUsersData() {
    if (AppState.api.isLoading) return;

    const startTime = performance.now();
    AppState.api.isLoading = true;
    apiSearchInput.disabled = true;
    btnLoadApiData.disabled = true;
    apiBtnText.textContent = 'Fetching Data...';

    setApiStatus('Fetching from REST API...', 'loading');
    renderSkeletonLoaders(6);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: Status ${response.status} (${response.statusText})`);
      }

      const data = await response.json();
      const duration = Math.round(performance.now() - startTime);

      AppState.api.users = data;
      AppState.api.filteredUsers = data;

      renderUserCards(data);
      setApiStatus(`Loaded ${data.length} users in ${duration}ms`, 'active');
      showApiMessage(`Successfully fetched ${data.length} live user profiles from public API (${duration}ms).`, true);

      apiSearchInput.disabled = false;
      apiSearchInput.value = '';

      // Advance Task 3 Milestone
      AppState.milestones.task3 = true;
      updateMilestoneUI();

    } catch (err) {
      console.warn('API Fetch failed or offline, loading fallback dataset:', err);

      // Gracefully switch to offline cache dataset
      setTimeout(() => {
        AppState.api.users = fallbackUsers;
        AppState.api.filteredUsers = fallbackUsers;
        renderUserCards(fallbackUsers);

        setApiStatus('Loaded Offline Dataset (Fallback)', 'active');
        showApiMessage('Live network fetch unavailable. Successfully loaded cached team dataset for continuous offline demonstration.', true);

        apiSearchInput.disabled = false;
        apiSearchInput.value = '';

        AppState.milestones.task3 = true;
        updateMilestoneUI();
      }, 600);

    } finally {
      AppState.api.isLoading = false;
      btnLoadApiData.disabled = false;
      apiBtnText.textContent = 'Reload Data';
    }
  }

  // Load API Data Button Click
  if (btnLoadApiData) {
    btnLoadApiData.addEventListener('click', fetchUsersData);
  }

  // Clear API Data Button Click
  if (btnClearApiData) {
    btnClearApiData.addEventListener('click', () => {
      AppState.api.users = [];
      AppState.api.filteredUsers = [];
      apiSearchInput.value = '';
      apiSearchInput.disabled = true;
      btnClearSearch.classList.add('hidden');
      apiMessageBanner.classList.add('hidden');
      setApiStatus('Ready to fetch', 'default');
      apiBtnText.textContent = 'Load API Data';

      apiCardsContainer.innerHTML = `
        <div class="empty-api-state" id="apiEmptyState">
          <div class="empty-icon">🌐</div>
          <h3>No API Data Loaded Yet</h3>
          <p>Click the <strong>"Load API Data"</strong> button above to initiate a live asynchronous GET request to the JSONPlaceholder public REST endpoint.</p>
          <span class="api-endpoint-pill">GET https://jsonplaceholder.typicode.com/users</span>
        </div>
      `;
    });
  }

  // Filter / Search Input handling
  if (apiSearchInput) {
    apiSearchInput.addEventListener('input', (e) => {
      const term = e.target.value.trim().toLowerCase();
      btnClearSearch.classList.toggle('hidden', term.length === 0);

      if (!term) {
        AppState.api.filteredUsers = AppState.api.users;
      } else {
        AppState.api.filteredUsers = AppState.api.users.filter(u => {
          return (
            u.name.toLowerCase().includes(term) ||
            u.username.toLowerCase().includes(term) ||
            u.email.toLowerCase().includes(term) ||
            (u.address?.city && u.address.city.toLowerCase().includes(term)) ||
            (u.company?.name && u.company.name.toLowerCase().includes(term))
          );
        });
      }

      renderUserCards(AppState.api.filteredUsers);
      setApiStatus(`Showing ${AppState.api.filteredUsers.length} of ${AppState.api.users.length}`, 'active');
    });
  }

  if (btnClearSearch) {
    btnClearSearch.addEventListener('click', () => {
      apiSearchInput.value = '';
      btnClearSearch.classList.add('hidden');
      AppState.api.filteredUsers = AppState.api.users;
      renderUserCards(AppState.api.users);
      setApiStatus(`Showing ${AppState.api.users.length} users`, 'active');
      apiSearchInput.focus();
    });
  }

  if (btnDismissMsg) {
    btnDismissMsg.addEventListener('click', () => {
      apiMessageBanner.classList.add('hidden');
    });
  }

  // Initialize milestone dashboard state
  updateMilestoneUI();

});
