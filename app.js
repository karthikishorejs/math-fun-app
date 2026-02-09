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

// Vocabulary words with definitions, synonyms, antonyms
const VOCABULARY_WORDS = [
    { word: 'brave', definition: 'not afraid of danger', synonyms: ['courageous', 'bold', 'fearless'], antonyms: ['scared', 'afraid', 'cowardly'] },
    { word: 'enormous', definition: 'very big', synonyms: ['huge', 'giant', 'massive'], antonyms: ['tiny', 'small', 'little'] },
    { word: 'delicious', definition: 'tastes very good', synonyms: ['yummy', 'tasty', 'scrumptious'], antonyms: ['disgusting', 'gross', 'awful'] },
    { word: 'ancient', definition: 'very very old', synonyms: ['old', 'antique', 'aged'], antonyms: ['new', 'modern', 'recent'] },
    { word: 'swift', definition: 'moving very fast', synonyms: ['quick', 'fast', 'speedy'], antonyms: ['slow', 'sluggish', 'lazy'] },
    { word: 'joyful', definition: 'feeling very happy', synonyms: ['happy', 'cheerful', 'glad'], antonyms: ['sad', 'unhappy', 'miserable'] },
    { word: 'mysterious', definition: 'hard to understand or explain', synonyms: ['strange', 'puzzling', 'secret'], antonyms: ['clear', 'obvious', 'simple'] },
    { word: 'brilliant', definition: 'very smart or very bright', synonyms: ['smart', 'clever', 'bright'], antonyms: ['dull', 'dim', 'stupid'] },
    { word: 'fierce', definition: 'wild and scary', synonyms: ['wild', 'savage', 'violent'], antonyms: ['gentle', 'calm', 'peaceful'] },
    { word: 'fragile', definition: 'breaks easily', synonyms: ['delicate', 'breakable', 'weak'], antonyms: ['strong', 'sturdy', 'tough'] },
    { word: 'generous', definition: 'likes to share and give', synonyms: ['giving', 'kind', 'sharing'], antonyms: ['selfish', 'greedy', 'stingy'] },
    { word: 'peculiar', definition: 'strange or unusual', synonyms: ['odd', 'weird', 'unusual'], antonyms: ['normal', 'ordinary', 'common'] },
    { word: 'exhausted', definition: 'very very tired', synonyms: ['tired', 'weary', 'drained'], antonyms: ['energetic', 'rested', 'refreshed'] },
    { word: 'magnificent', definition: 'extremely beautiful or impressive', synonyms: ['wonderful', 'splendid', 'grand'], antonyms: ['ugly', 'plain', 'ordinary'] },
    { word: 'cautious', definition: 'being very careful', synonyms: ['careful', 'wary', 'watchful'], antonyms: ['careless', 'reckless', 'bold'] }
];

// Reading Comprehension passages with questions
const READING_PASSAGES = [
    {
        title: 'The Lost Puppy',
        passage: 'One rainy afternoon, Maya found a small brown puppy shivering under a park bench. The puppy had no collar and looked very hungry. Maya took off her jacket and wrapped it around the puppy to keep it warm. She carried the puppy home and gave it some water and food. The next day, Maya made posters to find the puppy\'s owner.',
        questions: [
            { question: 'Where did Maya find the puppy?', choices: ['Under a tree', 'Under a park bench', 'In her backyard', 'At school'], answer: 1 },
            { question: 'What did Maya use to keep the puppy warm?', choices: ['A blanket', 'Her jacket', 'A towel', 'Her hat'], answer: 1 },
            { question: 'How did Maya try to find the owner?', choices: ['Called the police', 'Made posters', 'Asked her neighbors', 'Posted online'], answer: 1 }
        ]
    },
    {
        title: 'The Science Fair',
        passage: 'Emma worked on her science project for three weeks. She wanted to find out if plants grow better with music. She planted four bean seeds in identical pots. Two pots listened to classical music every day, and two pots stayed in silence. After two weeks, the plants with music were taller! Emma was excited to share her results at the science fair.',
        questions: [
            { question: 'What was Emma trying to find out?', choices: ['If plants need water', 'If plants grow better with music', 'How to grow beans', 'What plants eat'], answer: 1 },
            { question: 'How many pots did Emma use?', choices: ['Two', 'Three', 'Four', 'Five'], answer: 2 },
            { question: 'What happened to the plants with music?', choices: ['They died', 'They stayed the same', 'They were taller', 'They turned brown'], answer: 2 }
        ]
    },
    {
        title: 'The Space Mission',
        passage: 'Captain Lee checked all the controls one last time. In five minutes, her spaceship would launch to Mars. She had trained for this mission for five years. The whole world was watching. When the countdown reached zero, the engines roared to life. The spaceship shot up into the sky, leaving a trail of fire behind it. Captain Lee smiled. Her dream was finally coming true.',
        questions: [
            { question: 'Where was Captain Lee going?', choices: ['The Moon', 'Mars', 'Jupiter', 'The Sun'], answer: 1 },
            { question: 'How long did Captain Lee train?', choices: ['One year', 'Three years', 'Five years', 'Ten years'], answer: 2 },
            { question: 'How did Captain Lee feel when the spaceship launched?', choices: ['Scared', 'Angry', 'Happy', 'Sad'], answer: 2 }
        ]
    },
    {
        title: 'The Secret Garden',
        passage: 'Behind the old library, there was a hidden door covered with ivy. Lily discovered it one summer day. She pushed the door open and found a beautiful garden filled with colorful flowers and butterflies. In the middle was a stone fountain with clear water. Lily decided this would be her secret place to read books and dream.',
        questions: [
            { question: 'Where was the hidden door?', choices: ['Behind her house', 'Behind the library', 'At the park', 'At school'], answer: 1 },
            { question: 'What covered the door?', choices: ['Moss', 'Flowers', 'Ivy', 'Paint'], answer: 2 },
            { question: 'What was in the middle of the garden?', choices: ['A tree', 'A bench', 'A fountain', 'A statue'], answer: 2 }
        ]
    },
    {
        title: 'The Baking Contest',
        passage: 'Grandma Rosa taught Miguel how to bake her famous chocolate cake. The secret ingredient was a tiny bit of cinnamon. On the day of the school baking contest, Miguel carefully followed the recipe. The judges tasted every entry. When they announced the winner, Miguel couldn\'t believe his ears. His cake won first place! He ran to call Grandma Rosa to share the good news.',
        questions: [
            { question: 'What was the secret ingredient?', choices: ['Vanilla', 'Cinnamon', 'Sugar', 'Salt'], answer: 1 },
            { question: 'Who taught Miguel to bake?', choices: ['His mom', 'His dad', 'Grandma Rosa', 'His teacher'], answer: 2 },
            { question: 'What place did Miguel win?', choices: ['Second place', 'Third place', 'First place', 'No place'], answer: 2 }
        ]
    }
];

// Interactive Story Adventures
// Fallback stories used when AI generation is unavailable
const FALLBACK_STORIES = [
    {
        id: 'dragon',
        title: 'The Friendly Dragon',
        scenes: [
            {
                text: 'You are walking through a magical forest when you hear a strange sound coming from behind the bushes. What do you do?',
                choices: [
                    { text: 'Walk closer to investigate', next: 1 },
                    { text: 'Hide behind a tree and watch', next: 2 }
                ]
            },
            {
                text: 'You push through the bushes and find a baby dragon with a hurt wing! The dragon looks scared but doesn\'t fly away. What do you do?',
                choices: [
                    { text: 'Speak softly and offer help', next: 3 },
                    { text: 'Run and get an adult', next: 4 }
                ]
            },
            {
                text: 'From behind the tree, you see a baby dragon trying to fly but falling down each time. Its wing seems hurt. The dragon starts to cry little puffs of smoke.',
                choices: [
                    { text: 'Come out and try to help', next: 3 },
                    { text: 'Run and get an adult', next: 4 }
                ]
            },
            {
                text: '"Don\'t be scared, little one," you say gently. The dragon stops shaking and looks at you with big golden eyes. You carefully wrap your scarf around its hurt wing. The dragon purrs happily!',
                choices: [
                    { text: 'Take the dragon home to heal', next: 5 },
                    { text: 'Stay and keep it company', next: 6 }
                ]
            },
            {
                text: 'You run to find your grandmother who knows about magical creatures. She comes back with you and brings special healing herbs. Together, you help the dragon!',
                choices: [
                    { text: 'Continue the adventure', next: 6 }
                ]
            },
            {
                text: 'After a few days of care, the dragon\'s wing is healed! The dragon breathes a tiny flame that turns into a beautiful flower and gives it to you. You\'ve made a friend for life!',
                ending: true,
                message: '🎉 You showed kindness and made a magical friend!'
            },
            {
                text: 'You stay with the dragon as the sun sets. The dragon\'s mother appears! She sees you helping and bows her head in thanks. She gently heals her baby with dragon magic.',
                ending: true,
                message: '🌟 Your patience and kindness were rewarded!'
            }
        ]
    },
    {
        id: 'underwater',
        title: 'The Underwater Kingdom',
        scenes: [
            {
                text: 'While swimming at the beach, you find a shimmering seashell. When you hold it to your ear, a voice says: "Help us, brave one!" Suddenly you can breathe underwater!',
                choices: [
                    { text: 'Dive down to explore', next: 1 },
                    { text: 'Swim out to the deep water', next: 2 }
                ]
            },
            {
                text: 'You dive down and discover a beautiful underwater city made of coral and pearls! A young mermaid swims up to you. "The giant octopus took our queen\'s crown. Will you help?"',
                choices: [
                    { text: 'Agree to help find the crown', next: 3 },
                    { text: 'Ask for more information first', next: 4 }
                ]
            },
            {
                text: 'Swimming out to deeper water, you meet a wise old sea turtle. "Young one, the merpeople need a hero. Their crown has been stolen!"',
                choices: [
                    { text: 'Ask the turtle to guide you', next: 4 },
                    { text: 'Follow the bubbles to find them', next: 3 }
                ]
            },
            {
                text: 'You swim to the octopus\'s cave. It\'s dark and spooky! The giant octopus is actually crying. "I didn\'t mean to take it! I just wanted something shiny. My cave is so dark and lonely."',
                choices: [
                    { text: 'Offer to be the octopus\'s friend', next: 5 },
                    { text: 'Promise to bring the octopus a light', next: 6 }
                ]
            },
            {
                text: 'The mermaid explains: "The octopus is not mean, just lonely. Maybe if someone was kind to it, it would return the crown."',
                choices: [
                    { text: 'Go talk to the octopus nicely', next: 5 }
                ]
            },
            {
                text: '"Really? You want to be my friend?" The octopus gives you a big, squishy hug with all eight arms! It happily returns the crown and the whole kingdom celebrates!',
                ending: true,
                message: '🐙 Kindness solved the problem! The octopus and merpeople are now friends!'
            },
            {
                text: 'You bring back a glowing jellyfish lamp for the octopus. Its cave lights up beautifully! So happy, the octopus returns the crown and invites everyone to a party in its now-bright cave!',
                ending: true,
                message: '✨ You found a creative solution and made everyone happy!'
            }
        ]
    },
    {
        id: 'timetravel',
        title: 'The Time Machine',
        scenes: [
            {
                text: 'In your attic, you find an old pocket watch that glows! When you press the button, a voice asks: "Where would you like to go?" You can travel through time!',
                choices: [
                    { text: 'Visit the dinosaurs!', next: 1 },
                    { text: 'Go to the future!', next: 2 }
                ]
            },
            {
                text: 'WHOOSH! You land in a jungle millions of years ago. Huge trees tower above you. You hear a rumbling sound... A baby triceratops is stuck in the mud!',
                choices: [
                    { text: 'Help pull it out', next: 3 },
                    { text: 'Look for something to help', next: 4 }
                ]
            },
            {
                text: 'ZOOM! You appear in a city with flying cars and robots! A friendly robot rolls up. "Welcome, time traveler! We have a problem. Can you help us remember how to plant seeds?"',
                choices: [
                    { text: 'Teach them about gardening', next: 5 },
                    { text: 'Ask why they forgot', next: 6 }
                ]
            },
            {
                text: 'You pull and pull, but the mud is too sticky! The mother triceratops arrives and helps push while you pull. Together, you free the baby! The dinosaur family trumpets happily.',
                ending: true,
                message: '🦕 Teamwork saved the day! The dinosaurs do a happy dance!'
            },
            {
                text: 'You find a strong vine and loop it around a tree. Using it as a pulley, you help the baby climb out! The grateful mother triceratops gives you a beautiful blue feather.',
                ending: true,
                message: '🪶 Your clever thinking solved the problem!'
            },
            {
                text: 'You show them how to dig holes, plant seeds, and water them. The robots are so excited! "We will have flowers again!" They make you an honorary citizen of the future!',
                ending: true,
                message: '🌱 You brought nature back to the future!'
            },
            {
                text: '"Everyone got too busy with machines and forgot about nature," the robot says sadly. You spend the day teaching them about plants, and soon the whole city is gardening!',
                ending: true,
                message: '🤖 You reminded the future about what really matters!'
            }
        ]
    }
];

// Advanced spelling words with patterns
const SPELLING_WORDS = {
    easy: ['because', 'friend', 'special', 'believe', 'thought', 'through', 'people', 'enough', 'beautiful', 'different'],
    medium: ['knowledge', 'adventure', 'mysterious', 'wonderful', 'celebrate', 'important', 'excellent', 'disappear', 'impossible', 'comfortable'],
    hard: ['extraordinary', 'immediately', 'unfortunately', 'encyclopedia', 'accomplishment', 'determination', 'imagination', 'communication', 'environment', 'responsibility']
};

// AI Story generation themes
const STORY_THEMES = [
    'a magical garden with talking flowers',
    'a friendly robot learning about feelings',
    'a brave little mouse on a big adventure',
    'a rainbow that lost its colors',
    'a cloud that wanted to become rain',
    'a lost star finding its way home',
    'a kind wizard helping forest animals',
    'a musical instrument that came to life',
    'a treehouse that could fly',
    'a penguin who dreamed of warm places'
];

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
                vocabulary: { correct: 0, attempted: 0 },
                comprehension: { correct: 0, attempted: 0 },
                spelling: { correct: 0, attempted: 0 },
                story: { correct: 0, attempted: 0 }
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
            this.spellingDifficulty = settings.spellingDifficulty || 'easy';
            this.sound.enabled = settings.soundEnabled !== false;
        }

        // Load HF API key separately (for security, kept in different key)
        const hfApiKey = localStorage.getItem('hfApiKey') || '';
        const apiKeyInput = document.getElementById('hf-api-key');
        if (apiKeyInput) {
            apiKeyInput.value = hfApiKey;
        }

        this.updateSettingsUI();
    }

    saveSettings() {
        localStorage.setItem('learnFunSettings', JSON.stringify({
            difficulty: this.difficulty,
            mathLevel: this.mathLevel,
            spellingDifficulty: this.spellingDifficulty,
            soundEnabled: this.sound.enabled
        }));
    }

    saveHfApiKey(key) {
        localStorage.setItem('hfApiKey', key);
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

        // Spelling difficulty buttons
        document.querySelectorAll('#spelling-difficulty-buttons .diff-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.sound.playClick();
                this.spellingDifficulty = btn.dataset.difficulty;
                document.querySelectorAll('#spelling-difficulty-buttons .diff-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.saveSettings();
            });
        });

        // Hugging Face API key input
        document.getElementById('hf-api-key')?.addEventListener('change', (e) => {
            this.saveHfApiKey(e.target.value.trim());
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
        this.isTimerMode = false;

        this.sessionStartTime = Date.now();
        this.currentSessionStats = {
            vocabulary: { correct: 0, attempted: 0 },
            comprehension: { correct: 0, attempted: 0 },
            spelling: { correct: 0, attempted: 0 },
            story: { correct: 0, attempted: 0 }
        };

        // Hide all containers first
        this.hideAllReadingContainers();

        // Set up based on mode
        if (mode === 'story') {
            this.startStoryMode();
        } else if (mode === 'vocabulary') {
            this.startVocabularyMode();
        } else if (mode === 'comprehension') {
            this.startComprehensionMode();
        } else if (mode === 'spelling') {
            this.startSpellingMode();
        }

        this.elements.readingModeTitle.textContent = this.getReadingModeName(mode);
        this.showScreen('readingGame');
    }

    hideAllReadingContainers() {
        const containers = ['story-container', 'vocab-container', 'comprehension-container', 'spelling-container', 'reading-answers'];
        containers.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
        const progressContainer = document.getElementById('reading-progress-container');
        if (progressContainer) progressContainer.style.display = 'flex';
    }

    getReadingModeName(mode) {
        const names = {
            'story': '📖 Story Adventure',
            'vocabulary': '📝 Vocabulary Builder',
            'comprehension': '🔍 Reading Comprehension',
            'spelling': '✏️ Spelling Challenge'
        };
        return names[mode] || mode;
    }

    // ==================== STORY MODE ====================

    async startStoryMode() {
        const storyContainer = document.getElementById('story-container');
        const loadingContainer = document.getElementById('story-loading');
        document.getElementById('reading-progress-container').style.display = 'none';

        // Check if AI generation is available
        const apiKey = localStorage.getItem('hfApiKey');

        if (apiKey) {
            // Show loading state while generating AI story
            loadingContainer.style.display = 'flex';
            storyContainer.style.display = 'none';

            try {
                const aiStory = await this.generateAIStory(apiKey);
                if (aiStory) {
                    this.currentStory = aiStory;
                    this.isAIStory = true;
                } else {
                    // Fall back to hardcoded stories
                    this.currentStory = FALLBACK_STORIES[Math.floor(Math.random() * FALLBACK_STORIES.length)];
                    this.isAIStory = false;
                }
            } catch (error) {
                console.error('AI story generation failed:', error);
                this.currentStory = FALLBACK_STORIES[Math.floor(Math.random() * FALLBACK_STORIES.length)];
                this.isAIStory = false;
            }

            loadingContainer.style.display = 'none';
        } else {
            // No API key, use fallback stories directly
            this.currentStory = FALLBACK_STORIES[Math.floor(Math.random() * FALLBACK_STORIES.length)];
            this.isAIStory = false;
        }

        storyContainer.style.display = 'block';
        this.currentSceneIndex = 0;
        this.totalProblems = 1; // Stories count as 1 complete activity

        // Show title with AI badge if applicable
        const titleEl = document.getElementById('story-title');
        titleEl.innerHTML = this.currentStory.title + (this.isAIStory ? '<span class="ai-badge">AI</span>' : '');
        this.showStoryScene();
    }

    async generateAIStory(apiKey, retryCount = 0) {
        const theme = STORY_THEMES[Math.floor(Math.random() * STORY_THEMES.length)];

        const prompt = `<s>[INST] Create a short interactive children's story about ${theme} for a 6-7 year old.

Return ONLY valid JSON with this exact structure (no other text):
{
    "title": "Story Title Here",
    "scenes": [
        {"text": "Opening scene text here...", "choices": [{"text": "First choice", "next": 1}, {"text": "Second choice", "next": 2}]},
        {"text": "Scene after first choice...", "choices": [{"text": "Next choice", "next": 3}]},
        {"text": "Scene after second choice...", "choices": [{"text": "Next choice", "next": 3}]},
        {"text": "Final happy ending scene...", "ending": true, "message": "🎉 Congratulations message here!"}
    ]
}

Rules:
- Keep text short and simple (2-3 sentences per scene)
- Use positive, encouraging themes
- Include 4-5 scenes total
- All paths should lead to a happy ending
- Use "next" to indicate which scene index comes next (0-indexed)
- The last scene must have "ending": true and a "message"
[/INST]</s>`;

        try {
            console.log('Generating AI story with theme:', theme);

            const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        max_new_tokens: 1200,
                        return_full_text: false,
                        temperature: 0.7
                    }
                })
            });

            const result = await response.json();
            console.log('API response:', result);

            // Handle model loading (cold start) - retry after waiting
            if (result.error && result.error.includes('loading') && retryCount < 2) {
                const waitTime = result.estimated_time ? Math.ceil(result.estimated_time * 1000) : 20000;
                console.log(`Model is loading, waiting ${waitTime}ms and retrying...`);
                document.querySelector('.loading-text').textContent = '⏳ Waking up the AI... please wait';
                await new Promise(resolve => setTimeout(resolve, waitTime));
                return this.generateAIStory(apiKey, retryCount + 1);
            }

            if (!response.ok) {
                console.error('API response not ok:', response.status, result);
                return null;
            }

            // Handle different response formats
            let generatedText = '';
            if (Array.isArray(result) && result[0]?.generated_text) {
                generatedText = result[0].generated_text;
            } else if (result.generated_text) {
                generatedText = result.generated_text;
            } else if (result.error) {
                console.error('API error:', result.error);
                return null;
            }

            console.log('Generated text:', generatedText);

            // Extract JSON from the response
            const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                console.error('No JSON found in response');
                return null;
            }

            const story = JSON.parse(jsonMatch[0]);
            console.log('Parsed story:', story);

            // Validate the story structure
            if (!story.title || !Array.isArray(story.scenes) || story.scenes.length < 2) {
                console.error('Invalid story structure');
                return null;
            }

            // Ensure there's at least one ending scene
            const hasEnding = story.scenes.some(scene => scene.ending);
            if (!hasEnding) {
                // Add a default ending to the last scene
                story.scenes[story.scenes.length - 1].ending = true;
                story.scenes[story.scenes.length - 1].message = '🎉 The End! What a wonderful adventure!';
            }

            return story;
        } catch (error) {
            console.error('Error generating AI story:', error);
            return null;
        }
    }

    showStoryScene() {
        const scene = this.currentStory.scenes[this.currentSceneIndex];
        const storyText = document.getElementById('story-text');
        const storyChoices = document.getElementById('story-choices');

        storyText.textContent = scene.text;
        storyChoices.innerHTML = '';

        if (scene.ending) {
            // Show ending
            const endingDiv = document.createElement('div');
            endingDiv.className = 'story-ending';
            endingDiv.innerHTML = `<div class="ending-message">${scene.message}</div>`;
            storyChoices.appendChild(endingDiv);

            const continueBtn = document.createElement('button');
            continueBtn.className = 'story-choice-btn ending-btn';
            continueBtn.textContent = '🎉 Finish Story';
            continueBtn.addEventListener('click', () => {
                this.correctAnswers = 1;
                this.currentSessionStats.story.correct++;
                this.currentSessionStats.story.attempted++;
                this.sound.playSuccess();
                this.endGame();
            });
            storyChoices.appendChild(continueBtn);
        } else {
            // Show choices
            scene.choices.forEach((choice, index) => {
                const btn = document.createElement('button');
                btn.className = 'story-choice-btn';
                btn.textContent = choice.text;
                btn.addEventListener('click', () => {
                    this.sound.playClick();
                    this.currentSceneIndex = choice.next;
                    this.showStoryScene();
                });
                storyChoices.appendChild(btn);
            });
        }
    }

    // ==================== VOCABULARY MODE ====================

    startVocabularyMode() {
        const vocabContainer = document.getElementById('vocab-container');
        vocabContainer.style.display = 'block';

        // Shuffle vocabulary words
        this.vocabWords = [...VOCABULARY_WORDS].sort(() => Math.random() - 0.5);
        this.totalProblems = Math.min(10, this.vocabWords.length);
        this.elements.readingTotalProblems.textContent = this.totalProblems;

        this.showVocabularyProblem();
    }

    showVocabularyProblem() {
        if (this.currentProblem >= this.totalProblems) {
            this.endGame();
            return;
        }

        const wordData = this.vocabWords[this.currentProblem];
        this.currentWord = wordData.word;

        document.getElementById('vocab-word').textContent = wordData.word;
        document.getElementById('vocab-definition').textContent = `"${wordData.definition}"`;

        const questionEl = document.getElementById('vocab-question');
        const choicesEl = document.getElementById('vocab-choices');
        choicesEl.innerHTML = '';

        // Randomly choose question type
        const questionType = Math.floor(Math.random() * 3);

        if (questionType === 0) {
            // Synonym question
            questionEl.textContent = 'Which word means the SAME as this word?';
            const correctAnswer = wordData.synonyms[Math.floor(Math.random() * wordData.synonyms.length)];
            const wrongAnswers = this.getRandomWrongAnswers(correctAnswer, 'synonyms');
            this.createVocabChoices(choicesEl, correctAnswer, wrongAnswers);
        } else if (questionType === 1) {
            // Antonym question
            questionEl.textContent = 'Which word means the OPPOSITE of this word?';
            const correctAnswer = wordData.antonyms[Math.floor(Math.random() * wordData.antonyms.length)];
            const wrongAnswers = this.getRandomWrongAnswers(correctAnswer, 'antonyms');
            this.createVocabChoices(choicesEl, correctAnswer, wrongAnswers);
        } else {
            // Definition match
            questionEl.textContent = 'What does this word mean?';
            const correctAnswer = wordData.definition;
            const wrongDefs = VOCABULARY_WORDS
                .filter(w => w.word !== wordData.word)
                .map(w => w.definition)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);
            this.createVocabChoices(choicesEl, correctAnswer, wrongDefs);
        }

        this.updateReadingProgress();
    }

    getRandomWrongAnswers(correct, type) {
        const allWords = [];
        VOCABULARY_WORDS.forEach(w => {
            if (type === 'synonyms') allWords.push(...w.synonyms);
            else allWords.push(...w.antonyms);
        });
        return allWords
            .filter(w => w !== correct)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
    }

    createVocabChoices(container, correct, wrong) {
        const choices = [correct, ...wrong].sort(() => Math.random() - 0.5);
        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'vocab-choice-btn';
            btn.textContent = choice;
            btn.addEventListener('click', () => this.checkVocabAnswer(choice, correct, btn));
            container.appendChild(btn);
        });
    }

    checkVocabAnswer(selected, correct, button) {
        const buttons = document.querySelectorAll('.vocab-choice-btn');
        buttons.forEach(btn => btn.disabled = true);

        const isCorrect = selected === correct;

        if (isCorrect) {
            button.classList.add('correct');
            this.correctAnswers++;
            this.stats.streak++;
            if (this.stats.streak > this.stats.bestStreak) this.stats.bestStreak = this.stats.streak;
            this.showFeedback(true, this.elements.readingFeedback);
            this.sound.playCorrect();
            this.currentSessionStats.vocabulary.correct++;
        } else {
            button.classList.add('incorrect');
            buttons.forEach(btn => {
                if (btn.textContent === correct) btn.classList.add('correct');
            });
            this.stats.streak = 0;
            this.showFeedback(false, this.elements.readingFeedback);
            this.sound.playIncorrect();
        }

        this.currentSessionStats.vocabulary.attempted++;
        this.stats.totalAttempted++;
        if (isCorrect) this.stats.totalCorrect++;
        this.updateStatsDisplay();
        this.saveStats();

        setTimeout(() => {
            this.currentProblem++;
            this.showVocabularyProblem();
        }, 1500);
    }

    // ==================== COMPREHENSION MODE ====================

    startComprehensionMode() {
        const container = document.getElementById('comprehension-container');
        container.style.display = 'block';

        // Pick a random passage
        this.currentPassage = READING_PASSAGES[Math.floor(Math.random() * READING_PASSAGES.length)];
        this.currentQuestionIndex = 0;
        this.totalProblems = this.currentPassage.questions.length;
        this.elements.readingTotalProblems.textContent = this.totalProblems;

        document.getElementById('passage-title').textContent = this.currentPassage.title;
        document.getElementById('passage-text').textContent = this.currentPassage.passage;

        this.showComprehensionQuestion();
    }

    showComprehensionQuestion() {
        if (this.currentProblem >= this.totalProblems) {
            this.endGame();
            return;
        }

        const question = this.currentPassage.questions[this.currentProblem];
        const questionEl = document.getElementById('comprehension-question');
        const choicesEl = document.getElementById('comprehension-choices');

        questionEl.textContent = question.question;
        choicesEl.innerHTML = '';

        question.choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'comprehension-choice-btn';
            btn.textContent = choice;
            btn.addEventListener('click', () => this.checkComprehensionAnswer(index, question.answer, btn));
            choicesEl.appendChild(btn);
        });

        this.updateReadingProgress();
    }

    checkComprehensionAnswer(selected, correct, button) {
        const buttons = document.querySelectorAll('.comprehension-choice-btn');
        buttons.forEach(btn => btn.disabled = true);

        const isCorrect = selected === correct;

        if (isCorrect) {
            button.classList.add('correct');
            this.correctAnswers++;
            this.stats.streak++;
            if (this.stats.streak > this.stats.bestStreak) this.stats.bestStreak = this.stats.streak;
            this.showFeedback(true, this.elements.readingFeedback);
            this.sound.playCorrect();
            this.currentSessionStats.comprehension.correct++;
        } else {
            button.classList.add('incorrect');
            buttons.forEach((btn, idx) => {
                if (idx === correct) btn.classList.add('correct');
            });
            this.stats.streak = 0;
            this.showFeedback(false, this.elements.readingFeedback);
            this.sound.playIncorrect();
        }

        this.currentSessionStats.comprehension.attempted++;
        this.stats.totalAttempted++;
        if (isCorrect) this.stats.totalCorrect++;
        this.updateStatsDisplay();
        this.saveStats();

        setTimeout(() => {
            this.currentProblem++;
            this.showComprehensionQuestion();
        }, 1500);
    }

    // ==================== SPELLING MODE ====================

    startSpellingMode() {
        const container = document.getElementById('spelling-container');
        container.style.display = 'flex';

        // Get spelling words based on difficulty
        const difficulty = this.spellingDifficulty || 'easy';
        this.spellingWords = [...SPELLING_WORDS[difficulty]].sort(() => Math.random() - 0.5);
        this.totalProblems = Math.min(10, this.spellingWords.length);
        this.elements.readingTotalProblems.textContent = this.totalProblems;

        this.showSpellingProblem();
    }

    showSpellingProblem() {
        if (this.currentProblem >= this.totalProblems) {
            this.endGame();
            return;
        }

        this.currentWord = this.spellingWords[this.currentProblem];
        this.elements.spellingInput.value = '';
        this.elements.spellingInput.disabled = false;
        document.getElementById('submit-spelling').disabled = false;
        this.elements.spellingInput.focus();

        // Speak the word
        this.sound.speakWord(this.currentWord);

        this.updateReadingProgress();
        this.elements.readingFeedback.classList.remove('show', 'correct', 'incorrect');
    }

    checkSpelling() {
        const input = this.elements.spellingInput.value.trim().toLowerCase();
        const correct = this.currentWord.toLowerCase();
        const isCorrect = input === correct;

        this.elements.spellingInput.disabled = true;
        document.getElementById('submit-spelling').disabled = true;

        if (isCorrect) {
            this.elements.spellingInput.classList.add('correct');
            this.correctAnswers++;
            this.stats.streak++;
            if (this.stats.streak > this.stats.bestStreak) this.stats.bestStreak = this.stats.streak;
            this.showFeedback(true, this.elements.readingFeedback);
            this.sound.playCorrect();
            this.currentSessionStats.spelling.correct++;
        } else {
            this.elements.spellingInput.classList.add('incorrect');
            this.stats.streak = 0;
            this.showFeedback(false, this.elements.readingFeedback, `Correct: ${this.currentWord}`);
            this.sound.playIncorrect();
        }

        this.currentSessionStats.spelling.attempted++;
        this.stats.totalAttempted++;
        if (isCorrect) this.stats.totalCorrect++;
        this.updateStatsDisplay();
        this.saveStats();

        setTimeout(() => {
            this.elements.spellingInput.classList.remove('correct', 'incorrect');
            this.currentProblem++;
            this.showSpellingProblem();
        }, 2000);
    }

    updateReadingProgress() {
        this.elements.readingCurrentProblem.textContent = this.currentProblem + 1;
        this.elements.readingProgressFill.style.width = `${(this.currentProblem / this.totalProblems) * 100}%`;
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
        const readingTypes = ['vocabulary', 'comprehension', 'spelling', 'story'];
        readingTypes.forEach(type => {
            const stats = this.stats.reading?.[type] || { correct: 0, attempted: 0 };
            const accuracy = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;
            const bar = document.getElementById(`accuracy-${type}`);
            const text = document.getElementById(`accuracy-${type}-text`);
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
            { key: 'vocabulary', name: 'Vocabulary', icon: '📝', stats: this.stats.reading?.vocabulary },
            { key: 'comprehension', name: 'Comprehension', icon: '🔍', stats: this.stats.reading?.comprehension },
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
                vocabulary: { correct: 0, attempted: 0 },
                comprehension: { correct: 0, attempted: 0 },
                spelling: { correct: 0, attempted: 0 },
                story: { correct: 0, attempted: 0 }
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
    module.exports = { LearnFunApp, SoundManager, DIFFICULTY_SETTINGS, MATH_LEVEL_SETTINGS, VOCABULARY_WORDS, READING_PASSAGES, SPELLING_WORDS };
}
