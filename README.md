# PolyMotivator 🎯

> Keep students focused, confident, and exam-ready with dynamic motivation tips and personalised study guidance after they receive their diploma recommendations.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue)](https://github.com/OsmanWu/C240-Project)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Made for Singapore Students](https://img.shields.io/badge/Made%20for-Singapore%20Students-red.svg)](https://www.moe.gov.sg/)

## 🌟 Overview

PolyMotivator creates value by helping O/N-Level and ITE students (ages 16–19) stay emotionally supported and practically guided after choosing potential diplomas. It delivers tailored motivation messages, study strategies, and preparation checklists based on their interests, strengths, and selected course pathways from the AI Polytechnic Course Guidance Bot, making the transition to polytechnic less stressful and more goal-driven.

## ✨ Features

### 🎯 Personalized Experience
- **Smart Onboarding:** 3-step personalization based on course cluster, learning style, and confidence level
- **Dynamic Content:** Real-time personalized motivation and study tips
- **Progress Tracking:** Achievement badges and streak counters to maintain engagement

### 📚 Study Support
- **Learning Style Adaptation:** Content tailored for visual, hands-on, social, and structured learners
- **Pomodoro Timer:** Built-in 25-minute study timer with break reminders
- **Study Resources:** Curated resources based on chosen polytechnic cluster
- **Tip Library:** Save favorite study tips for quick reference

### 🚀 Motivation System
- **Daily Motivation:** Fresh, personalized motivational quotes and context
- **Course-Specific Content:** Tailored messages for Engineering, Business, Design & Media, and Health Sciences
- **Confidence Building:** Adaptive messaging based on self-reported confidence levels
- **Achievement System:** Gamified progress tracking with meaningful milestones

### ♿ Accessibility & UX
- **Full Keyboard Navigation:** Complete accessibility support
- **Screen Reader Optimized:** ARIA labels and live regions for assistive technology
- **Responsive Design:** Mobile-first approach supporting all device sizes
- **Performance Optimized:** Lazy loading, debounced events, and smooth animations
- **Offline-First:** Local storage for preferences and progress tracking

## 🚦 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- [Live Server VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/OsmanWu/C240-Project.git
   cd C240-Project/PolyMotivator
   ```

2. **Open with Live Server**
   - Open the project folder in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Visit `http://localhost:5500`

3. **Or open directly**
   - Simply open `index.html` in your web browser
   - All functionality works without a server setup

## 📁 Project Structure

```
PolyMotivator/
├── index.html              # Main HTML5 application
├── css/
│   └── styles.css          # Complete CSS with design system
├── js/
│   └── app.js              # JavaScript application logic
├── assets/                 # Static assets (images, icons)
├── .vscode/
│   └── settings.json       # Live Server configuration
├── .gitignore             # Git ignore rules
├── CONTENT_STRATEGY.md    # Content guidelines and examples
└── README.md              # This file
```

## 🎨 Design System

### Color Palette
- **Primary:** `#4F46E5` (Indigo - confidence & focus)
- **Secondary:** `#06B6D4` (Cyan - fresh & optimistic) 
- **Accent:** `#F59E0B` (Amber - energy & achievement)
- **Success:** `#10B981` (Green - positive feedback)

### Typography
- **Font Family:** Inter (web font)
- **Responsive Scale:** From 12px to 36px with proper line heights
- **Accessibility:** Minimum 16px base size, high contrast ratios

### Design Principles
- **Calming but Energetic:** Reduces anxiety while maintaining motivation
- **Age-Appropriate:** Modern design that resonates with 16-19 year olds
- **Non-Preachy:** Supportive tone without condescension
- **Culturally Relevant:** Singapore education context integration

## 🔧 Technical Features

### Performance Optimizations
- **Debounced Events:** Smooth interaction handling
- **Lazy Loading:** Images load only when needed
- **Local Storage:** Persistent user preferences and progress
- **Animation Frames:** Smooth, performant animations
- **Minimal Dependencies:** Vanilla JavaScript for fast loading

### JavaScript Architecture
```javascript
class PolyMotivator {
  // Personalization engine
  getPersonalizedMotivation(preferences)
  getPersonalizedStudyTips(learningStyle)
  
  // User experience
  handleOnboarding()
  trackProgress()
  
  // Accessibility
  announceToScreenReader(message)
  trapFocus(element)
  handleKeyboardNavigation()
}
```

### Accessibility Features
- **WCAG 2.1 AA Compliant:** Meets international accessibility standards
- **Keyboard Navigation:** Full functionality without mouse
- **Screen Reader Support:** Proper ARIA labels and live regions
- **Focus Management:** Logical tab order and focus trapping
- **High Contrast Support:** Adapts to user preference settings
- **Reduced Motion:** Respects user motion preferences

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|---------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Mobile Safari | iOS 14+ | ✅ Fully Supported |
| Chrome Mobile | Android 90+ | ✅ Fully Supported |

## 🎯 Content Strategy

### Tone of Voice
- **Supportive Friend:** Like a caring older sibling who's been through it all
- **Genuine Encourager:** Authentic positivity without toxic positivity
- **Practical Guide:** Helpful without being preachy or condescending
- **Relatable Peer:** Uses age-appropriate language and cultural references

### Personalization Factors
1. **Course Cluster:** Engineering, Business, Design & Media, Health Sciences
2. **Learning Style:** Visual, Hands-On, Social, Structured
3. **Confidence Level:** 1-5 scale with adaptive messaging
4. **Progress:** Days active, tips viewed, achievement streaks

See [CONTENT_STRATEGY.md](CONTENT_STRATEGY.md) for detailed guidelines.

## 🧪 Testing & Quality

### Manual Testing Checklist
- [ ] Complete onboarding flow for each course cluster
- [ ] Test all learning style variations
- [ ] Verify keyboard navigation works completely
- [ ] Test with screen reader (NVDA/JAWS/VoiceOver)
- [ ] Mobile responsiveness across devices
- [ ] Performance testing with slow 3G simulation
- [ ] Local storage persistence across sessions

### Performance Metrics
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms
- **Lighthouse Score:** 90+ across all categories

## 🚀 Deployment

### GitHub Pages (Recommended)
1. Push code to GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main` or `master`)
4. Visit your GitHub Pages URL

### Alternative Hosting
- **Netlify:** Drag and drop deployment
- **Vercel:** Git integration with automatic deployments
- **Surge.sh:** Simple command-line deployment
- **Firebase Hosting:** Google's static hosting solution

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Content Contributions
- Improve motivational messages for different course clusters
- Add study tips for various learning styles
- Enhance accessibility features
- Translate content for different languages

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Reporting Issues
- Use GitHub Issues for bug reports
- Include browser version and device information
- Provide steps to reproduce the issue
- Screenshots are always helpful

## 📊 Analytics & Privacy

### Local Analytics
- User progress stored locally (no external tracking)
- Usage patterns for improving content delivery
- Performance metrics for optimization
- No personal data collection or sharing

### Privacy-First Design
- All data stays on user's device
- No cookies or external tracking
- No user accounts or registration required
- Full data portability through local storage

## 📚 Educational Context

### Singapore Education System
- **Target Students:** Post O/N-Level, pre-polytechnic
- **Age Range:** 16-19 years old
- **Cultural Context:** High academic pressure environment
- **Transition Support:** Bridge between secondary and tertiary education

### Pedagogical Approach
- **Scaffolded Learning:** Gradual complexity increase
- **Metacognitive Support:** Learning how to learn
- **Emotional Intelligence:** Anxiety management and confidence building
- **Self-Directed Learning:** Encouraging autonomy and responsibility

## 🔮 Future Enhancements

### Planned Features
- [ ] **Study Group Matching:** Connect students with similar goals
- [ ] **Progress Sharing:** Optional achievement sharing with friends
- [ ] **Offline Mode:** Full functionality without internet
- [ ] **Voice Interactions:** Audio motivation and study guidance
- [ ] **Integration APIs:** Connect with popular study apps
<!-- Chatbot feature removed -->

### Technical Improvements
- [ ] **Progressive Web App:** Native app-like experience
- [ ] **Push Notifications:** Study reminders and motivation
- [ ] **Advanced Analytics:** Detailed learning pattern analysis
- [ ] **Accessibility Extensions:** Even better screen reader support
- [ ] **Multi-language Support:** Mandarin, Malay, Tamil translations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Singapore Ministry of Education** for polytechnic pathway information
- **Inter Font Family** by Rasmus Andersson
- **VS Code Live Server** extension for development workflow
- **Web Content Accessibility Guidelines (WCAG)** for accessibility standards
- **Singapore students** who inspired this project

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/OsmanWu/C240-Project/issues)
- **Discussions:** [GitHub Discussions](https://github.com/OsmanWu/C240-Project/discussions)
- **Email:** Contact through GitHub profile

---

**Made with 💜 for Singapore students. You've got this!**

*PolyMotivator - Turning anxiety into achievement, one personalized tip at a time.*