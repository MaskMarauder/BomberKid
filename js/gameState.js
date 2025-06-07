const gameState = {
    player: { 
        x: 1,                   // Player's current X position on the grid
        y: 1,                   // Player's current Y position on the grid
        lives: config.INITIAL_LIVES,      // Number of lives player starts with
        maxBombs: config.INITIAL_BOMBS,  // Max bombs player can place simultaneously
        bombRange: config.INITIAL_RANGE   // Explosion range of bombs
    },
    enemies: [],                 // Array holding enemy objects with positions and states
    bombs: [],                   // Array holding active bombs on the board
    powerups: [],                // Array holding power-up items on the board
    score: 0,                   // Player’s current score
    timeLeft: config.INITIAL_TIME,  // Time remaining to complete the current level
    level: 1,                   // Current level number
    active: false,              // Whether the game is currently active (running)
    paused: false               // Whether the game is currently paused
};
