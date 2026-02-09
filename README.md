# Learn & Grow - Math & Reading Fun!

An interactive learning app designed for first graders featuring math skills up to 100 and advanced reading activities including stories, vocabulary, comprehension, and spelling.

## Features

### 🔢 Math Section

#### Game Modes
- **Number Bonds** - Find the missing number that adds up to 10, 20, 50, or 100
- **Addition** - Practice addition with visual place value aids
- **Subtraction** - Master subtraction with regrouping concepts
- **Mixed Practice** - Random mix of all problem types
- **Speed Challenge** - Race against the clock!

#### Math Levels
| Level | Number Range | Description |
|-------|--------------|-------------|
| To 10 | 1-10 | Basic number bonds and operations |
| To 20 | 1-20 | Addition and subtraction to 20 |
| To 50 | 1-50 | Working with larger numbers |
| To 100 | 1-100 | Full range with place value focus |

#### Learning Aids
- **Place Value Display** - Visual representation of tens and ones
- **Ten Frame Visual** - Color-coded visual for numbers up to 10
- **Immediate Feedback** - Encouraging messages for correct/incorrect answers

### 📚 Reading Section

#### Story Adventures
Interactive stories with branching paths where choices affect the outcome:
- **The Magic Garden** - Help Lily discover a mysterious garden
- **Space Explorer** - Join Captain Maya on a space adventure
- **The Friendly Dragon** - Meet Ember the dragon in a mountain village

#### Vocabulary Builder
Learn advanced words with:
- Definitions and example sentences
- Synonyms and antonyms
- Text-to-speech pronunciation
- Multiple choice quizzes

**Sample Words:** magnificent, peculiar, courageous, mysterious, extraordinary, and more!

#### Reading Comprehension
Practice understanding with passages and questions covering:
- Main idea identification
- Detail recall
- Inference skills
- Vocabulary in context

#### Spelling Challenge
Three difficulty levels:
| Level | Example Words |
|-------|---------------|
| Easy | because, friend, beautiful, thought |
| Medium | knowledge, adventure, mysterious, celebrate |
| Hard | extraordinary, encyclopedia, responsibility |

Features audio pronunciation and letter-by-letter feedback.

### 🏆 Reward System
- **Stars** - Earn up to 5 stars per game based on accuracy
- **Streaks** - Track consecutive correct answers
- **Trophies** - Unlock achievements:
  - 🎮 First Game
  - 🥉 50 Correct
  - 🥈 100 Correct
  - 🥇 500 Correct
  - 🔥 10 Streak
  - ⚡ 25 Streak
  - 💫 100 Stars
  - 👑 Perfect Game
  - 🚀 Speed Demon

### 👨‍👩‍👧 Parent Features
- **Dashboard** - Track progress across all activities
- **Teaching Guide** - Tips for reinforcing "Thinking in 10s" strategy
- **Settings** - Adjust difficulty, sound, and visual preferences

## Getting Started

### Option 1: Open Directly
Simply open `index.html` in a web browser.

### Option 2: Local Server
```bash
# Using Python
python3 -m http.server 8000

# Or using npm
npm start
```
Then open http://localhost:8000

### Using on iPad
1. Open the app URL in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. The app will work like a native app!

## Development

### Install Dependencies
```bash
npm install
```

### Run Tests
```bash
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

### Project Structure
```
math-app/
├── index.html      # Main HTML structure
├── styles.css      # Styling and animations
├── app.js          # Game logic and state management
├── package.json    # Project configuration
├── tests/
│   └── app.test.js # Unit tests
└── README.md
```

## Technical Details

- **No dependencies** - Pure HTML, CSS, and JavaScript
- **Web Audio API** - Sound effects generated programmatically
- **Speech Synthesis API** - Text-to-speech for vocabulary words
- **localStorage** - Progress and settings are saved locally
- **Responsive Design** - Works on phones, tablets, and desktops
- **PWA Ready** - Can be installed as a home screen app
- **CI/CD** - Automated testing and deployment via GitHub Actions

## License

MIT
