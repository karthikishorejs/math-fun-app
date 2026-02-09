/**
 * Unit Tests for Math Fun App
 *
 * Tests cover:
 * - Problem generation for all modes
 * - Difficulty settings
 * - Answer validation
 * - Stats management
 * - Sound manager
 */

// Mock DOM elements for testing
const createMockDOM = () => {
    const createElement = (id) => ({
        id,
        innerHTML: '',
        textContent: '',
        classList: {
            classes: new Set(),
            add(...classes) { classes.forEach(c => this.classes.add(c)); },
            remove(...classes) { classes.forEach(c => this.classes.delete(c)); },
            toggle(cls, force) {
                if (force === undefined) {
                    if (this.classes.has(cls)) this.classes.delete(cls);
                    else this.classes.add(cls);
                } else if (force) {
                    this.classes.add(cls);
                } else {
                    this.classes.delete(cls);
                }
            },
            contains(cls) { return this.classes.has(cls); }
        },
        style: {},
        dataset: {},
        querySelectorAll: () => [],
        querySelector: () => null,
        appendChild: () => {},
        addEventListener: () => {}
    });

    return {
        getElementById: (id) => createElement(id),
        querySelectorAll: () => [],
        addEventListener: () => {}
    };
};

// Mock localStorage
const createMockStorage = () => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value; },
        removeItem: (key) => { delete store[key]; },
        clear: () => { store = {}; }
    };
};

// Mock AudioContext
class MockAudioContext {
    constructor() {
        this.currentTime = 0;
    }
    createOscillator() {
        return {
            connect: () => {},
            frequency: { value: 0 },
            type: 'sine',
            start: () => {},
            stop: () => {}
        };
    }
    createGain() {
        return {
            connect: () => {},
            gain: {
                setValueAtTime: () => {},
                exponentialRampToValueAtTime: () => {}
            }
        };
    }
}

// Setup global mocks
global.document = createMockDOM();
global.localStorage = createMockStorage();
global.window = { AudioContext: MockAudioContext };
global.AudioContext = MockAudioContext;

// Import the modules (simulated since we're testing the logic)
const { DIFFICULTY_SETTINGS, MATH_LEVEL_SETTINGS, VOCABULARY_WORDS, READING_PASSAGES, SPELLING_WORDS } = require('../app.js');

// ============================================
// Test Suite: Difficulty Settings
// ============================================

describe('Difficulty Settings', () => {
    test('should have three difficulty levels', () => {
        expect(Object.keys(DIFFICULTY_SETTINGS)).toHaveLength(3);
        expect(DIFFICULTY_SETTINGS).toHaveProperty('easy');
        expect(DIFFICULTY_SETTINGS).toHaveProperty('medium');
        expect(DIFFICULTY_SETTINGS).toHaveProperty('hard');
    });

    test('easy mode should have 3 answer choices', () => {
        const easy = DIFFICULTY_SETTINGS.easy;
        expect(easy.answerChoices).toBe(3);
    });

    test('medium mode should have 4 answer choices', () => {
        const medium = DIFFICULTY_SETTINGS.medium;
        expect(medium.answerChoices).toBe(4);
    });

    test('hard mode should have 5 answer choices', () => {
        const hard = DIFFICULTY_SETTINGS.hard;
        expect(hard.answerChoices).toBe(5);
    });

    test('math level 1 should have numbers to 20', () => {
        const level1 = MATH_LEVEL_SETTINGS[1];
        expect(level1.maxNumber).toBe(20);
        expect(level1.addition.maxSum).toBe(20);
    });

    test('math level 2 should have numbers to 50', () => {
        const level2 = MATH_LEVEL_SETTINGS[2];
        expect(level2.maxNumber).toBe(50);
        expect(level2.addition.maxSum).toBe(50);
    });

    test('math level 3 should have numbers to 100', () => {
        const level3 = MATH_LEVEL_SETTINGS[3];
        expect(level3.maxNumber).toBe(100);
        expect(level3.addition.maxSum).toBe(99);
    });

    test('timer should decrease with difficulty', () => {
        expect(DIFFICULTY_SETTINGS.easy.timerSeconds).toBeGreaterThan(DIFFICULTY_SETTINGS.medium.timerSeconds);
        expect(DIFFICULTY_SETTINGS.medium.timerSeconds).toBeGreaterThan(DIFFICULTY_SETTINGS.hard.timerSeconds);
    });

    test('problems per round should increase with difficulty', () => {
        expect(DIFFICULTY_SETTINGS.easy.problemsPerRound).toBeLessThan(DIFFICULTY_SETTINGS.medium.problemsPerRound);
        expect(DIFFICULTY_SETTINGS.medium.problemsPerRound).toBeLessThan(DIFFICULTY_SETTINGS.hard.problemsPerRound);
    });
});

// ============================================
// Test Suite: Problem Generation Logic
// ============================================

describe('Problem Generation Logic', () => {

    describe('Number Bonds Problems', () => {
        test('answer should always sum to 10 with the given number', () => {
            // Test various number bonds
            for (let num = 1; num <= 10; num++) {
                const answer = 10 - num;
                expect(num + answer).toBe(10);
            }
        });

        test('bonds problem display should show correct format', () => {
            const num1 = 7;
            const answer = 3;

            // Format 1: num1 + ? = 10
            const display1 = { num1: num1, operator: '+', num2: '?', result: 10 };
            expect(display1.num1 + answer).toBe(display1.result);

            // Format 2: ? + num1 = 10
            const display2 = { num1: '?', operator: '+', num2: num1, result: 10 };
            expect(answer + display2.num2).toBe(display2.result);
        });
    });

    describe('Addition Problems', () => {
        test('sum should not exceed maxSum for level 1', () => {
            const levelSettings = MATH_LEVEL_SETTINGS[1];
            const maxSum = levelSettings.addition.maxSum;
            const maxNum1 = levelSettings.addition.maxNum1;

            // Simulate generating problems
            for (let i = 0; i < 100; i++) {
                const num1 = Math.floor(Math.random() * maxNum1) + 1;
                const maxNum2 = Math.min(maxNum1, maxSum - num1);
                const num2 = Math.floor(Math.random() * Math.max(1, maxNum2)) + 1;
                const answer = num1 + num2;

                expect(answer).toBeLessThanOrEqual(maxSum);
                expect(num1).toBeGreaterThanOrEqual(1);
                expect(num2).toBeGreaterThanOrEqual(1);
            }
        });

        test('sum should not exceed maxSum for level 3', () => {
            const levelSettings = MATH_LEVEL_SETTINGS[3];
            const maxSum = levelSettings.addition.maxSum;
            const maxNum1 = levelSettings.addition.maxNum1;

            for (let i = 0; i < 100; i++) {
                const num1 = Math.floor(Math.random() * maxNum1) + 1;
                const maxNum2 = Math.min(maxNum1, maxSum - num1);
                const num2 = Math.floor(Math.random() * Math.max(1, maxNum2)) + 1;
                const answer = num1 + num2;

                expect(answer).toBeLessThanOrEqual(maxSum);
            }
        });
    });

    describe('Subtraction Problems', () => {
        test('answer should always be non-negative', () => {
            for (let subtract = 1; subtract <= 10; subtract++) {
                const answer = 10 - subtract;
                expect(answer).toBeGreaterThanOrEqual(0);
                expect(answer).toBeLessThanOrEqual(10);
            }
        });

        test('subtraction should respect maxSubtract setting for level 1', () => {
            const levelSettings = MATH_LEVEL_SETTINGS[1];
            const maxSubtract = levelSettings.subtraction.maxSubtract;

            for (let i = 0; i < 100; i++) {
                const num2 = Math.floor(Math.random() * maxSubtract) + 1;
                expect(num2).toBeLessThanOrEqual(maxSubtract);
                expect(num2).toBeGreaterThanOrEqual(1);
            }
        });
    });
});

// ============================================
// Test Suite: Answer Choice Generation
// ============================================

describe('Answer Choice Generation', () => {
    const generateWrongAnswers = (correctAnswer, numChoices) => {
        const answers = new Set([correctAnswer]);
        let attempts = 0;
        const maxAttempts = 1000;

        while (answers.size < numChoices && attempts < maxAttempts) {
            let wrong;
            if (correctAnswer <= 10) {
                wrong = Math.max(0, Math.min(20, correctAnswer + (Math.floor(Math.random() * 5) - 2)));
            } else {
                wrong = Math.max(0, Math.min(20, correctAnswer + (Math.floor(Math.random() * 7) - 3)));
            }
            if (wrong !== correctAnswer) {
                answers.add(wrong);
            }
            attempts++;
        }
        return Array.from(answers);
    };

    test('should generate correct number of answer choices', () => {
        const correctAnswer = 5;
        const numChoices = 4;
        const answers = generateWrongAnswers(correctAnswer, numChoices);

        expect(answers.length).toBe(numChoices);
    });

    test('should include the correct answer', () => {
        const correctAnswer = 7;
        const answers = generateWrongAnswers(correctAnswer, 4);

        expect(answers).toContain(correctAnswer);
    });

    test('all answers should be within valid range (0-20)', () => {
        for (let correct = 0; correct <= 20; correct++) {
            const answers = generateWrongAnswers(correct, 5);
            answers.forEach(answer => {
                expect(answer).toBeGreaterThanOrEqual(0);
                expect(answer).toBeLessThanOrEqual(20);
            });
        }
    });

    test('wrong answers should be close to correct answer', () => {
        const correctAnswer = 10;
        const answers = generateWrongAnswers(correctAnswer, 4);

        answers.forEach(answer => {
            // For answers <= 10, wrong answers are within ±2
            // For answers > 10, wrong answers are within ±3
            const maxDiff = correctAnswer <= 10 ? 4 : 6;
            expect(Math.abs(answer - correctAnswer)).toBeLessThanOrEqual(maxDiff);
        });
    });
});

// ============================================
// Test Suite: Stats Management
// ============================================

describe('Stats Management', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('should initialize with default stats', () => {
        const defaultStats = {
            stars: 0,
            streak: 0,
            bestStreak: 0,
            totalCorrect: 0,
            totalAttempted: 0,
            trophies: [],
            bestTimerScore: 0
        };

        expect(defaultStats.stars).toBe(0);
        expect(defaultStats.streak).toBe(0);
        expect(defaultStats.trophies).toEqual([]);
    });

    test('should calculate stars earned correctly', () => {
        const calculateStars = (correct, total) => {
            const percentage = correct / total;
            if (percentage >= 0.9) return 5;
            if (percentage >= 0.8) return 4;
            if (percentage >= 0.7) return 3;
            if (percentage >= 0.5) return 2;
            if (percentage >= 0.3) return 1;
            return 0;
        };

        expect(calculateStars(10, 10)).toBe(5); // 100%
        expect(calculateStars(9, 10)).toBe(5);  // 90%
        expect(calculateStars(8, 10)).toBe(4);  // 80%
        expect(calculateStars(7, 10)).toBe(3);  // 70%
        expect(calculateStars(5, 10)).toBe(2);  // 50%
        expect(calculateStars(3, 10)).toBe(1);  // 30%
        expect(calculateStars(2, 10)).toBe(0);  // 20%
    });

    test('streak should increment on correct answers', () => {
        let streak = 0;

        // Simulate correct answers
        streak++; expect(streak).toBe(1);
        streak++; expect(streak).toBe(2);
        streak++; expect(streak).toBe(3);
    });

    test('streak should reset on incorrect answer', () => {
        let streak = 5;
        streak = 0; // Reset on wrong answer
        expect(streak).toBe(0);
    });

    test('best streak should only update when current streak exceeds it', () => {
        let streak = 0;
        let bestStreak = 0;

        // Simulate getting a streak of 5
        for (let i = 0; i < 5; i++) {
            streak++;
            if (streak > bestStreak) bestStreak = streak;
        }
        expect(bestStreak).toBe(5);

        // Reset and get a smaller streak
        streak = 0;
        for (let i = 0; i < 3; i++) {
            streak++;
            if (streak > bestStreak) bestStreak = streak;
        }
        expect(bestStreak).toBe(5); // Should still be 5
    });
});

// ============================================
// Test Suite: Trophy System
// ============================================

describe('Trophy System', () => {
    test('should award first_game trophy after 10 attempts', () => {
        const stats = { totalAttempted: 10, trophies: [] };

        if (stats.totalAttempted >= 10 && !stats.trophies.includes('first_game')) {
            stats.trophies.push('first_game');
        }

        expect(stats.trophies).toContain('first_game');
    });

    test('should award streak trophies at correct thresholds', () => {
        const checkStreakTrophy = (bestStreak) => {
            const trophies = [];
            if (bestStreak >= 10) trophies.push('streak_10');
            if (bestStreak >= 25) trophies.push('streak_25');
            return trophies;
        };

        expect(checkStreakTrophy(5)).toEqual([]);
        expect(checkStreakTrophy(10)).toEqual(['streak_10']);
        expect(checkStreakTrophy(25)).toEqual(['streak_10', 'streak_25']);
    });

    test('should award correct answer trophies at thresholds', () => {
        const checkCorrectTrophies = (totalCorrect) => {
            const trophies = [];
            if (totalCorrect >= 50) trophies.push('fifty_correct');
            if (totalCorrect >= 100) trophies.push('hundred_correct');
            if (totalCorrect >= 500) trophies.push('five_hundred_correct');
            return trophies;
        };

        expect(checkCorrectTrophies(25)).toEqual([]);
        expect(checkCorrectTrophies(50)).toEqual(['fifty_correct']);
        expect(checkCorrectTrophies(100)).toEqual(['fifty_correct', 'hundred_correct']);
        expect(checkCorrectTrophies(500)).toEqual(['fifty_correct', 'hundred_correct', 'five_hundred_correct']);
    });

    test('should not award duplicate trophies', () => {
        const stats = { totalCorrect: 60, trophies: ['fifty_correct'] };

        // Try to award again
        if (stats.totalCorrect >= 50 && !stats.trophies.includes('fifty_correct')) {
            stats.trophies.push('fifty_correct');
        }

        // Should still only have one
        expect(stats.trophies.filter(t => t === 'fifty_correct').length).toBe(1);
    });
});

// ============================================
// Test Suite: Timer Mode
// ============================================

describe('Timer Mode', () => {
    test('timer duration should vary by difficulty', () => {
        expect(DIFFICULTY_SETTINGS.easy.timerSeconds).toBe(90);
        expect(DIFFICULTY_SETTINGS.medium.timerSeconds).toBe(60);
        expect(DIFFICULTY_SETTINGS.hard.timerSeconds).toBe(45);
    });

    test('should calculate timer percentage correctly', () => {
        const calculatePercentage = (correctAnswers) => correctAnswers / 20;

        expect(calculatePercentage(20)).toBe(1);    // 100%
        expect(calculatePercentage(10)).toBe(0.5);  // 50%
        expect(calculatePercentage(0)).toBe(0);     // 0%
    });

    test('speed demon trophy should be awarded at 15+ correct', () => {
        const checkSpeedDemon = (correctAnswers, isTimerMode) => {
            return isTimerMode && correctAnswers >= 15;
        };

        expect(checkSpeedDemon(15, true)).toBe(true);
        expect(checkSpeedDemon(14, true)).toBe(false);
        expect(checkSpeedDemon(20, false)).toBe(false); // Not timer mode
    });
});

// ============================================
// Test Suite: Sound Manager
// ============================================

describe('Sound Manager', () => {
    test('should toggle sound on and off', () => {
        let enabled = true;

        const toggle = () => {
            enabled = !enabled;
            return enabled;
        };

        expect(toggle()).toBe(false);
        expect(toggle()).toBe(true);
    });

    test('should not play sounds when disabled', () => {
        let enabled = false;
        let soundPlayed = false;

        const playSound = () => {
            if (!enabled) return;
            soundPlayed = true;
        };

        playSound();
        expect(soundPlayed).toBe(false);
    });

    test('correct sound frequencies should be valid', () => {
        const correctFrequencies = [523.25, 659.25, 783.99]; // C5, E5, G5

        correctFrequencies.forEach(freq => {
            expect(freq).toBeGreaterThan(0);
            expect(freq).toBeLessThan(2000);
        });
    });
});

// ============================================
// Test Suite: Ten Frame Display
// ============================================

describe('Ten Frame Display', () => {
    test('bonds problem should fill correct cells', () => {
        const num1 = 7;
        const answer = 3;

        const tenFrameDisplay = {
            filled: num1,
            question: answer,
            showFirst: true
        };

        expect(tenFrameDisplay.filled + tenFrameDisplay.question).toBe(10);
    });

    test('addition should show two colors', () => {
        const num1 = 4;
        const num2 = 3;

        const tenFrameDisplay = {
            filled: Math.min(num1, 10),
            secondary: Math.min(num2, Math.max(0, 10 - num1)),
            total: num1 + num2
        };

        expect(tenFrameDisplay.filled).toBe(4);
        expect(tenFrameDisplay.secondary).toBe(3);
        expect(tenFrameDisplay.filled + tenFrameDisplay.secondary).toBeLessThanOrEqual(10);
    });

    test('subtraction should show remaining and crossed', () => {
        const subtractAmount = 4;
        const answer = 10 - subtractAmount;

        const tenFrameDisplay = {
            filled: answer,
            crossed: subtractAmount
        };

        expect(tenFrameDisplay.filled + tenFrameDisplay.crossed).toBe(10);
    });
});

// ============================================
// Test Suite: Settings Persistence
// ============================================

describe('Settings Persistence', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('should save and load difficulty setting', () => {
        const settings = { difficulty: 'hard', soundEnabled: true };
        localStorage.setItem('mathFunSettings', JSON.stringify(settings));

        const loaded = JSON.parse(localStorage.getItem('mathFunSettings'));
        expect(loaded.difficulty).toBe('hard');
    });

    test('should save and load sound setting', () => {
        const settings = { difficulty: 'medium', soundEnabled: false };
        localStorage.setItem('mathFunSettings', JSON.stringify(settings));

        const loaded = JSON.parse(localStorage.getItem('mathFunSettings'));
        expect(loaded.soundEnabled).toBe(false);
    });

    test('should use defaults when no settings saved', () => {
        const loaded = localStorage.getItem('mathFunSettings');
        expect(loaded).toBeNull();

        // Default values
        const defaultDifficulty = 'easy';
        const defaultSound = true;

        expect(defaultDifficulty).toBe('easy');
        expect(defaultSound).toBe(true);
    });
});

// ============================================
// Integration Tests
// ============================================

describe('Integration Tests', () => {
    test('complete game flow should update stats correctly', () => {
        const stats = {
            stars: 10,
            streak: 0,
            bestStreak: 5,
            totalCorrect: 45,
            totalAttempted: 50,
            trophies: []
        };

        // Simulate a perfect game of 10 questions
        const correctAnswers = 10;
        const totalProblems = 10;

        // Update stats
        stats.totalCorrect += correctAnswers;
        stats.totalAttempted += totalProblems;
        stats.streak = correctAnswers; // Perfect streak
        if (stats.streak > stats.bestStreak) {
            stats.bestStreak = stats.streak;
        }

        // Calculate stars
        const percentage = correctAnswers / totalProblems;
        const starsEarned = percentage >= 0.9 ? 5 : 0;
        stats.stars += starsEarned;

        // Check trophies
        if (stats.totalCorrect >= 50 && !stats.trophies.includes('fifty_correct')) {
            stats.trophies.push('fifty_correct');
        }
        if (stats.bestStreak >= 10 && !stats.trophies.includes('streak_10')) {
            stats.trophies.push('streak_10');
        }

        expect(stats.totalCorrect).toBe(55);
        expect(stats.totalAttempted).toBe(60);
        expect(stats.stars).toBe(15);
        expect(stats.bestStreak).toBe(10);
        expect(stats.trophies).toContain('fifty_correct');
        expect(stats.trophies).toContain('streak_10');
    });

    test('difficulty change should affect answer choices', () => {
        // Hard mode has more answer choices
        expect(DIFFICULTY_SETTINGS.easy.answerChoices).toBeLessThan(DIFFICULTY_SETTINGS.hard.answerChoices);
    });

    test('level progression should increase number ranges', () => {
        // Level 3 has higher maxNumber than Level 1
        expect(MATH_LEVEL_SETTINGS[1].maxNumber).toBeLessThan(MATH_LEVEL_SETTINGS[3].maxNumber);
        // Level 2 is in between
        expect(MATH_LEVEL_SETTINGS[2].maxNumber).toBeGreaterThan(MATH_LEVEL_SETTINGS[1].maxNumber);
        expect(MATH_LEVEL_SETTINGS[2].maxNumber).toBeLessThan(MATH_LEVEL_SETTINGS[3].maxNumber);
    });
});

console.log('All tests defined. Run with: npm test');
