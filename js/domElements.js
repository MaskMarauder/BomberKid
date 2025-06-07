// DOM elements references for easy access throughout the game
const dom = {
    gameBoard: document.getElementById('game-board'),         // The main game board container
    gameStart: document.getElementById('game-start'),         // Start screen container
    gameOver: document.getElementById('game-over'),           // Game over screen container
    levelComplete: document.getElementById('level-complete'), // Level complete screen container
    livesDisplay: document.getElementById('lives-display'),   // UI element showing player lives count
    scoreDisplay: document.getElementById('score-display'),   // UI element showing current score
    levelDisplay: document.getElementById('level-display'),   // UI element showing current level number
    bombsDisplay: document.getElementById('bombs-display'),   // UI element showing available bombs
    rangeDisplay: document.getElementById('range-display'),   // UI element showing bomb explosion range
    timeDisplay: document.getElementById('time-display'),     // UI element showing remaining time
    finalScore: document.getElementById('final-score'),       // UI element showing final score on game over
    finalLevel: document.getElementById('final-level'),       // UI element showing final level reached on game over
    levelScore: document.getElementById('level-score'),       // UI element showing score achieved in the current level
    nextLevel: document.getElementById('next-level')          // Button or link to proceed to the next level
};
