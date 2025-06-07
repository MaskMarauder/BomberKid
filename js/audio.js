// This file initializes all audio elements used throughout the game
// and stores them within the gameState.sounds object for easy access.


// Game sounds stored in the gameState.sounds object
gameState.sounds = {
    // Background music element retrieved by its HTML ID
    bgMusic: document.getElementById('bgMusic'),
    
    // Sound played when a bomb is placed or activated
    bomb: document.getElementById('bombSound'),
    
    // Sound played for the bomb explosion
    explosion: document.getElementById('explosionSound'),
    
    // Sound played when the player collects a power-up
    powerup: document.getElementById('powerupSound'),
    
    // Sound played when the game is over
    gameOver: document.getElementById('gameOverSound'),
    
    // Sound played when a level is successfully completed
    levelComplete: document.getElementById('levelCompleteSound')
};
