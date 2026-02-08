// Learn Fun App - Math & Reading Adventures!

// Sound Manager - generates sounds using Web Audio API
class SoundManager {
    constructor() {
        this.enabled = true;
        this.audioContext = null;
    }

    init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    playCorrect() {
        if (!this.enabled) return;
        this.init();
        this.playTone([523.25, 659.25, 783.99], 0.15, 'sine');
    }

    playIncorrect() {
        if (!this.enabled) return;
        this.init();
        this.playTone([200, 180], 0.2, 'sawtooth');
    }

    playClick() {
        if (!this.enabled) return;
        this.init();
        this.playTone([800], 0.05, 'sine');
    }

    playSuccess() {
        if (!this.enabled) return;
        this.init();
        const notes = [523.25, 587.33, 659.25, 783.99, 1046.5];
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone([freq], 0.15, 'sine'), i * 100);
        });
    }

    playTimerWarning() {
        if (!this.enabled) return;
        this.init();
        this.playTone([440], 0.1, 'square');
    }

    playGameOver() {
        if (!this.enabled) return;
        this.init();
        this.playTone([392, 349.23, 329.63], 0.3, 'sine');
    }

    playTone(frequencies, duration, type) {
        if (!this.audioContext) return;

        frequencies.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = freq;
            oscillator.type = type;

            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

            oscillator.start(this.audioContext.currentTime + (index * 0.05));
            oscillator.stop(this.audioContext.currentTime + duration + (index * 0.05));
        });
    }

    speakWord(word) {
        if (!this.enabled) return;
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.rate = 0.8;
            utterance.pitch = 1.1;
            speechSynthesis.speak(utterance);
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

// Math Level Settings
const MATH_LEVEL_SETTINGS = {
    1: {
        label: 'Level 1',
        description: 'Numbers to 20',
        maxNumber: 20,
        bonds: { targetSum: 10, maxNum: 10 },
        addition: { maxNum1: 10, maxSum: 20 },
        subtraction: { maxMinuend: 10, maxSubtract: 10 }
    },
    2: {
        label: 'Level 2',
        description: 'Numbers to 50',
        maxNumber: 50,
        bonds: { targetSum: 10, maxNum: 10 },
        addition: { maxNum1: 30, maxSum: 50 },
        subtraction: { maxMinuend: 50, maxSubtract: 30 }
    },
    3: {
        label: 'Level 3',
        description: 'Numbers to 100',
        maxNumber: 100,
        bonds: { targetSum: 10, maxNum: 10 },
        addition: { maxNum1: 50, maxSum: 99 },
        subtraction: { maxMinuend: 99, maxSubtract: 50 }
    }
};

// Difficulty settings (within each level)
const DIFFICULTY_SETTINGS = {
    easy: {
        label: 'Easy',
        answerChoices: 3,
        timerSeconds: 90,
        problemsPerRound: 8
    },
    medium: {
        label: 'Medium',
        answerChoices: 4,
        timerSeconds: 60,
        problemsPerRound: 10
    },
    hard: {
        label: 'Hard',
        answerChoices: 5,
        timerSeconds: 45,
        problemsPerRound: 15
    }
};

// Sight Words by Level (Dolch + Fry combined)
const SIGHT_WORDS = {
    1: ['the', 'and', 'a', 'to', 'is', 'in', 'it', 'you', 'that', 'he', 'she', 'was', 'for', 'on', 'are', 'as', 'with', 'his', 'they', 'I', 'at', 'be', 'this', 'have', 'from'],
    2: ['or', 'one', 'had', 'by', 'word', 'but', 'not', 'what', 'all', 'were', 'we', 'when', 'your', 'can', 'said', 'there', 'use', 'an', 'each', 'which', 'do', 'how', 'their', 'if', 'will'],
    3: ['up', 'other', 'about', 'out', 'many', 'then', 'them', 'these', 'so', 'some', 'her', 'would', 'make', 'like', 'him', 'into', 'time', 'has', 'look', 'two', 'more', 'write', 'go', 'see', 'number']
};

// Picture Words for matching (word + emoji)
const PICTURE_WORDS = {
    1: [
        { word: 'cat', emoji: '🐱' },
        { word: 'dog', emoji: '🐕' },
        { word: 'sun', emoji: '☀️' },
        { word: 'moon', emoji: '🌙' },
        { word: 'star', emoji: '⭐' },
        { word: 'fish', emoji: '🐟' },
        { word: 'bird', emoji: '🐦' },
        { word: 'tree', emoji: '🌳' },
        { word: 'apple', emoji: '🍎' },
        { word: 'ball', emoji: '⚽' }
    ],
    2: [
        { word: 'house', emoji: '🏠' },
        { word: 'car', emoji: '🚗' },
        { word: 'book', emoji: '📕' },
        { word: 'flower', emoji: '🌸' },
        { word: 'rain', emoji: '🌧️' },
        { word: 'snow', emoji: '❄️' },
        { word: 'cake', emoji: '🎂' },
        { word: 'baby', emoji: '👶' },
        { word: 'hand', emoji: '✋' },
        { word: 'heart', emoji: '❤️' }
    ],
    3: [
        { word: 'rainbow', emoji: '🌈' },
        { word: 'butterfly', emoji: '🦋' },
        { word: 'elephant', emoji: '🐘' },
        { word: 'airplane', emoji: '✈️' },
        { word: 'rocket', emoji: '🚀' },
        { word: 'dragon', emoji: '🐉' },
        { word: 'unicorn', emoji: '🦄' },
        { word: 'pizza', emoji: '🍕' },
        { word: 'guitar', emoji: '🎸' },
        { word: 'camera', emoji: '📷' }
    ]
};

class LearnFunApp {
    constructor() {
        // Current subject and state
        this.currentSubject = 'math'; // 'math' or 'reading'
        this.mathLevel = 1;
        this.readingLevel = 1;
        this.difficulty = 'easy';

        // Math game state
        this.currentMode = null;
        this.currentProblem = 0;
        this.totalProblems = 10;
        this.correctAnswers = 0;
        this.currentAnswer = null;
        this.problems = [];
        this.isTimerMode = false;
        this.timerInterval = null;
        this.timeRemaining = 60;

        // Reading game state
        this.readingMode = null;
        this.currentWord = null;
        this.words = [];

        // Sound manager
        this.sound = new SoundManager();

        // Stats (persisted)
        this.stats = this.loadStats();
        this.sessions = this.loadSessions();
        this.currentSessionStats = null;
        this.sessionStartTime = null;

        // DOM Elements
        this.screens = {
            home: document.getElementById('home-screen'),
            mathMenu: document.getElementById('math-menu-screen'),
            readingMenu: document.getElementById('reading-menu-screen'),
            game: document.getElementById('game-screen'),
            readingGame: document.getElementById('reading-game-screen'),
            results: document.getElementById('results-screen'),
            dashboard: document.getElementById('dashboard-screen'),
            guide: document.getElementById('guide-screen')
        };

        this.elements = {
            starsCount: document.getElementById('stars-count'),
            streakCount: document.getElementById('streak-count'),
            correctCount: document.getElementById('correct-count'),
            totalCount: document.getElementById('total-count'),
            gameModeTitle: document.getElementById('game-mode-title'),
            tenFrame: document.getElementById('ten-frame'),
            tenFrameContainer: document.getElementById('ten-frame-container'),
            placeValueContainer: document.getElementById('place-value-container'),
            pvTens: document.getElementById('pv-tens'),
            pvOnes: document.getElementById('pv-ones'),
            num1: document.getElementById('num1'),
            operator: document.getElementById('operator'),
            num2: document.getElementById('num2'),
            result: document.getElementById('result'),
            answers: document.getElementById('answers'),
            feedback: document.getElementById('feedback'),
            progressFill: document.getElementById('progress-fill'),
            currentProblem: document.getElementById('current-problem'),
            totalProblemsEl: document.getElementById('total-problems'),
            trophies: document.getElementById('trophies'),
            confetti: document.getElementById('confetti'),
            timerDisplay: document.getElementById('timer-display'),
            timerValue: document.getElementById('timer-value'),
            timerResult: document.getElementById('timer-result'),
            resultTime: document.getElementById('result-time'),
            soundToggle: document.getElementById('sound-toggle'),
            // Reading elements
            readingModeTitle: document.getElementById('reading-mode-title'),
            wordCard: document.getElementById('word-card'),
            displayWord: document.getElementById('display-word'),
            readingAnswers: document.getElementById('reading-answers'),
            readingFeedback: document.getElementById('reading-feedback'),
            readingProgressFill: document.getElementById('reading-progress-fill'),
            readingCurrentProblem: document.getElementById('reading-current-problem'),
            readingTotalProblems: document.getElementById('reading-total-problems'),
            pictureContainer: document.getElementById('picture-container'),
            pictureDisplay: document.getElementById('picture-display'),
            spellingContainer: document.getElementById('spelling-container'),
            spellingInput: document.getElementById('spelling-input'),
            readingTimerDisplay: document.getElementById('reading-timer-display'),
            readingTimerValue: document.getElementById('reading-timer-value')
        };

        this.init();
    }

    init() {
        this.initTenFrame();
        this.bindEvents();
        this.updateStatsDisplay();
        this.renderTrophies();
        this.loadSettings();
        this.updateMathMenuForLevel();
    }

    // Initialize ten frame cells
    initTenFrame() {
        if (this.elements.tenFrame) {
            this.elements.tenFrame.innerHTML = '';
            for (let i = 0; i < 10; i++) {
                const cell = document.createElement('div');
                cell.className = 'ten-frame-cell';
                cell.dataset.index = i;
                this.elements.tenFrame.appendChild(cell);
            }
        }
    }

    // Load stats from localStorage
    loadStats() {
        const saved = localStorage.getItem('learnFunStats');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            stars: 0,
            streak: 0,
            bestStreak: 0,
            totalCorrect: 0,
            totalAttempted: 0,
            trophies: [],
            bestTimerScore: 0,
            math: {
                bonds: { correct: 0, attempted: 0 },
                addition: { correct: 0, attempted: 0 },
                subtraction: { correct: 0, attempted: 0 }
            },
            reading: {
                sightWords: { correct: 0, attempted: 0 },
                wordMatch: { correct: 0, attempted: 0 },
                spelling: { correct: 0, attempted: 0 }
            }
        };
    }

    loadSessions() {
        const saved = localStorage.getItem('learnFunSessions');
        return saved ? JSON.parse(saved) : [];
    }

    saveSessions() {
        const recentSessions = this.sessions.slice(-50);
        localStorage.setItem('learnFunSessions', JSON.stringify(recentSessions));
    }

    saveStats() {
        localStorage.setItem('learnFunStats', JSON.stringify(this.stats));
    }

    loadSettings() {
        const saved = localStorage.getItem('learnFunSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            this.difficulty = settings.difficulty || 'easy';
            this.mathLevel = settings.mathLevel || 1;
            this.readingLevel = settings.readingLevel || 1;
            this.sound.enabled = settings.soundEnabled !== false;
        }
        this.updateSettingsUI();
    }

    saveSettings() {
        localStorage.setItem('learnFunSettings', JSON.stringify({
            difficulty: this.difficulty,
            mathLevel: this.mathLevel,
            readingLevel: this.readingLevel,
            soundEnabled: this.sound.enabled
        }));
    }

    updateSettingsUI() {
        // Update difficulty buttons
        document.querySelectorAll('.diff-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.difficulty === this.difficulty);
        });

        // Update math level buttons
        document.querySelectorAll('#math-level-buttons .level-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.level) === this.mathLevel);
        });

        // Update reading level buttons
        document.querySelectorAll('#reading-level-buttons .level-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.level) === this.readingLevel);
        });

        // Update sound toggle
        if (this.elements.soundToggle) {
            this.elements.soundToggle.textContent = this.sound.enabled ? '🔊 On' : '🔇 Off';
            this.elements.soundToggle.classList.toggle('off', !this.sound.enabled);
        }
    }

    updateStatsDisplay() {
        if (this.elements.starsCount) this.elements.starsCount.textContent = this.stats.stars;
        if (this.elements.streakCount) this.elements.streakCount.textContent = this.stats.streak;
        if (this.elements.correctCount) this.elements.correctCount.textContent = this.stats.totalCorrect;
        if (this.elements.totalCount) this.elements.totalCount.textContent = this.stats.totalAttempted;
    }

    // Bind all event listeners
    bindEvents() {
        // Home screen navigation
        document.getElementById('go-to-math')?.addEventListener('click', () => {
            this.sound.playClick();
            this.currentSubject = 'math';
            this.showScreen('mathMenu');
        });

        document.getElementById('go-to-reading')?.addEventListener('click', () => {
            this.sound.playClick();
            this.currentSubject = 'reading';
            this.showScreen('readingMenu');
        });

        // Back buttons
        document.getElementById('back-from-math-menu')?.addEventListener('click', () => {
            this.sound.playClick();
            this.showScreen('home');
        });

        document.getElementById('back-from-reading-menu')?.addEventListener('click', () => {
            this.sound.playClick();
            this.showScreen('home');
        });

        // Math level buttons
        document.querySelectorAll('#math-level-buttons .level-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.sound.playClick();
                this.mathLevel = parseInt(btn.dataset.level);
                this.updateSettingsUI();
                this.updateMathMenuForLevel();
                this.saveSettings();
            });
        });

        // Reading level buttons
        document.querySelectorAll('#reading-level-buttons .level-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.sound.playClick();
                this.readingLevel = parseInt(btn.dataset.level);
                this.updateSettingsUI();
                this.saveSettings();
            });
        });

        // Math menu buttons
        document.querySelectorAll('#math-menu-buttons .menu-btn[data-mode]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.sound.playClick();
                this.startMathGame(btn.dataset.mode);
            });
        });

        // Reading menu buttons
        document.querySelectorAll('#reading-menu-screen .menu-btn[data-mode]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.sound.playClick();
                this.startReadingGame(btn.dataset.mode);
            });
        });

        // Back from game
        document.getElementById('back-to-menu')?.addEventListener('click', () => {
            this.stopTimer();
            this.showScreen('mathMenu');
        });

        document.getElementById('back-to-reading-menu')?.addEventListener('click', () => {
            this.stopTimer();
            this.showScreen('readingMenu');
        });

        // Results screen buttons
        document.getElementById('play-again')?.addEventListener('click', () => {
            this.sound.playClick();
            if (this.currentSubject === 'math') {
                this.startMathGame(this.currentMode);
            } else {
                this.startReadingGame(this.readingMode);
            }
        });

        document.getElementById('back-to-menu-results')?.addEventListener('click', () => {
            this.sound.playClick();
            this.showScreen('home');
        });

        // Difficulty buttons
        document.querySelectorAll('.diff-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.sound.playClick();
                this.difficulty = btn.dataset.difficulty;
                this.updateSettingsUI();
                this.saveSettings();
            });
        });

        // Sound toggle
        this.elements.soundToggle?.addEventListener('click', () => {
            this.sound.toggle();
            this.updateSettingsUI();
            this.saveSettings();
            if (this.sound.enabled) this.sound.playClick();
        });

        document.getElementById('reading-sound-toggle')?.addEventListener('click', () => {
            this.sound.toggle();
            this.updateSettingsUI();
            this.saveSettings();
            if (this.sound.enabled) this.sound.playClick();
        });

        // Dashboard
        document.getElementById('open-dashboard')?.addEventListener('click', () => {
            this.sound.playClick();
            this.showDashboard();
        });

        document.getElementById('back-from-dashboard')?.addEventListener('click', () => {
            this.sound.playClick();
            this.showScreen('home');
        });

        // Guide
        document.getElementById('open-guide')?.addEventListener('click', () => {
            this.sound.playClick();
            this.showScreen('guide');
        });

        document.getElementById('back-from-guide')?.addEventListener('click', () => {
            this.sound.playClick();
            this.showScreen('home');
        });

        document.getElementById('start-from-guide')?.addEventListener('click', () => {
            this.sound.playClick();
            this.showScreen('home');
        });

        // Guide tabs
        document.querySelectorAll('.guide-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.guide-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.guide-tab-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab + '-guide')?.classList.add('active');
            });
        });

        // Dashboard tabs
        document.querySelectorAll('.dash-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const isMath = tab.dataset.tab === 'math';
                document.getElementById('math-accuracy-section').style.display = isMath ? 'block' : 'none';
                document.getElementById('reading-accuracy-section').style.display = isMath ? 'none' : 'block';
            });
        });

        // Reset stats
        document.getElementById('reset-stats')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                this.resetAllStats();
            }
        });

        // Speak word button
        document.getElementById('speak-word')?.addEventListener('click', () => {
            this.sound.speakWord(this.currentWord);
        });

        // Spelling submit
        document.getElementById('submit-spelling')?.addEventListener('click', () => {
            this.checkSpelling();
        });

        this.elements.spellingInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkSpelling();
        });
    }

    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => {
            if (screen) screen.classList.remove('active');
        });
        if (this.screens[screenName]) {
            this.screens[screenName].classList.add('active');
        }
    }

    // Update math menu based on level
    updateMathMenuForLevel() {
        const levelSettings = MATH_LEVEL_SETTINGS[this.mathLevel];
        const menuButtons = document.getElementById('math-menu-buttons');
        if (!menuButtons) return;

        // Update button descriptions based on level
        const bondsBtn = menuButtons.querySelector('[data-mode="bonds"]');
        const addBtn = menuButtons.querySelector('[data-mode="addition"]');
        const subBtn = menuButtons.querySelector('[data-mode="subtraction"]');

        if (bondsBtn) {
            bondsBtn.querySelector('.btn-desc').textContent = 'What + ? = 10';
        }

        if (addBtn) {
            if (this.mathLevel === 1) {
                addBtn.querySelector('.btn-text').textContent = 'Addition to 20';
                addBtn.querySelector('.btn-desc').textContent = 'Add numbers up to 20';
            } else if (this.mathLevel === 2) {
                addBtn.querySelector('.btn-text').textContent = 'Addition to 50';
                addBtn.querySelector('.btn-desc').textContent = 'Add two-digit numbers';
            } else {
                addBtn.querySelector('.btn-text').textContent = 'Addition to 100';
                addBtn.querySelector('.btn-desc').textContent = 'Master two-digit addition!';
            }
        }

        if (subBtn) {
            if (this.mathLevel === 1) {
                subBtn.querySelector('.btn-text').textContent = 'Subtraction from 10';
                subBtn.querySelector('.btn-desc').textContent = '10 - ? = ?';
            } else if (this.mathLevel === 2) {
                subBtn.querySelector('.btn-text').textContent = 'Subtraction to 50';
                subBtn.querySelector('.btn-desc').textContent = 'Subtract two-digit numbers';
            } else {
                subBtn.querySelector('.btn-text').textContent = 'Subtraction to 100';
                subBtn.querySelector('.btn-desc').textContent = 'Master two-digit subtraction!';
            }
        }
    }

    // ==================== MATH GAME ====================

    startMathGame(mode) {
        this.currentMode = mode;
        this.currentSubject = 'math';
        this.currentProblem = 0;
        this.correctAnswers = 0;
        this.isTimerMode = mode === 'timer';

        this.sessionStartTime = Date.now();
        this.currentSessionStats = {
            bonds: { correct: 0, attempted: 0 },
            addition: { correct: 0, attempted: 0 },
            subtraction: { correct: 0, attempted: 0 }
        };

        const settings = DIFFICULTY_SETTINGS[this.difficulty];
        this.totalProblems = this.isTimerMode ? 999 : settings.problemsPerRound;

        const problemMode = this.isTimerMode ? 'mixed' : mode;
        this.problems = this.generateMathProblems(problemMode);

        this.elements.gameModeTitle.textContent = this.getMathModeName(mode);
        this.elements.totalProblemsEl.textContent = this.isTimerMode ? '∞' : this.totalProblems;

        // Show appropriate visual
        if (this.mathLevel === 1) {
            this.elements.tenFrameContainer.style.display = 'flex';
            this.elements.placeValueContainer.style.display = 'none';
        } else {
            this.elements.tenFrameContainer.style.display = 'none';
            this.elements.placeValueContainer.style.display = 'flex';
        }

        if (this.isTimerMode) {
            this.timeRemaining = settings.timerSeconds;
            this.elements.timerDisplay.classList.add('active');
            this.elements.timerValue.textContent = this.timeRemaining;
            this.startTimer();
        } else {
            this.elements.timerDisplay.classList.remove('active');
        }

        this.showScreen('game');
        this.showMathProblem();
    }

    getMathModeName(mode) {
        const levelSettings = MATH_LEVEL_SETTINGS[this.mathLevel];
        const names = {
            bonds: 'Number Bonds to 10',
            addition: `Addition (${levelSettings.description})`,
            subtraction: `Subtraction (${levelSettings.description})`,
            mixed: 'Mixed Practice',
            timer: 'Speed Challenge'
        };
        return names[mode] || mode;
    }

    generateMathProblems(mode) {
        const problems = [];
        const count = this.isTimerMode ? 50 : this.totalProblems;

        for (let i = 0; i < count; i++) {
            let problem;
            if (mode === 'mixed') {
                const modes = ['bonds', 'addition', 'subtraction'];
                const randomMode = modes[Math.floor(Math.random() * modes.length)];
                problem = this.createMathProblem(randomMode);
            } else {
                problem = this.createMathProblem(mode);
            }
            problems.push(problem);
        }

        return problems;
    }

    createMathProblem(mode) {
        switch (mode) {
            case 'bonds': return this.createBondsProblem();
            case 'addition': return this.createAdditionProblem();
            case 'subtraction': return this.createSubtractionProblem();
            default: return this.createBondsProblem();
        }
    }

    createBondsProblem() {
        const num1 = Math.floor(Math.random() * 9) + 1;
        const answer = 10 - num1;
        const showFirst = Math.random() > 0.5;

        return {
            type: 'bonds',
            display: showFirst
                ? { num1: num1, operator: '+', num2: '?', result: 10 }
                : { num1: '?', operator: '+', num2: num1, result: 10 },
            answer: answer,
            tenFrameDisplay: { filled: num1, question: answer, showFirst: showFirst }
        };
    }

    createAdditionProblem() {
        const levelSettings = MATH_LEVEL_SETTINGS[this.mathLevel];
        const maxSum = levelSettings.addition.maxSum;
        const maxNum1 = levelSettings.addition.maxNum1;

        const num1 = Math.floor(Math.random() * maxNum1) + 1;
        const maxNum2 = Math.min(maxNum1, maxSum - num1);
        const num2 = Math.floor(Math.random() * Math.max(1, maxNum2)) + 1;
        const answer = num1 + num2;

        return {
            type: 'addition',
            display: { num1: num1, operator: '+', num2: num2, result: '?' },
            answer: answer,
            placeValue: { tens: Math.floor(answer / 10), ones: answer % 10 }
        };
    }

    createSubtractionProblem() {
        const levelSettings = MATH_LEVEL_SETTINGS[this.mathLevel];
        const maxMinuend = levelSettings.subtraction.maxMinuend;
        const maxSubtract = levelSettings.subtraction.maxSubtract;

        const num1 = Math.floor(Math.random() * (maxMinuend - 1)) + 2;
        const num2 = Math.floor(Math.random() * Math.min(num1, maxSubtract)) + 1;
        const answer = num1 - num2;

        return {
            type: 'subtraction',
            display: { num1: num1, operator: '-', num2: num2, result: '?' },
            answer: answer,
            placeValue: { tens: Math.floor(answer / 10), ones: answer % 10 }
        };
    }

    showMathProblem() {
        if (this.currentProblem >= this.problems.length) {
            this.problems = this.problems.concat(this.generateMathProblems('mixed'));
        }

        const problem = this.problems[this.currentProblem];

        this.elements.num1.textContent = problem.display.num1;
        this.elements.num1.classList.toggle('unknown', problem.display.num1 === '?');
        this.elements.operator.textContent = problem.display.operator;
        this.elements.num2.textContent = problem.display.num2;
        this.elements.num2.classList.toggle('unknown', problem.display.num2 === '?');
        this.elements.result.textContent = problem.display.result;
        this.elements.result.classList.toggle('unknown', problem.display.result === '?');

        if (this.mathLevel === 1 && problem.tenFrameDisplay) {
            this.updateTenFrame(problem);
        } else if (problem.placeValue) {
            this.updatePlaceValue(problem.answer);
        }

        this.generateMathAnswerChoices(problem.answer);

        this.elements.currentProblem.textContent = this.currentProblem + 1;
        if (!this.isTimerMode) {
            this.elements.progressFill.style.width = `${(this.currentProblem / this.totalProblems) * 100}%`;
        } else {
            this.elements.progressFill.style.width = `${Math.min(100, this.correctAnswers * 5)}%`;
        }

        this.elements.feedback.classList.remove('show', 'correct', 'incorrect');
    }

    updateTenFrame(problem) {
        const cells = this.elements.tenFrame.querySelectorAll('.ten-frame-cell');
        cells.forEach(cell => cell.className = 'ten-frame-cell');

        if (problem.type === 'bonds') {
            const { filled, question, showFirst } = problem.tenFrameDisplay;
            if (showFirst) {
                for (let i = 0; i < filled; i++) cells[i].classList.add('filled');
                for (let i = filled; i < filled + question; i++) cells[i].classList.add('question');
            } else {
                for (let i = 0; i < question; i++) cells[i].classList.add('question');
                for (let i = question; i < question + filled; i++) cells[i].classList.add('filled');
            }
        }
    }

    updatePlaceValue(number) {
        const tens = Math.floor(number / 10);
        const ones = number % 10;

        this.elements.pvTens.innerHTML = '';
        this.elements.pvOnes.innerHTML = '';

        for (let i = 0; i < tens; i++) {
            const block = document.createElement('div');
            block.className = 'pv-block tens-block';
            this.elements.pvTens.appendChild(block);
        }

        for (let i = 0; i < ones; i++) {
            const block = document.createElement('div');
            block.className = 'pv-block ones-block';
            this.elements.pvOnes.appendChild(block);
        }
    }

    generateMathAnswerChoices(correctAnswer) {
        this.elements.answers.innerHTML = '';
        const settings = DIFFICULTY_SETTINGS[this.difficulty];
        const numChoices = settings.answerChoices;

        // Determine range based on level
        const levelSettings = MATH_LEVEL_SETTINGS[this.mathLevel];
        const maxAnswer = levelSettings.maxNumber;

        const possibleAnswers = [];
        for (let i = 0; i <= maxAnswer; i++) {
            if (i !== correctAnswer) possibleAnswers.push(i);
        }

        // Shuffle
        for (let i = possibleAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [possibleAnswers[i], possibleAnswers[j]] = [possibleAnswers[j], possibleAnswers[i]];
        }

        // Sort by proximity
        possibleAnswers.sort((a, b) => Math.abs(a - correctAnswer) - Math.abs(b - correctAnswer));

        const wrongAnswers = possibleAnswers.slice(0, numChoices - 1);
        const allAnswers = [correctAnswer, ...wrongAnswers];

        // Shuffle final
        for (let i = allAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
        }

        allAnswers.forEach(answer => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = answer;
            btn.addEventListener('click', () => this.checkMathAnswer(answer, correctAnswer, btn));
            this.elements.answers.appendChild(btn);
        });
    }

    checkMathAnswer(selected, correct, button) {
        const buttons = this.elements.answers.querySelectorAll('.answer-btn');
        buttons.forEach(btn => btn.disabled = true);

        const isCorrect = selected === correct;
        const problemType = this.problems[this.currentProblem].type;

        if (isCorrect) {
            button.classList.add('correct');
            this.correctAnswers++;
            this.stats.streak++;
            if (this.stats.streak > this.stats.bestStreak) {
                this.stats.bestStreak = this.stats.streak;
            }
            this.showFeedback(true, this.elements.feedback);
            this.sound.playCorrect();
        } else {
            button.classList.add('incorrect');
            this.stats.streak = 0;
            buttons.forEach(btn => {
                if (parseInt(btn.textContent) === correct) btn.classList.add('correct');
            });
            this.showFeedback(false, this.elements.feedback);
            this.sound.playIncorrect();
        }

        this.stats.totalAttempted++;
        if (isCorrect) this.stats.totalCorrect++;

        if (this.stats.math && this.stats.math[problemType]) {
            this.stats.math[problemType].attempted++;
            if (isCorrect) this.stats.math[problemType].correct++;
        }

        if (this.currentSessionStats && this.currentSessionStats[problemType]) {
            this.currentSessionStats[problemType].attempted++;
            if (isCorrect) this.currentSessionStats[problemType].correct++;
        }

        this.updateStatsDisplay();
        this.saveStats();

        const delay = this.isTimerMode ? 600 : 1200;
        setTimeout(() => {
            this.currentProblem++;
            if (!this.isTimerMode && this.currentProblem >= this.totalProblems) {
                this.endGame();
            } else {
                this.showMathProblem();
            }
        }, delay);
    }

    // ==================== READING GAME ====================

    startReadingGame(mode) {
        this.readingMode = mode;
        this.currentSubject = 'reading';
        this.currentProblem = 0;
        this.correctAnswers = 0;
        this.isTimerMode = mode === 'reading-timer';

        this.sessionStartTime = Date.now();
        this.currentSessionStats = {
            sightWords: { correct: 0, attempted: 0 },
            wordMatch: { correct: 0, attempted: 0 },
            spelling: { correct: 0, attempted: 0 }
        };

        const settings = DIFFICULTY_SETTINGS[this.difficulty];
        this.totalProblems = this.isTimerMode ? 999 : settings.problemsPerRound;

        this.words = this.generateReadingProblems(mode);

        this.elements.readingModeTitle.textContent = this.getReadingModeName(mode);
        this.elements.readingTotalProblems.textContent = this.isTimerMode ? '∞' : this.totalProblems;

        // Show/hide appropriate containers
        this.elements.pictureContainer.style.display = (mode === 'word-to-picture') ? 'flex' : 'none';
        this.elements.spellingContainer.style.display = (mode === 'spelling') ? 'flex' : 'none';
        this.elements.wordCard.style.display = (mode !== 'spelling') ? 'flex' : 'none';
        document.getElementById('speak-word').style.display = (mode === 'spelling' || mode === 'sight-words') ? 'inline-block' : 'none';

        if (this.isTimerMode) {
            this.timeRemaining = settings.timerSeconds;
            this.elements.readingTimerDisplay.classList.add('active');
            this.elements.readingTimerValue.textContent = this.timeRemaining;
            this.startReadingTimer();
        } else {
            this.elements.readingTimerDisplay.classList.remove('active');
        }

        this.showScreen('readingGame');
        this.showReadingProblem();
    }

    getReadingModeName(mode) {
        const names = {
            'sight-words': 'Sight Words',
            'word-to-picture': 'Word to Picture',
            'spelling': 'Spelling',
            'sentence-reading': 'Sentence Reading',
            'reading-timer': 'Speed Reading'
        };
        return names[mode] || mode;
    }

    generateReadingProblems(mode) {
        const words = [];
        const count = this.isTimerMode ? 50 : this.totalProblems;

        if (mode === 'word-to-picture') {
            const pictureWords = PICTURE_WORDS[this.readingLevel] || PICTURE_WORDS[1];
            for (let i = 0; i < count; i++) {
                const word = pictureWords[Math.floor(Math.random() * pictureWords.length)];
                words.push({ ...word, type: 'picture' });
            }
        } else {
            const sightWords = SIGHT_WORDS[this.readingLevel] || SIGHT_WORDS[1];
            for (let i = 0; i < count; i++) {
                const word = sightWords[Math.floor(Math.random() * sightWords.length)];
                words.push({ word: word, type: mode === 'spelling' ? 'spelling' : 'sight' });
            }
        }

        return words;
    }

    showReadingProblem() {
        if (this.currentProblem >= this.words.length) {
            this.words = this.words.concat(this.generateReadingProblems(this.readingMode));
        }

        const wordData = this.words[this.currentProblem];
        this.currentWord = wordData.word;

        if (this.readingMode === 'word-to-picture') {
            this.elements.pictureDisplay.textContent = wordData.emoji;
            this.generateWordChoices(wordData.word);
        } else if (this.readingMode === 'spelling') {
            this.elements.spellingInput.value = '';
            this.elements.spellingInput.focus();
            this.sound.speakWord(wordData.word);
        } else {
            this.elements.displayWord.textContent = wordData.word;
            this.generateReadingAnswerChoices(wordData.word);
        }

        this.elements.readingCurrentProblem.textContent = this.currentProblem + 1;
        if (!this.isTimerMode) {
            this.elements.readingProgressFill.style.width = `${(this.currentProblem / this.totalProblems) * 100}%`;
        }

        this.elements.readingFeedback.classList.remove('show', 'correct', 'incorrect');
    }

    generateWordChoices(correctWord) {
        this.elements.readingAnswers.innerHTML = '';
        const allWords = PICTURE_WORDS[this.readingLevel] || PICTURE_WORDS[1];

        const otherWords = allWords.filter(w => w.word !== correctWord);
        const shuffled = otherWords.sort(() => Math.random() - 0.5).slice(0, 3);
        const choices = [correctWord, ...shuffled.map(w => w.word)];

        // Shuffle choices
        for (let i = choices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [choices[i], choices[j]] = [choices[j], choices[i]];
        }

        choices.forEach(word => {
            const btn = document.createElement('button');
            btn.className = 'reading-answer-btn';
            btn.textContent = word;
            btn.addEventListener('click', () => this.checkReadingAnswer(word, correctWord, btn));
            this.elements.readingAnswers.appendChild(btn);
        });
    }

    generateReadingAnswerChoices(correctWord) {
        this.elements.readingAnswers.innerHTML = '';

        // For sight words, show "I read it!" button
        const btn = document.createElement('button');
        btn.className = 'reading-answer-btn big-btn';
        btn.textContent = '✓ I read it!';
        btn.addEventListener('click', () => {
            this.recordReadingAnswer(true);
        });
        this.elements.readingAnswers.appendChild(btn);

        const skipBtn = document.createElement('button');
        skipBtn.className = 'reading-answer-btn skip-btn';
        skipBtn.textContent = 'Skip';
        skipBtn.addEventListener('click', () => {
            this.recordReadingAnswer(false);
        });
        this.elements.readingAnswers.appendChild(skipBtn);
    }

    checkReadingAnswer(selected, correct, button) {
        const buttons = this.elements.readingAnswers.querySelectorAll('.reading-answer-btn');
        buttons.forEach(btn => btn.disabled = true);

        const isCorrect = selected === correct;
        this.recordReadingResult(isCorrect, button, correct);
    }

    checkSpelling() {
        const input = this.elements.spellingInput.value.trim().toLowerCase();
        const correct = this.currentWord.toLowerCase();
        const isCorrect = input === correct;

        this.elements.spellingInput.disabled = true;
        document.getElementById('submit-spelling').disabled = true;

        this.recordReadingResult(isCorrect, null, correct);
    }

    recordReadingAnswer(isCorrect) {
        this.recordReadingResult(isCorrect, null, this.currentWord);
    }

    recordReadingResult(isCorrect, button, correctWord) {
        if (isCorrect) {
            if (button) button.classList.add('correct');
            this.correctAnswers++;
            this.stats.streak++;
            if (this.stats.streak > this.stats.bestStreak) {
                this.stats.bestStreak = this.stats.streak;
            }
            this.showFeedback(true, this.elements.readingFeedback);
            this.sound.playCorrect();
        } else {
            if (button) button.classList.add('incorrect');
            this.stats.streak = 0;
            this.showFeedback(false, this.elements.readingFeedback, `The word was: ${correctWord}`);
            this.sound.playIncorrect();
        }

        this.stats.totalAttempted++;
        if (isCorrect) this.stats.totalCorrect++;

        const statType = this.readingMode === 'word-to-picture' ? 'wordMatch' :
                        this.readingMode === 'spelling' ? 'spelling' : 'sightWords';

        if (this.stats.reading && this.stats.reading[statType]) {
            this.stats.reading[statType].attempted++;
            if (isCorrect) this.stats.reading[statType].correct++;
        }

        this.updateStatsDisplay();
        this.saveStats();

        const delay = this.isTimerMode ? 600 : 1200;
        setTimeout(() => {
            this.currentProblem++;
            this.elements.spellingInput.disabled = false;
            document.getElementById('submit-spelling').disabled = false;

            if (!this.isTimerMode && this.currentProblem >= this.totalProblems) {
                this.endGame();
            } else {
                this.showReadingProblem();
            }
        }, delay);
    }

    // ==================== COMMON FUNCTIONS ====================

    startTimer() {
        this.stopTimer();
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            this.elements.timerValue.textContent = this.timeRemaining;

            if (this.timeRemaining <= 10) {
                this.elements.timerDisplay.classList.add('warning');
                if (this.timeRemaining > 0) this.sound.playTimerWarning();
            }

            if (this.timeRemaining <= 0) {
                this.stopTimer();
                this.sound.playGameOver();
                this.endGame();
            }
        }, 1000);
    }

    startReadingTimer() {
        this.stopTimer();
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            this.elements.readingTimerValue.textContent = this.timeRemaining;

            if (this.timeRemaining <= 10) {
                this.elements.readingTimerDisplay.classList.add('warning');
                if (this.timeRemaining > 0) this.sound.playTimerWarning();
            }

            if (this.timeRemaining <= 0) {
                this.stopTimer();
                this.sound.playGameOver();
                this.endGame();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.elements.timerDisplay?.classList.remove('warning');
        this.elements.readingTimerDisplay?.classList.remove('warning');
    }

    showFeedback(isCorrect, feedbackEl, customMessage = null) {
        const emoji = feedbackEl.querySelector('.feedback-emoji');
        const text = feedbackEl.querySelector('.feedback-text');

        feedbackEl.classList.remove('correct', 'incorrect');
        feedbackEl.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            const messages = ['Great job!', 'Awesome!', 'You got it!', 'Perfect!', 'Way to go!', 'Super!'];
            const emojis = ['🌟', '⭐', '🎉', '👏', '🙌', '💪'];
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            text.textContent = messages[Math.floor(Math.random() * messages.length)];
        } else {
            emoji.textContent = '😊';
            text.textContent = customMessage || 'Try again next time!';
        }
    }

    endGame() {
        this.stopTimer();
        this.saveSession();

        const percentage = this.isTimerMode
            ? this.correctAnswers / 20
            : this.correctAnswers / this.totalProblems;

        let starsEarned = 0;
        if (percentage >= 0.9) starsEarned = 5;
        else if (percentage >= 0.8) starsEarned = 4;
        else if (percentage >= 0.7) starsEarned = 3;
        else if (percentage >= 0.5) starsEarned = 2;
        else if (percentage >= 0.3) starsEarned = 1;

        if (this.isTimerMode && this.correctAnswers > this.stats.bestTimerScore) {
            this.stats.bestTimerScore = this.correctAnswers;
            starsEarned += 1;
        }

        this.stats.stars += starsEarned;
        this.saveStats();
        this.checkTrophies();

        document.getElementById('result-correct').textContent = this.correctAnswers;
        document.getElementById('result-total').textContent = this.isTimerMode
            ? this.currentProblem
            : this.totalProblems;
        document.getElementById('result-stars').textContent = `+${starsEarned}`;

        if (this.isTimerMode) {
            this.elements.timerResult?.classList.add('active');
            const settings = DIFFICULTY_SETTINGS[this.difficulty];
            if (this.elements.resultTime) this.elements.resultTime.textContent = `${settings.timerSeconds}s`;
        } else {
            this.elements.timerResult?.classList.remove('active');
        }

        const resultsEmoji = document.getElementById('results-emoji');
        const resultsTitle = document.getElementById('results-title');

        if (percentage >= 1 || (this.isTimerMode && this.correctAnswers >= 20)) {
            resultsEmoji.textContent = '🏆';
            resultsTitle.textContent = this.isTimerMode ? 'Speed Champion!' : 'Perfect Score!';
            this.launchConfetti();
            this.sound.playSuccess();
        } else if (percentage >= 0.8) {
            resultsEmoji.textContent = '🌟';
            resultsTitle.textContent = 'Amazing!';
            this.launchConfetti();
            this.sound.playSuccess();
        } else if (percentage >= 0.6) {
            resultsEmoji.textContent = '😊';
            resultsTitle.textContent = 'Great Job!';
            this.sound.playSuccess();
        } else {
            resultsEmoji.textContent = '💪';
            resultsTitle.textContent = 'Keep Practicing!';
        }

        this.animateStars(starsEarned);
        this.showScreen('results');
        this.updateStatsDisplay();
    }

    animateStars(count) {
        const container = document.getElementById('reward-animation');
        container.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const star = document.createElement('span');
            star.className = 'star-reward';
            star.textContent = '⭐';
            star.style.animationDelay = `${i * 0.15}s`;
            container.appendChild(star);
        }
    }

    launchConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#aa96da'];

        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
                if (Math.random() > 0.5) confetti.style.borderRadius = '50%';
                this.elements.confetti.appendChild(confetti);
                setTimeout(() => confetti.remove(), 3000);
            }, i * 50);
        }
    }

    checkTrophies() {
        if (this.stats.totalAttempted >= 10 && !this.stats.trophies.includes('first_game')) {
            this.stats.trophies.push('first_game');
        }
        if (this.stats.totalCorrect >= 50 && !this.stats.trophies.includes('fifty_correct')) {
            this.stats.trophies.push('fifty_correct');
        }
        if (this.stats.totalCorrect >= 100 && !this.stats.trophies.includes('hundred_correct')) {
            this.stats.trophies.push('hundred_correct');
        }
        if (this.stats.totalCorrect >= 500 && !this.stats.trophies.includes('five_hundred_correct')) {
            this.stats.trophies.push('five_hundred_correct');
        }
        if (this.stats.bestStreak >= 10 && !this.stats.trophies.includes('streak_10')) {
            this.stats.trophies.push('streak_10');
        }
        if (this.stats.bestStreak >= 25 && !this.stats.trophies.includes('streak_25')) {
            this.stats.trophies.push('streak_25');
        }
        if (this.stats.stars >= 100 && !this.stats.trophies.includes('stars_100')) {
            this.stats.trophies.push('stars_100');
        }
        if (this.correctAnswers === this.totalProblems && !this.isTimerMode && !this.stats.trophies.includes('perfect')) {
            this.stats.trophies.push('perfect');
        }
        if (this.isTimerMode && this.correctAnswers >= 15 && !this.stats.trophies.includes('speed_demon')) {
            this.stats.trophies.push('speed_demon');
        }

        this.saveStats();
        this.renderTrophies();
    }

    renderTrophies() {
        const trophyData = [
            { id: 'first_game', emoji: '🎮', name: 'First Game' },
            { id: 'fifty_correct', emoji: '🥉', name: '50 Correct' },
            { id: 'hundred_correct', emoji: '🥈', name: '100 Correct' },
            { id: 'five_hundred_correct', emoji: '🥇', name: '500 Correct' },
            { id: 'streak_10', emoji: '🔥', name: '10 Streak' },
            { id: 'streak_25', emoji: '⚡', name: '25 Streak' },
            { id: 'stars_100', emoji: '💫', name: '100 Stars' },
            { id: 'perfect', emoji: '👑', name: 'Perfect Game' },
            { id: 'speed_demon', emoji: '🚀', name: 'Speed Demon' }
        ];

        if (this.elements.trophies) {
            this.elements.trophies.innerHTML = '';
            trophyData.forEach(trophy => {
                const span = document.createElement('span');
                span.className = 'trophy';
                span.textContent = trophy.emoji;
                span.title = trophy.name;
                if (!this.stats.trophies.includes(trophy.id)) {
                    span.classList.add('locked');
                }
                this.elements.trophies.appendChild(span);
            });
        }
    }

    saveSession() {
        if (!this.sessionStartTime) return;

        const sessionDuration = Math.round((Date.now() - this.sessionStartTime) / 1000);
        const totalAttempted = Object.values(this.currentSessionStats).reduce((sum, t) => sum + t.attempted, 0);
        const totalCorrect = Object.values(this.currentSessionStats).reduce((sum, t) => sum + t.correct, 0);

        if (totalAttempted === 0) return;

        const session = {
            timestamp: Date.now(),
            subject: this.currentSubject,
            mode: this.currentSubject === 'math' ? this.currentMode : this.readingMode,
            level: this.currentSubject === 'math' ? this.mathLevel : this.readingLevel,
            difficulty: this.difficulty,
            duration: sessionDuration,
            correct: totalCorrect,
            attempted: totalAttempted
        };

        this.sessions.push(session);
        this.saveSessions();
    }

    showDashboard() {
        this.showScreen('dashboard');
        this.renderDashboard();
    }

    renderDashboard() {
        this.renderOverviewCards();
        this.renderAccuracyBars();
        this.renderWeeklyChart();
        this.renderRecentSessions();
        this.renderProblemAreas();
    }

    renderOverviewCards() {
        const today = new Date().toDateString();
        const todaySessions = this.sessions.filter(s => new Date(s.timestamp).toDateString() === today);

        document.getElementById('dash-sessions-today').textContent = todaySessions.length;

        const accuracy = this.stats.totalAttempted > 0
            ? Math.round((this.stats.totalCorrect / this.stats.totalAttempted) * 100)
            : 0;
        document.getElementById('dash-accuracy').textContent = accuracy + '%';

        const timeToday = todaySessions.reduce((sum, s) => sum + (s.duration || 0), 0);
        document.getElementById('dash-time-today').textContent = Math.round(timeToday / 60) + 'm';
    }

    renderAccuracyBars() {
        // Math accuracy
        const mathTypes = ['bonds', 'addition', 'subtraction'];
        mathTypes.forEach(type => {
            const stats = this.stats.math?.[type] || { correct: 0, attempted: 0 };
            const accuracy = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;
            const bar = document.getElementById(`accuracy-${type}`);
            const text = document.getElementById(`accuracy-${type}-text`);
            if (bar) bar.style.width = accuracy + '%';
            if (text) text.textContent = accuracy + '%';
        });

        // Reading accuracy
        const readingTypes = [
            { key: 'sightWords', id: 'sight-words' },
            { key: 'wordMatch', id: 'word-match' },
            { key: 'spelling', id: 'spelling' }
        ];
        readingTypes.forEach(type => {
            const stats = this.stats.reading?.[type.key] || { correct: 0, attempted: 0 };
            const accuracy = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;
            const bar = document.getElementById(`accuracy-${type.id}`);
            const text = document.getElementById(`accuracy-${type.id}-text`);
            if (bar) bar.style.width = accuracy + '%';
            if (text) text.textContent = accuracy + '%';
        });
    }

    renderWeeklyChart() {
        const container = document.getElementById('weekly-chart');
        if (!container) return;

        container.innerHTML = '';
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        const weekData = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toDateString();

            const daySessions = this.sessions.filter(s =>
                new Date(s.timestamp).toDateString() === dateStr
            );

            weekData.push({
                day: days[date.getDay()],
                correct: daySessions.reduce((sum, s) => sum + (s.correct || 0), 0),
                isToday: i === 0
            });
        }

        const maxCorrect = Math.max(...weekData.map(d => d.correct), 1);

        weekData.forEach(data => {
            const dayBar = document.createElement('div');
            dayBar.className = 'day-bar';

            const barFill = document.createElement('div');
            barFill.className = 'day-bar-fill';
            barFill.style.height = Math.max(4, (data.correct / maxCorrect) * 80) + 'px';

            const label = document.createElement('span');
            label.className = 'day-bar-label';
            label.textContent = data.day;

            const value = document.createElement('span');
            value.className = 'day-bar-value';
            value.textContent = data.correct;

            dayBar.appendChild(value);
            dayBar.appendChild(barFill);
            dayBar.appendChild(label);
            container.appendChild(dayBar);
        });
    }

    renderRecentSessions() {
        const container = document.getElementById('sessions-list');
        if (!container) return;

        container.innerHTML = '';
        const recentSessions = this.sessions.slice(-10).reverse();

        if (recentSessions.length === 0) {
            container.innerHTML = '<div class="no-data-message">No sessions yet. Start practicing!</div>';
            return;
        }

        recentSessions.forEach(session => {
            const item = document.createElement('div');
            item.className = 'session-item';

            const accuracy = session.attempted > 0
                ? Math.round((session.correct / session.attempted) * 100)
                : 0;

            let scoreClass = 'needs-work';
            if (accuracy >= 80) scoreClass = 'good';
            else if (accuracy >= 60) scoreClass = 'medium';

            const timeAgo = this.getTimeAgo(session.timestamp);
            const subjectIcon = session.subject === 'math' ? '🧮' : '📚';

            item.innerHTML = `
                <div class="session-info">
                    <span class="session-mode">${subjectIcon} ${this.getModeName(session.mode, session.subject)}</span>
                    <span class="session-time">${timeAgo}</span>
                </div>
                <div class="session-score">
                    <span class="session-score-value ${scoreClass}">${session.correct}/${session.attempted}</span>
                    <span>(${accuracy}%)</span>
                </div>
            `;

            container.appendChild(item);
        });
    }

    getModeName(mode, subject) {
        if (subject === 'math') {
            return this.getMathModeName(mode);
        }
        return this.getReadingModeName(mode);
    }

    renderProblemAreas() {
        const container = document.getElementById('problem-areas');
        if (!container) return;

        container.innerHTML = '';

        const areas = [
            { key: 'bonds', name: 'Number Bonds', icon: '🎯', stats: this.stats.math?.bonds },
            { key: 'addition', name: 'Addition', icon: '➕', stats: this.stats.math?.addition },
            { key: 'subtraction', name: 'Subtraction', icon: '➖', stats: this.stats.math?.subtraction },
            { key: 'sightWords', name: 'Sight Words', icon: '👀', stats: this.stats.reading?.sightWords },
            { key: 'spelling', name: 'Spelling', icon: '✏️', stats: this.stats.reading?.spelling }
        ];

        const practiced = areas.filter(a => a.stats && a.stats.attempted > 0).map(a => ({
            ...a,
            accuracy: (a.stats.correct / a.stats.attempted) * 100
        }));

        if (practiced.length === 0) {
            container.innerHTML = '<div class="no-data-message">Practice more to see insights!</div>';
            return;
        }

        practiced.sort((a, b) => a.accuracy - b.accuracy);

        practiced.forEach(area => {
            const item = document.createElement('div');
            const isGood = area.accuracy >= 80;
            item.className = `problem-area-item ${isGood ? 'good' : ''}`;

            item.innerHTML = `
                <span class="problem-area-icon">${area.icon}</span>
                <span class="problem-area-text">${area.name}: ${isGood ? 'Great job!' : 'Keep practicing!'} ${Math.round(area.accuracy)}%</span>
            `;

            container.appendChild(item);
        });
    }

    getTimeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
        if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
        if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago';
        return new Date(timestamp).toLocaleDateString();
    }

    resetAllStats() {
        this.stats = {
            stars: 0,
            streak: 0,
            bestStreak: 0,
            totalCorrect: 0,
            totalAttempted: 0,
            trophies: [],
            bestTimerScore: 0,
            math: {
                bonds: { correct: 0, attempted: 0 },
                addition: { correct: 0, attempted: 0 },
                subtraction: { correct: 0, attempted: 0 }
            },
            reading: {
                sightWords: { correct: 0, attempted: 0 },
                wordMatch: { correct: 0, attempted: 0 },
                spelling: { correct: 0, attempted: 0 }
            }
        };
        this.sessions = [];

        this.saveStats();
        this.saveSessions();
        this.updateStatsDisplay();
        this.renderTrophies();
        this.renderDashboard();
        this.sound.playClick();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.learnApp = new LearnFunApp();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LearnFunApp, SoundManager, DIFFICULTY_SETTINGS, MATH_LEVEL_SETTINGS, SIGHT_WORDS };
}
