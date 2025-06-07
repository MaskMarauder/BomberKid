// Functions related to the user interface

// Update all UI elements to reflect the current game state
function updateUI() {
    // Display current player lives
    dom.livesDisplay.textContent = gameState.player.lives;
    // Display score with leading zeros, padded to 5 digits
    dom.scoreDisplay.textContent = String(gameState.score).padStart(5, '0');
    // Display current level, padded to 2 digits
    dom.levelDisplay.textContent = String(gameState.level).padStart(2, '0');
    // Display number of active bombs / max bombs allowed
    dom.bombsDisplay.textContent = `${gameState.bombs.length}/${gameState.player.maxBombs}`;
    // Display bomb explosion range
    dom.rangeDisplay.textContent = gameState.player.bombRange;
    // Display time left in seconds
    dom.timeDisplay.textContent = gameState.timeLeft;
}

// Toggle pause state for the game
function togglePause() {
    // Flip the paused flag
    gameState.paused = !gameState.paused;
    
    if (gameState.paused) {
        // If paused, stop game and timer intervals
        clearInterval(gameState.gameInterval);
        clearInterval(gameState.timerInterval);
        // Pause background music
        gameState.sounds.bgMusic.pause();
        // Show the pause menu UI
        dom.gameStart.style.display = 'flex';
        dom.gameStart.innerHTML = `
            <h1 class="title">PAUSED</h1>
            <button class="btn" onclick="togglePause()">RESUME</button>
            <div class="controls">
                <div class="control-item">
                    <span class="key">P</span>
                    <span>PAUSE</span>
                </div>
            </div>
        `;
    } else {
        // If resuming, restart game loops and music, hide pause menu
        startGameLoop();
        gameState.sounds.bgMusic.play().catch(e => console.log("Audio error:", e));
        dom.gameStart.style.display = 'none';
    }
}
