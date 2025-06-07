// Functions related to powerups

// Apply the effect of a powerup based on its type
function applyPowerup(type) {
    // Reset and play the powerup sound effect
    gameState.sounds.powerup.currentTime = 0;
    gameState.sounds.powerup.play();
    
    switch(type) {
        case 0: // Bomb+ : Increase the maximum number of bombs player can place (up to max limit)
            if (gameState.player.maxBombs < config.MAX_BOMBS) {
                gameState.player.maxBombs++;
            }
            break;
        case 1: // Range+ : Increase bomb explosion range (up to max limit)
            if (gameState.player.bombRange < config.MAX_RANGE) {
                gameState.player.bombRange++;
            }
            break;
        case 2: // Life : Give the player an extra life
            gameState.player.lives++;
            break;
    }
    
    // Increase player score by 20 points for collecting powerup
    gameState.score += 20;
    updateUI();
}
