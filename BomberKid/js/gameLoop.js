// Starts the game: hides start screen, sets game state to active, initializes game and loops
function startGame() {
    dom.gameStart.style.display = 'none';  // Hide start UI
    gameState.active = true;
    gameState.paused = false;
    initGame();      // Setup/reset game board and variables
    startGameLoop(); // Begin game and timer loops
}

// Sets up game and timer intervals for game updates
function startGameLoop() {
    if (gameState.gameInterval) clearInterval(gameState.gameInterval);
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);
    
    gameState.gameInterval = setInterval(updateGame, 100);   // Run updateGame every 100ms
    gameState.timerInterval = setInterval(updateTimer, 1000); // Run updateTimer every second
}

// Called frequently to update game logic (enemy moves, bombs, etc)
function updateGame() {
    if (!gameState.active || gameState.paused) return;  // Stop if game inactive or paused
    moveEnemies();   // Move enemies
    updateBombs();   // Update bombs (explosions, timers)
}

// Called every second to update countdown timer and UI; triggers game over if time runs out
function updateTimer() {
    if (!gameState.active || gameState.paused) return;
    
    gameState.timeLeft--;
    updateUI();   // Update displayed time and other UI elements
    
    if (gameState.timeLeft <= 0) {
        gameOver();  // End game if no time remains
    }
}

// Called when player completes a level; shows score bonuses and loads next level or victory screen
function completeLevel() {
    clearInterval(gameState.gameInterval);
    clearInterval(gameState.timerInterval);
    
    const timeBonus = Math.floor(gameState.timeLeft / 10) * 10;
    gameState.score += timeBonus + config.LEVEL_SCORE_BONUS;
    
    dom.levelScore.textContent = `+${config.LEVEL_SCORE_BONUS + timeBonus}`;
    dom.nextLevel.textContent = String(gameState.level + 1).padStart(2, '0');
    dom.levelComplete.style.display = 'flex';
    
    gameState.sounds.levelComplete.currentTime = 0;
    gameState.sounds.levelComplete.play();
    
    // If final level reached, show victory screen
    if (gameState.level >= 5) {
        showVictory();
        return;
    }
    
    // After a 3-second pause, increment level, increase difficulty, reset UI and restart loops
    setTimeout(() => {
        gameState.level++;
        gameState.timeLeft = config.INITIAL_TIME + gameState.level * config.LEVEL_TIME_BONUS;
        gameState.player.maxBombs = Math.min(config.MAX_BOMBS, config.INITIAL_BOMBS + Math.floor(gameState.level / 2));
        gameState.player.bombRange = Math.min(config.MAX_RANGE, config.INITIAL_RANGE + Math.floor(gameState.level / 3));
        
        dom.levelComplete.style.display = 'none';
        initGame();
        startGameLoop();
    }, 3000);
}

// Displays victory message, plays sounds, and creates confetti animation
function showVictory() {
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
    
    dom.gameOver.innerHTML = `
        <h1 class="title" style="color: #FFD700; text-shadow: 4px 4px 0 #FFA500, 8px 8px 0 #806000;">VICTORY!</h1>
        <p style="font-size: 18px; margin: 20px 0;">YOU ARE THE BOMB MASTER!</p>
        <div class="ui-box">
            <div class="ui-icon" style="background-color: #FFD700;"></div>
            <span id="final-score" style="color: #FFD700;">${String(gameState.score).padStart(5, '0')}</span>
        </div>
        <div class="ui-box">
            <div class="ui-icon" style="background-color: #33FF33;"></div>
            <span id="final-level">LEVEL ${String(gameState.level).padStart(2, '0')}</span>
        </div>
        <button class="btn" onclick="resetGame()" style="background-color: #FFD700; box-shadow: 0 5px 0 #806000, 0 0 10px #FFA500;">PLAY AGAIN</button>
    `;
    dom.gameOver.style.display = 'flex';
    
    gameState.sounds.bgMusic.pause();
    gameState.sounds.levelComplete.currentTime = 0;
    gameState.sounds.levelComplete.play();
}

// Creates a single confetti particle with animation, adds it to the DOM, then removes after animation
function createConfetti() {
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '50%';
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = '-10px';
    confetti.style.zIndex = '200';
    confetti.style.transform = 'rotate(45deg)';
    confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
    
    document.getElementById('game-container').appendChild(confetti);
    
    const keyframes = `
        @keyframes confettiFall {
            to { 
                transform: translateY(550px) rotate(360deg); 
                opacity: 0;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.innerHTML = keyframes;
    document.head.appendChild(style);
    
    setTimeout(() => {
        confetti.remove();
        style.remove();
    }, 5000);
}

// Called when game ends (player loses all lives or time runs out), stops game and shows game over screen
function gameOver() {
    gameState.active = false;
    clearInterval(gameState.gameInterval);
    clearInterval(gameState.timerInterval);
    
    dom.finalScore.textContent = String(gameState.score).padStart(5, '0');
    dom.finalLevel.textContent = String(gameState.level).padStart(2, '0');
    dom.gameOver.style.display = 'flex';
    
    gameState.sounds.bgMusic.pause();
    gameState.sounds.gameOver.currentTime = 0;
    gameState.sounds.gameOver.play();
}

// Resets all game variables and UI to initial state, then starts a new game
function resetGame() {
    gameState.player = { 
        x: 1, y: 1, 
        lives: config.INITIAL_LIVES, 
        maxBombs: config.INITIAL_BOMBS,
        bombRange: config.INITIAL_RANGE
    };
    gameState.enemies = [];
    gameState.bombs = [];
    gameState.powerups = [];
    gameState.score = 0;
    gameState.timeLeft = config.INITIAL_TIME;
    gameState.level = 1;
    gameState.active = true;
    gameState.paused = false;
    
    updateUI();
    dom.gameOver.style.display = 'none';
    dom.levelComplete.style.display = 'none';
    
    initGame();
    startGameLoop();
    
    gameState.sounds.bgMusic.currentTime = 0;
    gameState.sounds.bgMusic.play().catch(e => console.log("Audio error:", e));
}
