/**
 * CEO Digital Twin - Interactive Website
 * JavaScript for animations and interactivity
 */

// Store loaded Q&A data
let qaData = {
    spec1: null,
    spec2: null,
    spec3: null,
    spec4: null
};
let currentQAIndex = 0;
let currentSpec = 'spec4';

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initScrollAnimations();
    initNavHighlight();
    initBarChartAnimations();
    initQABrowser();
});

/**
 * Tab switching for results section
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // Update button states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update panel visibility
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab) {
                    panel.classList.add('active');
                    
                    // Trigger bar chart animations when tab becomes visible
                    if (targetTab === 'semantic') {
                        animateBars();
                    } else if (targetTab === 'tone') {
                        animateToneBars();
                    }
                }
            });
        });
    });
}

/**
 * Scroll-based reveal animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for bar charts
                if (entry.target.classList.contains('bar-chart')) {
                    animateBars();
                }
                
                // Special handling for tone chart
                if (entry.target.classList.contains('tone-chart')) {
                    animateToneBars();
                }
            }
        });
    }, observerOptions);

    // Observe animated elements
    const animatedElements = document.querySelectorAll(
        '.spec-card, .finding-card, .takeaway, .team-member, ' +
        '.flow-step, .answer-card, .persona-section, .bar-chart, .tone-chart'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Navigation active state based on scroll position
 */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // Add active nav link styles
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: var(--color-accent-primary);
        }
    `;
    document.head.appendChild(style);
}

/**
 * Animate bar chart values
 */
function animateBars() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        const value = bar.style.getPropertyValue('--value');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = value;
        }, 100);
    });
}

/**
 * Animate tone chart bars
 */
function animateToneBars() {
    const toneBars = document.querySelectorAll('.tone-bar');
    toneBars.forEach(bar => {
        const height = bar.style.getPropertyValue('--height');
        bar.style.height = '0%';
        setTimeout(() => {
            bar.style.height = height;
        }, 100);
    });
}

/**
 * Initialize bar chart animations on load
 */
function initBarChartAnimations() {
    // Animate bars when they come into view
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('bar-chart')) {
                    animateBars();
                }
                if (entry.target.classList.contains('tone-chart')) {
                    animateToneBars();
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.bar-chart, .tone-chart').forEach(chart => {
        chartObserver.observe(chart);
    });
}

/**
 * Smooth scroll for navigation links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * Add parallax effect to hero orbs
 */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = index === 0 ? 0.3 : 0.2;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

/**
 * Add typing effect to hero title (optional enhancement)
 */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/**
 * Counter animation for stats
 */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * Initialize stat counters on scroll
 */
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const value = stat.textContent;
                // Only animate numeric values
                if (!isNaN(parseFloat(value))) {
                    if (value.includes('.')) {
                        // Handle decimal values like 0.81
                        const numValue = parseFloat(value);
                        animateDecimalCounter(stat, numValue);
                    } else {
                        // Handle integer values
                        animateCounter(stat, parseInt(value));
                    }
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

function animateDecimalCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toFixed(2);
            clearInterval(timer);
        } else {
            element.textContent = current.toFixed(2);
        }
    }, 16);
}

// Observe hero stats section
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

/**
 * Add hover effects to specification cards
 */
document.querySelectorAll('.spec-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

/**
 * Mobile menu toggle (if needed for responsive)
 */
function initMobileMenu() {
    const nav = document.querySelector('.nav');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '☰';
    menuButton.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: var(--color-text-primary);
        font-size: 1.5rem;
        cursor: pointer;
    `;

    // Add responsive styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            .nav-links {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--color-bg-primary);
                flex-direction: column;
                padding: var(--space-lg);
                gap: var(--space-md);
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }
            .nav-links.open {
                display: flex !important;
            }
        }
    `;
    document.head.appendChild(style);

    const navContainer = document.querySelector('.nav-container');
    navContainer.appendChild(menuButton);

    menuButton.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('open');
    });
}

// Initialize mobile menu
initMobileMenu();

/**
 * Initialize Q&A Browser
 */
async function initQABrowser() {
    const specSelect = document.getElementById('spec-select');
    const prevBtn = document.getElementById('prev-qa');
    const nextBtn = document.getElementById('next-qa');
    
    if (!specSelect) return;

    // Load initial spec data
    await loadSpecData('spec4');
    displayQA();

    // Event listeners
    specSelect.addEventListener('change', async (e) => {
        currentSpec = e.target.value;
        currentQAIndex = 0;
        if (!qaData[currentSpec]) {
            await loadSpecData(currentSpec);
        }
        displayQA();
    });

    prevBtn.addEventListener('click', () => {
        if (currentQAIndex > 0) {
            currentQAIndex--;
            displayQA();
        }
    });

    nextBtn.addEventListener('click', () => {
        const data = qaData[currentSpec];
        if (data && currentQAIndex < data.results.length - 1) {
            currentQAIndex++;
            displayQA();
        }
    });
}

/**
 * Load specification data from JSON
 */
async function loadSpecData(spec) {
    const fileMap = {
        'spec1': 'Results/spec1_random_500_20251110_180802.json',
        'spec2': 'Results/spec2_recent_500_20251110_181330.json',
        'spec3': 'Results/spec3_recent_500_plus_10q_20251110_182010.json',
        'spec4': 'Results/spec4_persona_plus_10q_20251110_182428.json'
    };

    try {
        const response = await fetch(fileMap[spec]);
        qaData[spec] = await response.json();
    } catch (error) {
        console.error('Error loading spec data:', error);
        // Fallback to embedded data if fetch fails
        qaData[spec] = getFallbackData(spec);
    }
}

/**
 * Display current Q&A pair
 */
function displayQA() {
    const container = document.getElementById('qa-display');
    const counter = document.getElementById('qa-counter');
    const data = qaData[currentSpec];
    
    if (!data || !container) return;

    const qa = data.results[currentQAIndex];
    const total = data.results.length;
    
    counter.textContent = `${currentQAIndex + 1} / ${total}`;

    const specNames = {
        'spec1': 'Spec 1: Random 500',
        'spec2': 'Spec 2: Recent 500',
        'spec3': 'Spec 3: Recent + 10-Q',
        'spec4': 'Spec 4: Persona + 10-Q'
    };

    container.innerHTML = `
        <div class="comparison-header">
            <h3>${qa.quarter} Earnings Call</h3>
            <p class="comparison-meta">${qa.date} | Analyst: ${qa.analyst}</p>
        </div>
        <div class="comparison-question">
            <div class="question-header">
                <span class="speaker-badge analyst">Analyst Question</span>
            </div>
            <p>"${escapeHtml(qa.question)}"</p>
        </div>
        
        <div class="comparison-answers">
            <div class="answer-card real">
                <div class="answer-header">
                    <span class="answer-badge">Real Jamie Dimon</span>
                    <span class="answer-icon">👤</span>
                </div>
                <p>${escapeHtml(truncateText(qa.ground_truth_answer, 600))}</p>
                <div class="answer-meta">
                    <span class="word-count">${countWords(qa.ground_truth_answer)} words</span>
                </div>
            </div>
            
            <div class="answer-card generated">
                <div class="answer-header">
                    <span class="answer-badge">AI Digital Twin (${specNames[currentSpec]})</span>
                    <span class="answer-icon">🤖</span>
                </div>
                <p>${escapeHtml(truncateText(qa.generated_answer, 600))}</p>
                <div class="answer-meta">
                    <span class="word-count">${countWords(qa.generated_answer)} words</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Helper functions
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function countWords(text) {
    return text.split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Fallback data if JSON files can't be loaded
 */
function getFallbackData(spec) {
    return {
        results: [
            {
                test_id: 0,
                quarter: "2025Q1",
                date: "April 11 2025",
                analyst: "Erika Najarian",
                question: "Jamie, you were on the media today talking about potential economic turbulence, but Jeremy also mentioned that banking should be -- the banking system should be a source of strength in this turbulence. Can you double-click on how you think this is going to impact the economy going forward?",
                ground_truth_answer: "Everyone trades stocks in a different way. So, sentiment -- but banks are a cork in the ocean when it comes to the economy. If the economy gets worse, credit loss will go up, volumes can change, yield curve can change, and we're not predicting all of that. What I would say is our excellent economist, Michael Feroli, I called him this morning, specifically to ask him with -- how they're looking at their forecast today. They think it's about 50-50 for recession, so I'll just refer to that.",
                generated_answer: "Good morning. Thanks for the question. Let me start by acknowledging the current economic landscape. We're in a period of significant uncertainty, and it's natural for markets to react with sentiment-driven volatility. That said, I firmly believe that the banking system, particularly institutions like JPMorgan Chase, is well-positioned to be a pillar of strength during these times. Our capital position is robust—our 'capital cup runneth over,' if you will."
            }
        ]
    };
}

console.log('🎯 CEO Digital Twin website loaded successfully');

