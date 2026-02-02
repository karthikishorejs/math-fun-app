# Math Fun - Learn to Think in 10s!

A fun, interactive math learning app designed for first graders to practice mental math skills focusing on "thinking in 10s".

## Features

### Game Modes
- **Number Bonds to 10** - Find the missing number that adds up to 10
- **Addition to 20** - Practice addition with visual aids
- **Subtraction from 10** - Subtract numbers from 10
- **Mixed Practice** - Random mix of all problem types
- **Speed Challenge** - Race against the clock!

### Learning Aids
- **Ten Frame Visual** - Color-coded visual representation helps kids see numbers
- **Immediate Feedback** - Encouraging messages for correct/incorrect answers
- **Sound Effects** - Audio feedback (can be toggled on/off)

### Difficulty Levels
| Level | Number Range | Answer Choices | Timer |
|-------|--------------|----------------|-------|
| Easy | 1-5 | 3 | 90s |
| Medium | 1-10 | 4 | 60s |
| Hard | 1-10 (sums to 20) | 5 | 45s |

### Reward System
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
- **localStorage** - Progress and settings are saved locally
- **Responsive Design** - Works on phones, tablets, and desktops
- **PWA Ready** - Can be installed as a home screen app

## License

MIT
