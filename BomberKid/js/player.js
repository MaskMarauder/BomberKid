// Functions related to the player

// Update the player's position on the board by removing old player class and adding it to the new cell
function updatePlayerPosition() {
    document.querySelectorAll('.player').forEach(el => el.classList.remove('player'));
    const playerCell = document.getElementById(`cell-${gameState.player.x}-${gameState.player.y}`);
    playerCell.classList.add('player');
}

// Handle when the player gets hit by reducing lives and updating UI; reset position or end game if no lives left
function playerHit() {
    gameState.player.lives--;
    updateUI();
    
    if (gameState.player.lives <= 0) {
        gameOver();
    } else {
        // Reset player to starting position
        gameState.player.x = 1;
        gameState.player.y = 1;
        updatePlayerPosition();
    }
}

// Handle key press events to move player or place bomb; also handles pausing the game with Escape key
function handleKeyPress(e) {
    if (!gameState.active || gameState.paused) return;
    
    if (e.key.toLowerCase() === 'escape') {
        togglePause();
        return;
    }
    
    let newX = gameState.player.x;
    let newY = gameState.player.y;
    
    // WASD controls for movement; space to place bomb
    switch(e.key) {
        case 'w': newY--; break;
        case 's': newY++; break;
        case 'a': newX--; break;
        case 'd': newX++; break;
        case ' ': placeBomb(); return;
        default: return;
    }
    
    const newCell = document.getElementById(`cell-${newX}-${newY}`);
    if (isValidPosition(newX, newY, newCell)) {
        gameState.player.x = newX;
        gameState.player.y = newY;
        updatePlayerPosition();
        
        // If player moves into an enemy, they get hit
        if (newCell.classList.contains('enemy')) playerHit();
        
        checkPowerups(newX, newY, newCell);
        checkExit(newX, newY);
    }
}

// Check if the new position is inside the board and not blocked by walls, breakables or bombs
function isValidPosition(x, y, cell) {
    return x > 0 && x < config.BOARD_SIZE - 1 &&
           y > 0 && y < config.BOARD_SIZE - 1 &&
           !cell.classList.contains('wall') &&
           !cell.classList.contains('breakable') &&
           !cell.classList.contains('bomb');
}

// Check if player landed on a powerup cell, apply powerup and remove it from the game state and UI
function checkPowerups(x, y, cell) {
    gameState.powerups.forEach((powerup, index) => {
        if (powerup.x === x && powerup.y === y) {
            applyPowerup(powerup.type);
            gameState.powerups.splice(index, 1);
            cell.innerHTML = '';
        }
    });
}

// Check if player reached exit after defeating all enemies, triggering level completion
function checkExit(x, y) {
    if (gameState.enemies.length === 0 && 
        x === config.BOARD_SIZE - 3 && 
        y === config.BOARD_SIZE - 2) {
        completeLevel();
    }
}
