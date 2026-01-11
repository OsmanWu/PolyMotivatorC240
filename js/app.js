/**
 * PolyMotivator JavaScript Application
 * Personalized motivation and study guidance for polytechnic students
 * Optimized for performance and accessibility
 */

class PolyMotivator {
  constructor() {
    this.userPreferences = this.loadUserPreferences();
    this.currentStep = 1;
    this.isInitialized = false;
    
    // Content databases for personalization
    this.motivationContent = this.initializeMotivationContent();
    this.studyTipsContent = this.initializeStudyTipsContent();
    this.confidenceMessages = this.initializeConfidenceMessages();
    
    // Performance optimization
    this.debounceDelay = 300;
    this.animationFrame = null;
    
    // Initialize the app
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    if (this.isInitialized) return;
    
    this.setupEventListeners();
    this.setupAccessibility();
    this.checkUserPreferences();
    this.setupPerformanceOptimizations();
    
    this.isInitialized = true;
    console.log('PolyMotivator initialized successfully! 🚀');
  }

  /**
   * Setup event listeners with performance optimization
   */
  setupEventListeners() {
    // Logo click to return home (on PrepTips page)
    const logo = document.getElementById('logo');
    if (logo) {
      const logoLink = logo.getAttribute('href');
      // If logo has href, it's already a link, so skip event listener
      if (!logoLink) {
        logo.addEventListener('click', (e) => {
          e.preventDefault();
          this.returnToHome();
        });
      }
    }

    // Get Started Button
    const getStartedBtn = document.getElementById('get-started-btn');
    if (getStartedBtn) {
      getStartedBtn.addEventListener('click', () => {
        // Navigate to PrepTips page
        window.location.href = 'PrepTips.html';
      });
    }

    // Onboarding form navigation
    this.setupOnboardingNavigation();
    
    // Refresh buttons for dynamic content
    this.setupRefreshButtons();
    
    // Quick action cards
    this.setupQuickActions();

    // Chatbot removed
    
    // Confidence slider
    this.setupConfidenceSlider();
    
    // Form submission
    const form = document.getElementById('onboarding-form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleFormSubmission(e));
    }

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
    
    // Window resize handler (debounced)
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, this.debounceDelay));
  }

  /**
   * Setup onboarding form navigation
   */
  setupOnboardingNavigation() {
    // Next buttons
    document.querySelectorAll('.next-button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const nextStep = e.target.dataset.next;
        if (this.validateCurrentStep()) {
          this.goToStep(nextStep);
        }
      });
    });

    // Back buttons
    document.querySelectorAll('.back-button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prevStep = e.target.dataset.back;
        this.goToStep(prevStep);
      });
    });

    // Option selection handlers
    document.querySelectorAll('input[type="radio"]').forEach(input => {
      input.addEventListener('change', (e) => {
        this.handleOptionSelection(e.target);
      });
    });
  }

  /**
   * Setup refresh buttons for dynamic content
   */
  setupRefreshButtons() {
    const motivationRefresh = document.getElementById('refresh-motivation');
    if (motivationRefresh) {
      motivationRefresh.addEventListener('click', () => {
        this.refreshMotivation();
      });
    }

    const studyRefresh = document.getElementById('refresh-study');
    if (studyRefresh) {
      studyRefresh.addEventListener('click', () => {
        this.refreshStudyTip();
      });
    }
  }

  /**
   * Setup quick action cards
   */
  setupQuickActions() {
    const quickActions = {
      'exam-prep': () => this.showExamPrepChecklist(),
      'study-planner': () => this.showStudyPlanner(),
      'mood-check': () => this.showMoodCheckIn(),
      'resources': () => this.showResources()
    };

    Object.entries(quickActions).forEach(([id, handler]) => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener('click', handler);
      }
    });

    // Timer functionality
    const timerBtn = document.getElementById('start-timer');
    if (timerBtn) {
      timerBtn.addEventListener('click', () => this.startStudyTimer());
    }

    // Save tip functionality
    const saveTipBtn = document.getElementById('save-tip');
    if (saveTipBtn) {
      saveTipBtn.addEventListener('click', () => this.saveTip());
    }
  }

  

  /**
   * Setup confidence slider with real-time feedback
   */
  setupConfidenceSlider() {
    const slider = document.getElementById('confidence-level');
    const output = document.getElementById('confidence-value');
    
    if (slider && output) {
      const updateConfidenceMessage = () => {
        const value = parseInt(slider.value);
        const message = this.getConfidenceMessage(value);
        output.textContent = message;
        
        // Update slider track color based on confidence level
        const percentage = ((value - 1) / 4) * 100;
        slider.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percentage}%, var(--gray-200) ${percentage}%, var(--gray-200) 100%)`;
      };

      slider.addEventListener('input', updateConfidenceMessage);
      updateConfidenceMessage(); // Initial call
    }
  }

  /**
   * Setup accessibility enhancements
   */
  setupAccessibility() {
    // Announce dynamic content changes
    this.createAriaLiveRegion();
    
    // Improve focus management
    this.setupFocusManagement();
    
    // Add keyboard shortcuts info
    this.setupKeyboardShortcuts();
  }

  /**
   * Create ARIA live region for announcements
   */
  createAriaLiveRegion() {
    if (!document.getElementById('aria-live-region')) {
      const liveRegion = document.createElement('div');
      liveRegion.id = 'aria-live-region';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }
  }

  /**
   * Announce message to screen readers
   */
  announceToScreenReader(message) {
    const liveRegion = document.getElementById('aria-live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }

  /**
   * Setup focus management for better accessibility
   */
  setupFocusManagement() {
    // Trap focus in modals/forms when active
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const activeModal = document.querySelector('.onboarding:not(.hidden)');
        if (activeModal) {
          this.trapFocus(e, activeModal);
        }
      }
    });
  }

  /**
   * Trap focus within an element
   */
  trapFocus(event, element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  /**
   * Setup keyboard shortcuts
   */
  setupKeyboardShortcuts() {
    // Alt + M: New motivation
    // Alt + S: New study tip
    // Alt + P: View progress
    document.addEventListener('keydown', (e) => {
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'm':
            e.preventDefault();
            this.refreshMotivation();
            this.announceToScreenReader('New motivation loaded');
            break;
          case 's':
            e.preventDefault();
            this.refreshStudyTip();
            this.announceToScreenReader('New study tip loaded');
            break;
          case 'p':
            e.preventDefault();
            document.getElementById('progress')?.scrollIntoView({ behavior: 'smooth' });
            this.announceToScreenReader('Navigated to progress section');
            break;
        }
      }
    });
  }

  /**
   * Handle keyboard navigation
   */
  handleKeyboardNavigation(event) {
    // Escape key to close modals or return to main view
    if (event.key === 'Escape') {
      const onboarding = document.getElementById('onboarding');
      if (onboarding && !onboarding.classList.contains('hidden')) {
        // Don't close onboarding completely, but could provide feedback
        this.announceToScreenReader('Press Alt+H for help or continue with the form');
      }
    }
  }

  /**
   * Performance optimizations setup
   */
  setupPerformanceOptimizations() {
    // Lazy load images when they come into view
    if ('IntersectionObserver' in window) {
      this.setupLazyLoading();
    }
    
    // Preload critical content
    this.preloadCriticalContent();
    
    // Setup efficient animation handling
    this.setupAnimationOptimizations();
  }

  /**
   * Setup lazy loading for images
   */
  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  /**
   * Preload critical content for better UX
   */
  preloadCriticalContent() {
    // Preload a few motivation messages and study tips
    this.preloadedMotivation = this.getPersonalizedMotivation(3);
    this.preloadedStudyTips = this.getPersonalizedStudyTips(3);
  }

  /**
   * Setup animation optimizations
   */
  setupAnimationOptimizations() {
    // Use requestAnimationFrame for smooth animations
    this.animationQueue = [];
    this.isAnimating = false;
  }

  /**
   * Show onboarding flow
   */
  showOnboarding() {
    // Check if onboarding section exists (PrepTips page)
    const onboarding = document.getElementById('onboarding');
    const dashboard = document.getElementById('dashboard');
    
    if (onboarding && dashboard) {
      this.hideSection('dashboard');
      this.showSection('onboarding');
      this.goToStep('step-1');
      
      // Focus first interactive element
      setTimeout(() => {
        const firstRadio = document.querySelector('#step-1 input[type="radio"]');
        if (firstRadio) {
          firstRadio.focus();
        }
      }, 100);

      this.announceToScreenReader('Starting personalization. Please answer a few questions to customize your experience.');
    }
  }

  /**
   * Return to home page
   */
  returnToHome() {
    window.location.href = 'index.html';
  }

  /**
   * Show main functions (dashboard with all features)
   */
  showMainFunctions() {
    const preferences = this.loadUserPreferences();
    
    if (preferences) {
      // User has completed onboarding, show dashboard
      this.hideSection('onboarding');
      this.showSection('dashboard');
      
      // Scroll to dashboard
      document.getElementById('dashboard').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      this.announceToScreenReader('Showing main dashboard');
    } else {
      // No preferences, show onboarding
      this.showOnboarding();
    }
  }

  /**
   * Navigate to specific step in onboarding
   */
  goToStep(stepId) {
    // Hide current step
    document.querySelectorAll('.form-step').forEach(step => {
      step.classList.remove('active');
    });

    // Show target step
    const targetStep = document.getElementById(stepId);
    if (targetStep) {
      targetStep.classList.add('active');
      
      // Update current step number
      this.currentStep = parseInt(stepId.split('-')[1]);
      
      // Focus management
      setTimeout(() => {
        const firstInteractive = targetStep.querySelector('input, button');
        if (firstInteractive) {
          firstInteractive.focus();
        }
      }, 100);
    }
  }

  /**
   * Validate current step before proceeding
   */
  validateCurrentStep() {
    const currentStepElement = document.querySelector('.form-step.active');
    if (!currentStepElement) return false;

    const requiredInputs = currentStepElement.querySelectorAll('input[required], input[type="radio"][name]');
    
    for (let input of requiredInputs) {
      if (input.type === 'radio') {
        const radioGroup = currentStepElement.querySelectorAll(`input[name="${input.name}"]`);
        const isChecked = Array.from(radioGroup).some(radio => radio.checked);
        if (!isChecked) {
          this.showValidationError(`Please select an option for ${input.name.replace('-', ' ')}`);
          return false;
        }
      } else if (!input.value.trim()) {
        this.showValidationError('Please complete all required fields');
        input.focus();
        return false;
      }
    }

    return true;
  }

  /**
   * Handle option selection with visual feedback
   */
  handleOptionSelection(input) {
    // Add smooth visual feedback
    const card = input.closest('.option-card');
    if (card) {
      // Remove selection from siblings
      const siblings = card.parentElement.querySelectorAll('.option-card');
      siblings.forEach(sibling => {
        sibling.classList.remove('selected');
      });
      
      // Add selection to current
      card.classList.add('selected');
      
      // Provide audio feedback for screen readers
      this.announceToScreenReader(`${input.value} selected`);
    }
  }

  /**
   * Handle form submission and show personalized dashboard
   */
  handleFormSubmission(event) {
    event.preventDefault();
    
    if (!this.validateCurrentStep()) {
      return;
    }

    // Show loading
    this.showLoading('Setting up your personalized experience...');

    // Collect form data
    const formData = new FormData(event.target);
    const preferences = {
      courseCluster: formData.get('course-cluster'),
      learningStyle: formData.get('learning-style'),
      confidenceLevel: formData.get('confidence-level'),
      timestamp: Date.now()
    };

    // Save preferences
    this.saveUserPreferences(preferences);

    // Simulate processing time for better UX
    setTimeout(() => {
      this.hideLoading();
      this.showPersonalizedDashboard(preferences);
      this.trackEvent('onboarding_completed', preferences);
    }, 1500);
  }

  /**
   * Show personalized dashboard
   */
  showPersonalizedDashboard(preferences) {
    this.hideSection('onboarding');
    this.showSection('dashboard');

    // Personalize the greeting
    this.updatePersonalizedGreeting(preferences);
    
    // Load personalized content
    this.loadPersonalizedMotivation(preferences);
    this.loadPersonalizedStudyTip(preferences);
    this.updateProgress();

    // Scroll to dashboard
    document.getElementById('dashboard').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });

    this.announceToScreenReader('Welcome to your personalized dashboard! Your motivation and study tips are ready.');
  }

  /**
   * Update personalized greeting based on preferences
   */
  updatePersonalizedGreeting(preferences) {
    const greetingElement = document.getElementById('user-greeting');
    const messageElement = document.getElementById('personalized-message');
    
    if (greetingElement && messageElement) {
      const clusterMessages = {
        engineering: {
          greeting: "Hey there, future engineer! 🔧",
          message: "Ready to build amazing things? Here's your personalized tech-focused guidance!"
        },
        business: {
          greeting: "Hello, future business leader! 💼",
          message: "Time to develop those leadership skills! Your business-focused tips await!"
        },
        design: {
          greeting: "Hey creative soul! 🎨",
          message: "Let's fuel that artistic passion! Your design-focused inspiration is here!"
        },
        health: {
          greeting: "Hi there, future healthcare hero! 🏥",
          message: "Ready to make a difference in healthcare? Your caring journey starts here!"
        }
      };

      const cluster = preferences.courseCluster || 'engineering';
      const messages = clusterMessages[cluster] || clusterMessages.engineering;
      
      greetingElement.textContent = messages.greeting;
      messageElement.textContent = messages.message;
    }
  }

  /**
   * Load personalized motivation content
   */
  loadPersonalizedMotivation(preferences) {
    const motivation = this.getPersonalizedMotivation(1, preferences)[0];
    const motivationElement = document.getElementById('daily-motivation');
    const contextElement = document.getElementById('motivation-context');

    if (motivationElement && contextElement && motivation) {
      this.animateTextChange(motivationElement, motivation.quote);
      this.animateTextChange(contextElement, motivation.context);
    }
  }

  /**
   * Load personalized study tip
   */
  loadPersonalizedStudyTip(preferences) {
    const tip = this.getPersonalizedStudyTips(1, preferences)[0];
    const titleElement = document.getElementById('study-tip-title');
    const descElement = document.getElementById('study-tip-description');

    if (titleElement && descElement && tip) {
      this.animateTextChange(titleElement, tip.title);
      this.animateTextChange(descElement, tip.description);
    }
  }

  /**
   * Animate text changes for smooth UX
   */
  animateTextChange(element, newText) {
    if (!element) return;

    element.style.opacity = '0.5';
    element.style.transform = 'translateY(5px)';
    
    setTimeout(() => {
      element.textContent = newText;
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 150);
  }

  /**
   * Refresh motivation with new content
   */
  refreshMotivation() {
    const preferences = this.loadUserPreferences();
    const newMotivation = this.getPersonalizedMotivation(1, preferences)[0];
    
    if (newMotivation) {
      this.animateTextChange(document.getElementById('daily-motivation'), newMotivation.quote);
      this.animateTextChange(document.getElementById('motivation-context'), newMotivation.context);
      
      this.announceToScreenReader('New motivation loaded');
      this.trackEvent('motivation_refreshed');
    }
  }

  /**
   * Refresh study tip with new content
   */
  refreshStudyTip() {
    const preferences = this.loadUserPreferences();
    const newTip = this.getPersonalizedStudyTips(1, preferences)[0];
    
    if (newTip) {
      this.animateTextChange(document.getElementById('study-tip-title'), newTip.title);
      this.animateTextChange(document.getElementById('study-tip-description'), newTip.description);
      
      this.announceToScreenReader('New study tip loaded');
      this.trackEvent('study_tip_refreshed');
    }
  }

  /**
   * Start study timer (Pomodoro technique)
   */
  startStudyTimer() {
    const timerBtn = document.getElementById('start-timer');
    if (!timerBtn) return;

    const duration = 25 * 60; // 25 minutes in seconds
    let remainingTime = duration;
    
    // Update button text
    const updateTimer = () => {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      timerBtn.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      if (remainingTime > 0) {
        remainingTime--;
        setTimeout(updateTimer, 1000);
      } else {
        // Timer finished
        timerBtn.textContent = '🎉 Great job!';
        this.showNotification('Time\'s up! Take a well-deserved 5-minute break! 🎉');
        this.announceToScreenReader('Study timer completed. Time for a break!');
        
        setTimeout(() => {
          timerBtn.textContent = 'Start 25min Timer';
        }, 3000);
      }
    };
    
    updateTimer();
    this.announceToScreenReader('Study timer started for 25 minutes');
    this.trackEvent('timer_started');
  }

  /**
   * Save current tip to favorites
   */
  saveTip() {
    const tipTitle = document.getElementById('study-tip-title')?.textContent;
    const tipDesc = document.getElementById('study-tip-description')?.textContent;
    
    if (tipTitle && tipDesc) {
      const savedTips = JSON.parse(localStorage.getItem('polymotivator_saved_tips') || '[]');
      const newTip = {
        id: Date.now(),
        title: tipTitle,
        description: tipDesc,
        savedAt: new Date().toLocaleDateString()
      };
      
      savedTips.push(newTip);
      localStorage.setItem('polymotivator_saved_tips', JSON.stringify(savedTips));
      
      this.showNotification('Tip saved to your collection! 📚');
      this.announceToScreenReader('Study tip saved successfully');
      this.trackEvent('tip_saved');
    }
  }

  /**
   * Update progress statistics
   */
  updateProgress() {
    const stats = this.getProgressStats();
    
    document.getElementById('days-active').textContent = stats.daysActive;
    document.getElementById('tips-viewed').textContent = stats.tipsViewed;
    document.getElementById('motivation-streak').textContent = stats.motivationStreak;
    
    // Update achievement badge
    const latestAchievement = this.getLatestAchievement(stats);
    document.getElementById('latest-achievement').textContent = latestAchievement;
  }

  /**
   * Get progress statistics from localStorage
   */
  getProgressStats() {
    const stats = JSON.parse(localStorage.getItem('polymotivator_stats') || '{}');
    const today = new Date().toDateString();
    
    // Initialize or update stats
    if (!stats.startDate) {
      stats.startDate = today;
      stats.daysActive = 1;
      stats.tipsViewed = 0;
      stats.motivationStreak = 1;
      stats.lastVisit = today;
    } else {
      // Calculate days active
      const startDate = new Date(stats.startDate);
      const currentDate = new Date();
      const daysDiff = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
      stats.daysActive = Math.max(daysDiff + 1, stats.daysActive || 1);
      
      // Update streak
      if (stats.lastVisit !== today) {
        const lastVisit = new Date(stats.lastVisit);
        const daysSinceLastVisit = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysSinceLastVisit === 1) {
          stats.motivationStreak = (stats.motivationStreak || 0) + 1;
        } else if (daysSinceLastVisit > 1) {
          stats.motivationStreak = 1;
        }
        
        stats.lastVisit = today;
      }
    }
    
    // Save updated stats
    localStorage.setItem('polymotivator_stats', JSON.stringify(stats));
    return stats;
  }

  /**
   * Get latest achievement based on progress
   */
  getLatestAchievement(stats) {
    const achievements = [
      { threshold: 1, badge: '🏅 Welcome Badge Earned!' },
      { threshold: 3, badge: '🔥 3-Day Streak Champion!' },
      { threshold: 7, badge: '⭐ Week Warrior!' },
      { threshold: 14, badge: '💎 Two-Week Legend!' },
      { threshold: 30, badge: '🏆 Monthly Master!' }
    ];
    
    let latestAchievement = achievements[0];
    
    for (const achievement of achievements) {
      if (stats.motivationStreak >= achievement.threshold) {
        latestAchievement = achievement;
      }
    }
    
    return latestAchievement.badge;
  }

  /**
   * Quick Actions Handlers
   */
  showExamPrepChecklist() {
    this.showModal('Exam Prep Checklist', this.getExamPrepContent());
    this.trackEvent('exam_prep_viewed');
  }

  showStudyPlanner() {
    this.showModal('Study Planner', this.getStudyPlannerContent());
    this.trackEvent('study_planner_viewed');
  }

  showMoodCheckIn() {
    this.showModal('How are you feeling?', this.getMoodCheckContent());
    this.trackEvent('mood_check_viewed');
  }

  showResources() {
    this.showModal('Study Resources', this.getResourcesContent());
    this.trackEvent('resources_viewed');
  }

  /**
   * Generic modal display
   */
  showModal(title, content) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('dynamic-modal');
    if (!modal) {
      modal = this.createModal();
    }
    
    // Update content
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-body').innerHTML = content;
    
    // Show modal
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus management
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.focus();
    }
    
    this.announceToScreenReader(`${title} opened`);
  }

  /**
   * Create reusable modal element
   */
  createModal() {
    const modal = document.createElement('div');
    modal.id = 'dynamic-modal';
    modal.className = 'modal hidden';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'modal-title');
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <header class="modal-header">
          <h3 id="modal-title" class="modal-title"></h3>
          <button class="modal-close" aria-label="Close modal">&times;</button>
        </header>
        <div class="modal-body"></div>
      </div>
    `;
    
    // Add modal styles
    const styles = `
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
      }
      
      .modal-content {
        background: white;
        border-radius: var(--border-radius-xl);
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        z-index: 1;
        margin: var(--space-4);
        box-shadow: var(--shadow-xl);
      }
      
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-6);
        border-bottom: 1px solid var(--gray-200);
      }
      
      .modal-title {
        margin: 0;
        color: var(--gray-900);
      }
      
      .modal-close {
        background: none;
        border: none;
        font-size: var(--font-size-2xl);
        cursor: pointer;
        color: var(--gray-500);
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--border-radius-md);
      }
      
      .modal-close:hover {
        background: var(--gray-100);
        color: var(--gray-700);
      }
      
      .modal-body {
        padding: var(--space-6);
      }
    `;
    
    // Add styles to document if not already added
    if (!document.getElementById('modal-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'modal-styles';
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
    }
    
    // Event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => {
      this.closeModal(modal);
    });
    
    modal.querySelector('.modal-backdrop').addEventListener('click', () => {
      this.closeModal(modal);
    });
    
    document.body.appendChild(modal);
    return modal;
  }

  /**
   * Close modal
   */
  closeModal(modal) {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    this.announceToScreenReader('Modal closed');
  }

  /**
   * Content generators for quick actions
   */
  getExamPrepContent() {
    return `
      <div class="checklist">
        <h4>📚 Study Materials</h4>
        <label><input type="checkbox"> Organize notes by subject</label>
        <label><input type="checkbox"> Create summary sheets</label>
        <label><input type="checkbox"> Gather past year papers</label>
        
        <h4>📅 Time Management</h4>
        <label><input type="checkbox"> Create study timetable</label>
        <label><input type="checkbox"> Schedule practice sessions</label>
        <label><input type="checkbox"> Plan break times</label>
        
        <h4>🧠 Mental Prep</h4>
        <label><input type="checkbox"> Practice relaxation techniques</label>
        <label><input type="checkbox"> Get enough sleep</label>
        <label><input type="checkbox"> Eat brain-boosting foods</label>
        
        <style>
          .checklist h4 { margin: 1rem 0 0.5rem; color: var(--primary-color); }
          .checklist label { display: block; margin: 0.5rem 0; cursor: pointer; }
          .checklist input { margin-right: 0.5rem; }
        </style>
      </div>
    `;
  }

  getStudyPlannerContent() {
    return `
      <div class="study-planner">
        <h4>📊 Weekly Study Plan</h4>
        <div class="plan-grid">
          <div class="day">
            <strong>Monday</strong>
            <textarea placeholder="Plan your Monday studies..."></textarea>
          </div>
          <div class="day">
            <strong>Tuesday</strong>
            <textarea placeholder="Plan your Tuesday studies..."></textarea>
          </div>
          <div class="day">
            <strong>Wednesday</strong>
            <textarea placeholder="Plan your Wednesday studies..."></textarea>
          </div>
        </div>
        <button class="save-plan-btn" onclick="alert('Study plan saved! 📅')">Save Plan</button>
        
        <style>
          .plan-grid { display: grid; gap: 1rem; margin: 1rem 0; }
          .day { border: 1px solid var(--gray-200); padding: 1rem; border-radius: 8px; }
          .day textarea { width: 100%; height: 60px; border: none; resize: vertical; }
          .save-plan-btn { 
            background: var(--primary-color); 
            color: white; 
            padding: 0.5rem 1rem; 
            border: none; 
            border-radius: 6px; 
            cursor: pointer; 
          }
        </style>
      </div>
    `;
  }

  getMoodCheckContent() {
    return `
      <div class="mood-check">
        <h4>😊 How are you feeling today?</h4>
        <div class="mood-options">
          <button class="mood-btn" onclick="this.parentElement.parentElement.querySelector('.mood-response').innerHTML='🌟 That\\'s awesome! Keep that positive energy!'">😄 Amazing</button>
          <button class="mood-btn" onclick="this.parentElement.parentElement.querySelector('.mood-response').innerHTML='👍 Great! You\\'re doing well, keep it up!'">😊 Good</button>
          <button class="mood-btn" onclick="this.parentElement.parentElement.querySelector('.mood-response').innerHTML='💪 It\\'s okay to have average days. You\\'ve got this!'">😐 Okay</button>
          <button class="mood-btn" onclick="this.parentElement.parentElement.querySelector('.mood-response').innerHTML='🤗 It\\'s tough right now, but remember - this is temporary. Take care of yourself!'">😟 Not great</button>
          <button class="mood-btn" onclick="this.parentElement.parentElement.querySelector('.mood-response').innerHTML='💙 You\\'re not alone. Consider talking to someone you trust. Tomorrow can be better!'">😢 Struggling</button>
        </div>
        <div class="mood-response"></div>
        
        <style>
          .mood-options { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.5rem; margin: 1rem 0; }
          .mood-btn { 
            padding: 0.75rem; 
            border: 2px solid var(--gray-200); 
            background: white; 
            border-radius: 8px; 
            cursor: pointer; 
            transition: all 0.2s;
          }
          .mood-btn:hover { border-color: var(--primary-color); background: var(--gray-50); }
          .mood-response { margin-top: 1rem; padding: 1rem; background: var(--gray-50); border-radius: 8px; min-height: 50px; }
        </style>
      </div>
    `;
  }

  getResourcesContent() {
    const preferences = this.loadUserPreferences();
    const cluster = preferences?.courseCluster || 'general';
    
    return `
      <div class="resources">
        <h4>📖 Study Resources for ${cluster.charAt(0).toUpperCase() + cluster.slice(1)}</h4>
        <div class="resource-list">
          <div class="resource-item">
            <strong>📚 Online Libraries</strong>
            <p>Access free textbooks and research materials</p>
            <a href="#" onclick="alert('Opening library resources...')">Explore Now</a>
          </div>
          <div class="resource-item">
            <strong>🎥 Video Tutorials</strong>
            <p>Visual learning with expert explanations</p>
            <a href="#" onclick="alert('Opening video resources...')">Watch Now</a>
          </div>
          <div class="resource-item">
            <strong>📝 Practice Tests</strong>
            <p>Test your knowledge with interactive quizzes</p>
            <a href="#" onclick="alert('Opening practice tests...')">Start Testing</a>
          </div>
          <div class="resource-item">
            <strong>👥 Study Groups</strong>
            <p>Connect with fellow students in your field</p>
            <a href="#" onclick="alert('Opening study groups...')">Join Groups</a>
          </div>
        </div>
        
        <style>
          .resource-list { display: grid; gap: 1rem; margin: 1rem 0; }
          .resource-item { 
            border: 1px solid var(--gray-200); 
            padding: 1rem; 
            border-radius: 8px; 
            background: var(--gray-50);
          }
          .resource-item strong { color: var(--primary-color); }
          .resource-item p { margin: 0.5rem 0; color: var(--gray-600); }
          .resource-item a { 
            color: var(--primary-color); 
            text-decoration: none; 
            font-weight: 500;
          }
          .resource-item a:hover { text-decoration: underline; }
        </style>
      </div>
    `;
  }

  /**
   * Content Database Initialization
   */
  initializeMotivationContent() {
    return {
      general: [
        {
          quote: "Every expert was once a beginner. You've got this! 🎯",
          context: "Remember: Your polytechnic journey is unique. Focus on your own progress, not comparing yourself to others."
        },
        {
          quote: "Small progress is still progress. Keep moving forward! ⭐",
          context: "Even 15 minutes of study today is better than none. Consistency beats perfection every time."
        },
        {
          quote: "Your future self will thank you for the effort you put in today! 💪",
          context: "Think about where you want to be in 2 years. Every study session gets you closer to that goal."
        }
      ],
      engineering: [
        {
          quote: "Great engineers aren't born, they're built through curiosity and persistence! ⚙️",
          context: "Every coding error and failed circuit is a learning opportunity. Embrace the problem-solving process!"
        },
        {
          quote: "Innovation starts with imagination. Dream big, engineer bigger! 🚀",
          context: "The technology you're learning today could change tomorrow's world. Your ideas matter!"
        }
      ],
      business: [
        {
          quote: "Leaders aren't made overnight, but every day of learning counts! 💼",
          context: "Business skills are like muscles - they grow stronger with practice. Start building your leadership mindset now!"
        },
        {
          quote: "Your ideas have power. Business is about turning ideas into impact! 💡",
          context: "Every successful entrepreneur started as a student. Your business journey begins with your education."
        }
      ],
      design: [
        {
          quote: "Creativity is intelligence having fun! Let your imagination soar! 🎨",
          context: "Every design starts with a blank canvas. Your unique perspective is what makes your work special."
        },
        {
          quote: "Good design is good communication. Your art tells stories! 📱",
          context: "Design isn't just about making things pretty - it's about solving problems and connecting with people."
        }
      ],
      health: [
        {
          quote: "Caring for others starts with caring for your own growth! 🏥",
          context: "Healthcare heroes are made through dedication and compassion. Every lesson brings you closer to helping others."
        },
        {
          quote: "Your future patients are counting on the knowledge you're building today! ❤️",
          context: "The human touch in healthcare can't be replaced. Your empathy combined with knowledge will make a difference."
        }
      ]
    };
  }

  initializeStudyTipsContent() {
    return {
      visual: [
        {
          title: "Color-Code Your Notes",
          description: "Use different colors for different subjects or concepts. Try blue for definitions, green for examples, and red for important points! 🌈"
        },
        {
          title: "Mind Map Magic",
          description: "Create visual mind maps to connect ideas. Start with a main concept in the center and branch out. It's like creating art while you learn! 🧠"
        }
      ],
      'hands-on': [
        {
          title: "Teach Someone Else",
          description: "Explain what you learned to a friend, family member, or even your pet! If you can teach it, you truly understand it. 🗣️"
        },
        {
          title: "Create Study Models",
          description: "Build physical models or use everyday objects to represent concepts. Learning through doing sticks better! 🔧"
        }
      ],
      social: [
        {
          title: "Form a Study Squad",
          description: "Team up with classmates for regular study sessions. You can quiz each other, share notes, and keep everyone motivated! 👥"
        },
        {
          title: "Online Study Groups",
          description: "Join online communities related to your subjects. Discussing concepts with peers worldwide opens new perspectives! 🌐"
        }
      ],
      structured: [
        {
          title: "The 25-5 Rule",
          description: "Study for 25 minutes, then take a 5-minute break. Your brain will thank you! Try listening to your favorite song during breaks. 🎵"
        },
        {
          title: "Weekly Planning Ritual",
          description: "Every Sunday, plan your study schedule for the week. Include specific topics, times, and even reward breaks. Structure = Success! 📅"
        }
      ]
    };
  }

  initializeConfidenceMessages() {
    return {
      1: "It's totally normal to feel nervous! Every great journey starts with a single step. You're braver than you think! 🌱",
      2: "You're building confidence! Remember, even small progress deserves celebration. Keep going! 🌟",
      3: "You're doing great! This balanced confidence will take you far. Trust the process! 😊",
      4: "Look at that confidence! You're ready to tackle challenges head-on. Your positive attitude is your superpower! 🚀",
      5: "Wow! That confidence is contagious! Channel that energy into your studies and watch amazing things happen! ⚡"
    };
  }

  /**
   * Personalization Logic
   */
  getPersonalizedMotivation(count = 1, preferences = null) {
    const prefs = preferences || this.loadUserPreferences();
    const cluster = prefs?.courseCluster || 'general';
    
    const motivations = [
      ...this.motivationContent.general,
      ...(this.motivationContent[cluster] || [])
    ];
    
    return this.getRandomItems(motivations, count);
  }

  getPersonalizedStudyTips(count = 1, preferences = null) {
    const prefs = preferences || this.loadUserPreferences();
    const learningStyle = prefs?.learningStyle || 'structured';
    
    const tips = this.studyTipsContent[learningStyle] || this.studyTipsContent.structured;
    return this.getRandomItems(tips, count);
  }

  getConfidenceMessage(level) {
    return this.confidenceMessages[level] || this.confidenceMessages[3];
  }


  getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  /**
   * Utility Functions
   */
  showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.classList.remove('hidden');
    }
  }

  hideSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.classList.add('hidden');
    }
  }

  showLoading(message = 'Loading...') {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.querySelector('.loading-text').textContent = message;
      loading.classList.remove('hidden');
    }
  }

  hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.classList.add('hidden');
    }
  }

  showNotification(message) {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--success-color);
      color: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => {
        document.body.removeChild(notification);
        document.head.removeChild(style);
      }, 300);
    }, 3000);
  }

  showValidationError(message) {
    this.showNotification(`⚠️ ${message}`);
  }

  /**
   * Data Persistence
   */
  saveUserPreferences(preferences) {
    localStorage.setItem('polymotivator_preferences', JSON.stringify(preferences));
    this.userPreferences = preferences;
  }

  loadUserPreferences() {
    if (!this.userPreferences) {
      const stored = localStorage.getItem('polymotivator_preferences');
      this.userPreferences = stored ? JSON.parse(stored) : null;
    }
    return this.userPreferences;
  }

  

  checkUserPreferences() {
    const preferences = this.loadUserPreferences();
    if (preferences) {
      // User has completed onboarding, show dashboard
      const onboarding = document.getElementById('onboarding');
      const dashboard = document.getElementById('dashboard');
      
      if (onboarding && dashboard) {
        this.hideSection('onboarding');
        this.showSection('dashboard');
        this.showPersonalizedDashboard(preferences);
      }
    } else {
      // No preferences, show onboarding
      const onboarding = document.getElementById('onboarding');
      if (onboarding) {
        this.showSection('onboarding');
      }
    }
  }

  /**
   * Performance Utilities
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  handleResize() {
    // Handle responsive adjustments if needed
    console.log('Window resized, checking responsive elements...');
  }

  /**
   * Analytics & Tracking
   */
  trackEvent(eventName, data = {}) {
    // Simple event tracking - could be integrated with analytics services
    const event = {
      name: eventName,
      timestamp: Date.now(),
      data: data,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    console.log('📊 Event tracked:', event);
    
    // Store in localStorage for basic analytics
    const events = JSON.parse(localStorage.getItem('polymotivator_events') || '[]');
    events.push(event);
    
    // Keep only last 100 events to prevent storage bloat
    if (events.length > 100) {
      events.splice(0, events.length - 100);
    }
    
    localStorage.setItem('polymotivator_events', JSON.stringify(events));
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.polyMotivator = new PolyMotivator();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PolyMotivator;
}