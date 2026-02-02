// Math Fun App - Learning to Think in 10s!

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
        this.playTone([523.25, 659.25, 783.99], 0.15, 'sine'); // C5, E5, G5 chord
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
        // Play a happy ascending melody
        const notes = [523.25, 587.33, 659.25, 783.99, 1046.5]; // C5, D5, E5, G5, C6
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
        this.playTone([392, 349.23, 329.63], 0.3, 'sine'); // G4, F4, E4
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

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

// Difficulty settings
const DIFFICULTY_SETTINGS = {
    easy: {
        label: 'Easy',
        bonds: { maxNum: 5 },           // Numbers 1-5 for bonds
        addition: { maxNum1: 5, maxSum: 10 },  // Small numbers, sum to 10
        subtraction: { maxSubtract: 5 },       // Subtract 1-5 from 10
        answerChoices: 3,               // Fewer choices
        timerSeconds: 90,               // More time
        problemsPerRound: 8
    },
    medium: {
        label: 'Medium',
        bonds: { maxNum: 10 },          // Numbers 1-10 for bonds
        addition: { maxNum1: 10, maxSum: 15 }, // Medium numbers
        subtraction: { maxSubtract: 10 },      // Subtract 1-10
        answerChoices: 4,
        timerSeconds: 60,
        problemsPerRound: 10
    },
    hard: {
        label: 'Hard',
        bonds: { maxNum: 10 },          // Numbers 1-10 for bonds
        addition: { maxNum1: 10, maxSum: 20 }, // Larger sums
        subtraction: { maxSubtract: 10 },
        answerChoices: 5,               // More choices
        timerSeconds: 45,               // Less time
        problemsPerRound: 15
    }
};

class MathFunApp {
    constructor() {
        // Game state
        this.currentMode = null;
        this.currentProblem = 0;
        this.totalProblems = 10;
        this.correctAnswers = 0;
        this.currentAnswer = null;
        this.problems = [];
        this.difficulty = 'easy';
        this.isTimerMode = false;
        this.timerInterval = null;
        this.timeRemaining = 60;
        this.totalTimeUsed = 0;

        // Sound manager
        this.sound = new SoundManager();

        // Stats (persisted)
        this.stats = this.loadStats();

        // DOM Elements
        this.screens = {
            menu: document.getElementById('menu-screen'),
            game: document.getElementById('game-screen'),
            results: document.getElementById('results-screen')
        };

        this.elements = {
            starsCount: document.getElementById('stars-count'),
            streakCount: document.getElementById('streak-count'),
            correctCount: document.getElementById('correct-count'),
            totalCount: document.getElementById('total-count'),
            gameModeTitle: document.getElementById('game-mode-title'),
            tenFrame: document.getElementById('ten-frame'),
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
            celebration: document.getElementById('celebration'),
            confetti: document.getElementById('confetti'),
            timerDisplay: document.getElementById('timer-display'),
            timerValue: document.getElementById('timer-value'),
            timerResult: document.getElementById('timer-result'),
            resultTime: document.getElementById('result-time'),
            soundToggle: document.getElementById('sound-toggle'),
            difficultyButtons: document.getElementById('difficulty-buttons')
        };

        this.initTenFrame();
        this.bindEvents();
        this.updateStatsDisplay();
        this.renderTrophies();
        this.loadSettings();
    }

    // Initialize ten frame cells
    initTenFrame() {
        this.elements.tenFrame.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            const cell = document.createElement('div');
            cell.className = 'ten-frame-cell';
            cell.dataset.index = i;
            this.elements.tenFrame.appendChild(cell);
        }
    }

    // Load stats from localStorage
    loadStats() {
        const saved = localStorage.getItem('mathFunStats');
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
            bestTimerScore: 0
        };
    }

    // Save stats to localStorage
    saveStats() {
        localStorage.setItem('mathFunStats', JSON.stringify(this.stats));
    }

    // Load settings from localStorage
    loadSettings() {
        const saved = localStorage.getItem('mathFunSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            this.difficulty = settings.difficulty || 'easy';
            this.sound.enabled = settings.soundEnabled !== false;
        }
        this.updateSettingsUI();
    }

    // Save settings to localStorage
    saveSettings() {
        localStorage.setItem('mathFunSettings', JSON.stringify({
            difficulty: this.difficulty,
            soundEnabled: this.sound.enabled
        }));
    }

    // Update settings UI
    updateSettingsUI() {
        // Update difficulty buttons
        document.querySelectorAll('.diff-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.difficulty === this.difficulty);
        });

        // Update sound toggle
        this.elements.soundToggle.textContent = this.sound.enabled ? '🔊 On' : '🔇 Off';
        this.elements.soundToggle.classList.toggle('off', !this.sound.enabled);
    }

    // Update stats display in header
    updateStatsDisplay() {
        this.elements.starsCount.textContent = this.stats.stars;
        this.elements.streakCount.textContent = this.stats.streak;
        this.elements.correctCount.textContent = this.stats.totalCorrect;
        this.elements.totalCount.textContent = this.stats.totalAttempted;
    }

    // Bind all event listeners
    bindEvents() {
        // Menu buttons
        document.querySelectorAll('.menu-btn[data-mode]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.sound.playClick();
                this.startGame(btn.dataset.mode);
            });
        });

        // Back button
        document.getElementById('back-to-menu').addEventListener('click', () => {
            this.stopTimer();
            this.showScreen('menu');
        });

        // Results screen buttons
        document.getElementById('play-again').addEventListener('click', () => {
            this.sound.playClick();
            this.startGame(this.currentMode);
        });
        document.getElementById('back-to-menu-results').addEventListener('click', () => {
            this.sound.playClick();
            this.showScreen('menu');
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
        this.elements.soundToggle.addEventListener('click', () => {
            this.sound.toggle();
            this.updateSettingsUI();
            this.saveSettings();
            if (this.sound.enabled) {
                this.sound.playClick();
            }
        });
    }

    // Show a specific screen
    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => screen.classList.remove('active'));
        this.screens[screenName].classList.add('active');
    }

    // Get current difficulty settings
    getDifficultySettings() {
        return DIFFICULTY_SETTINGS[this.difficulty];
    }

    // Start a new game
    startGame(mode) {
        this.currentMode = mode;
        this.currentProblem = 0;
        this.correctAnswers = 0;
        this.isTimerMode = mode === 'timer';

        const settings = this.getDifficultySettings();
        this.totalProblems = this.isTimerMode ? 999 : settings.problemsPerRound;

        // For timer mode, generate mixed problems
        const problemMode = this.isTimerMode ? 'mixed' : mode;
        this.problems = this.generateProblems(problemMode);

        // Update UI
        this.elements.gameModeTitle.textContent = this.getModeName(mode);
        this.elements.totalProblemsEl.textContent = this.isTimerMode ? '∞' : this.totalProblems;

        // Handle timer mode
        if (this.isTimerMode) {
            this.timeRemaining = settings.timerSeconds;
            this.totalTimeUsed = 0;
            this.elements.timerDisplay.classList.add('active');
            this.elements.timerValue.textContent = this.timeRemaining;
            this.startTimer();
        } else {
            this.elements.timerDisplay.classList.remove('active');
        }

        this.showScreen('game');
        this.showProblem();
    }

    // Start the timer
    startTimer() {
        this.stopTimer();
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            this.totalTimeUsed++;
            this.elements.timerValue.textContent = this.timeRemaining;

            // Warning at 10 seconds
            if (this.timeRemaining <= 10) {
                this.elements.timerDisplay.classList.add('warning');
                if (this.timeRemaining > 0) {
                    this.sound.playTimerWarning();
                }
            }

            if (this.timeRemaining <= 0) {
                this.stopTimer();
                this.sound.playGameOver();
                this.endGame();
            }
        }, 1000);
    }

    // Stop the timer
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.elements.timerDisplay.classList.remove('warning');
    }

    // Get display name for mode
    getModeName(mode) {
        const names = {
            bonds: 'Number Bonds to 10',
            addition: 'Addition to 20',
            subtraction: 'Subtraction from 10',
            mixed: 'Mixed Practice',
            timer: 'Speed Challenge'
        };
        return names[mode] || mode;
    }

    // Generate problems based on mode
    generateProblems(mode) {
        const problems = [];
        const count = this.isTimerMode ? 50 : this.totalProblems; // Generate more for timer mode

        for (let i = 0; i < count; i++) {
            let problem;

            if (mode === 'mixed') {
                const modes = ['bonds', 'addition', 'subtraction'];
                const randomMode = modes[Math.floor(Math.random() * modes.length)];
                problem = this.createProblem(randomMode);
            } else {
                problem = this.createProblem(mode);
            }

            problems.push(problem);
        }

        return problems;
    }

    // Create a single problem
    createProblem(mode) {
        switch (mode) {
            case 'bonds':
                return this.createBondsProblem();
            case 'addition':
                return this.createAdditionProblem();
            case 'subtraction':
                return this.createSubtractionProblem();
            default:
                return this.createBondsProblem();
        }
    }

    // Number bonds to 10: ? + num = 10 or num + ? = 10
    createBondsProblem() {
        const settings = this.getDifficultySettings();
        const maxNum = settings.bonds.maxNum;
        const num1 = Math.floor(Math.random() * maxNum) + 1;
        const answer = 10 - num1;
        const showFirst = Math.random() > 0.5;

        return {
            type: 'bonds',
            display: showFirst
                ? { num1: num1, operator: '+', num2: '?', result: 10 }
                : { num1: '?', operator: '+', num2: num1, result: 10 },
            answer: answer,
            tenFrameDisplay: {
                filled: num1,
                question: answer,
                showFirst: showFirst
            }
        };
    }

    // Addition within 20
    createAdditionProblem() {
        const settings = this.getDifficultySettings();
        const maxSum = settings.addition.maxSum;
        const maxNum1 = settings.addition.maxNum1;

        const num1 = Math.floor(Math.random() * maxNum1) + 1;
        const maxNum2 = Math.min(maxNum1, maxSum - num1);
        const num2 = Math.floor(Math.random() * maxNum2) + 1;
        const answer = num1 + num2;

        return {
            type: 'addition',
            display: { num1: num1, operator: '+', num2: num2, result: '?' },
            answer: answer,
            tenFrameDisplay: {
                filled: Math.min(num1, 10),
                secondary: Math.min(num2, Math.max(0, 10 - num1)),
                total: answer
            }
        };
    }

    // Subtraction from 10
    createSubtractionProblem() {
        const settings = this.getDifficultySettings();
        const maxSubtract = settings.subtraction.maxSubtract;
        const num2 = Math.floor(Math.random() * maxSubtract) + 1;
        const answer = 10 - num2;

        return {
            type: 'subtraction',
            display: { num1: 10, operator: '-', num2: num2, result: '?' },
            answer: answer,
            tenFrameDisplay: {
                filled: answer,
                crossed: num2
            }
        };
    }

    // Show current problem
    showProblem() {
        // Generate more problems if needed (timer mode)
        if (this.currentProblem >= this.problems.length) {
            this.problems = this.problems.concat(this.generateProblems('mixed'));
        }

        const problem = this.problems[this.currentProblem];

        // Update problem display
        this.elements.num1.textContent = problem.display.num1;
        this.elements.num1.classList.toggle('unknown', problem.display.num1 === '?');
        this.elements.operator.textContent = problem.display.operator;
        this.elements.num2.textContent = problem.display.num2;
        this.elements.num2.classList.toggle('unknown', problem.display.num2 === '?');
        this.elements.result.textContent = problem.display.result;
        this.elements.result.classList.toggle('unknown', problem.display.result === '?');

        // Update ten frame
        this.updateTenFrame(problem);

        // Generate answer choices
        this.generateAnswerChoices(problem.answer);

        // Update progress
        this.elements.currentProblem.textContent = this.currentProblem + 1;
        if (!this.isTimerMode) {
            this.elements.progressFill.style.width = `${(this.currentProblem / this.totalProblems) * 100}%`;
        } else {
            // In timer mode, show correct answers progress
            this.elements.progressFill.style.width = `${Math.min(100, this.correctAnswers * 5)}%`;
        }

        // Clear feedback
        this.elements.feedback.classList.remove('show', 'correct', 'incorrect');
    }

    // Update ten frame visual
    updateTenFrame(problem) {
        const cells = this.elements.tenFrame.querySelectorAll('.ten-frame-cell');

        // Reset all cells
        cells.forEach(cell => {
            cell.className = 'ten-frame-cell';
        });

        if (problem.type === 'bonds') {
            const { filled, question, showFirst } = problem.tenFrameDisplay;

            if (showFirst) {
                // Show filled dots first, then question marks
                for (let i = 0; i < filled; i++) {
                    cells[i].classList.add('filled');
                }
                for (let i = filled; i < filled + question; i++) {
                    cells[i].classList.add('question');
                }
            } else {
                // Show question marks first, then filled
                for (let i = 0; i < question; i++) {
                    cells[i].classList.add('question');
                }
                for (let i = question; i < question + filled; i++) {
                    cells[i].classList.add('filled');
                }
            }
        } else if (problem.type === 'addition') {
            const { filled, secondary } = problem.tenFrameDisplay;

            for (let i = 0; i < filled; i++) {
                cells[i].classList.add('filled');
            }
            for (let i = filled; i < filled + secondary && i < 10; i++) {
                cells[i].classList.add('filled', 'secondary');
            }
        } else if (problem.type === 'subtraction') {
            const { filled, crossed } = problem.tenFrameDisplay;

            // Show remaining (answer) as filled
            for (let i = 0; i < filled; i++) {
                cells[i].classList.add('filled');
            }
            // Show subtracted amount as question marks (what was taken away)
            for (let i = filled; i < 10; i++) {
                cells[i].classList.add('question');
            }
        }
    }

    // Generate answer choices
    generateAnswerChoices(correctAnswer) {
        this.elements.answers.innerHTML = '';

        const settings = this.getDifficultySettings();
        const numChoices = settings.answerChoices;

        // Generate wrong answers
        const answers = new Set([correctAnswer]);
        while (answers.size < numChoices) {
            let wrong;
            if (correctAnswer <= 10) {
                wrong = Math.max(0, Math.min(20, correctAnswer + (Math.floor(Math.random() * 5) - 2)));
            } else {
                wrong = Math.max(0, Math.min(20, correctAnswer + (Math.floor(Math.random() * 7) - 3)));
            }
            if (wrong !== correctAnswer) {
                answers.add(wrong);
            }
        }

        // Shuffle answers
        const shuffled = Array.from(answers).sort(() => Math.random() - 0.5);

        // Create buttons
        shuffled.forEach(answer => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = answer;
            btn.addEventListener('click', () => this.checkAnswer(answer, correctAnswer, btn));
            this.elements.answers.appendChild(btn);
        });
    }

    // Check answer
    checkAnswer(selected, correct, button) {
        // Disable all buttons
        const buttons = this.elements.answers.querySelectorAll('.answer-btn');
        buttons.forEach(btn => btn.disabled = true);

        const isCorrect = selected === correct;

        if (isCorrect) {
            button.classList.add('correct');
            this.correctAnswers++;
            this.stats.streak++;
            if (this.stats.streak > this.stats.bestStreak) {
                this.stats.bestStreak = this.stats.streak;
            }
            this.showFeedback(true);
            this.sound.playCorrect();
        } else {
            button.classList.add('incorrect');
            this.stats.streak = 0;

            // Highlight correct answer
            buttons.forEach(btn => {
                if (parseInt(btn.textContent) === correct) {
                    btn.classList.add('correct');
                }
            });
            this.showFeedback(false);
            this.sound.playIncorrect();
        }

        this.stats.totalAttempted++;
        if (isCorrect) this.stats.totalCorrect++;
        this.updateStatsDisplay();
        this.saveStats();

        // Move to next problem after delay (shorter in timer mode)
        const delay = this.isTimerMode ? 600 : 1200;
        setTimeout(() => {
            this.currentProblem++;
            if (!this.isTimerMode && this.currentProblem >= this.totalProblems) {
                this.endGame();
            } else {
                this.showProblem();
            }
        }, delay);
    }

    // Show feedback message
    showFeedback(isCorrect) {
        const feedback = this.elements.feedback;
        const emoji = feedback.querySelector('.feedback-emoji');
        const text = feedback.querySelector('.feedback-text');

        feedback.classList.remove('correct', 'incorrect');
        feedback.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            const messages = ['Great job!', 'Awesome!', 'You got it!', 'Perfect!', 'Way to go!', 'Super!'];
            const emojis = ['🌟', '⭐', '🎉', '👏', '🙌', '💪'];
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            text.textContent = messages[Math.floor(Math.random() * messages.length)];
        } else {
            emoji.textContent = '😊';
            text.textContent = 'Try again next time!';
        }
    }

    // End game and show results
    endGame() {
        this.stopTimer();

        // Calculate stars earned
        const percentage = this.isTimerMode
            ? this.correctAnswers / 20 // In timer mode, 20 correct = 100%
            : this.correctAnswers / this.totalProblems;

        let starsEarned = 0;
        if (percentage >= 0.9) starsEarned = 5;
        else if (percentage >= 0.8) starsEarned = 4;
        else if (percentage >= 0.7) starsEarned = 3;
        else if (percentage >= 0.5) starsEarned = 2;
        else if (percentage >= 0.3) starsEarned = 1;

        // Bonus star for timer mode high scores
        if (this.isTimerMode && this.correctAnswers > this.stats.bestTimerScore) {
            this.stats.bestTimerScore = this.correctAnswers;
            starsEarned += 1;
        }

        this.stats.stars += starsEarned;
        this.saveStats();

        // Check for trophies
        this.checkTrophies();

        // Update results screen
        document.getElementById('result-correct').textContent = this.correctAnswers;
        document.getElementById('result-total').textContent = this.isTimerMode
            ? this.currentProblem
            : this.totalProblems;
        document.getElementById('result-stars').textContent = `+${starsEarned}`;

        // Show/hide timer result
        if (this.isTimerMode) {
            this.elements.timerResult.classList.add('active');
            const settings = this.getDifficultySettings();
            this.elements.resultTime.textContent = `${settings.timerSeconds}s`;
        } else {
            this.elements.timerResult.classList.remove('active');
        }

        // Set results emoji and title based on performance
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

        // Animate stars
        this.animateStars(starsEarned);

        this.showScreen('results');
        this.updateStatsDisplay();
    }

    // Animate earned stars
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

    // Launch confetti celebration
    launchConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#aa96da'];

        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = `${2 + Math.random() * 2}s`;

                if (Math.random() > 0.5) {
                    confetti.style.borderRadius = '50%';
                }

                this.elements.confetti.appendChild(confetti);

                setTimeout(() => confetti.remove(), 3000);
            }, i * 50);
        }
    }

    // Check and award trophies
    checkTrophies() {
        const newTrophies = [];

        // First game trophy
        if (this.stats.totalAttempted >= 10 && !this.stats.trophies.includes('first_game')) {
            this.stats.trophies.push('first_game');
            newTrophies.push('🎮');
        }

        // 50 correct answers
        if (this.stats.totalCorrect >= 50 && !this.stats.trophies.includes('fifty_correct')) {
            this.stats.trophies.push('fifty_correct');
            newTrophies.push('🥉');
        }

        // 100 correct answers
        if (this.stats.totalCorrect >= 100 && !this.stats.trophies.includes('hundred_correct')) {
            this.stats.trophies.push('hundred_correct');
            newTrophies.push('🥈');
        }

        // 500 correct answers
        if (this.stats.totalCorrect >= 500 && !this.stats.trophies.includes('five_hundred_correct')) {
            this.stats.trophies.push('five_hundred_correct');
            newTrophies.push('🥇');
        }

        // 10 streak
        if (this.stats.bestStreak >= 10 && !this.stats.trophies.includes('streak_10')) {
            this.stats.trophies.push('streak_10');
            newTrophies.push('🔥');
        }

        // 25 streak
        if (this.stats.bestStreak >= 25 && !this.stats.trophies.includes('streak_25')) {
            this.stats.trophies.push('streak_25');
            newTrophies.push('⚡');
        }

        // 100 stars
        if (this.stats.stars >= 100 && !this.stats.trophies.includes('stars_100')) {
            this.stats.trophies.push('stars_100');
            newTrophies.push('💫');
        }

        // Perfect game
        if (this.correctAnswers === this.totalProblems && !this.isTimerMode && !this.stats.trophies.includes('perfect')) {
            this.stats.trophies.push('perfect');
            newTrophies.push('👑');
        }

        // Speed demon - 15+ in timer mode
        if (this.isTimerMode && this.correctAnswers >= 15 && !this.stats.trophies.includes('speed_demon')) {
            this.stats.trophies.push('speed_demon');
            newTrophies.push('🚀');
        }

        this.saveStats();
        this.renderTrophies();
    }

    // Render trophies in trophy case
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

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.mathApp = new MathFunApp();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MathFunApp, SoundManager, DIFFICULTY_SETTINGS };
}
