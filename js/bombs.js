// Functions related to bomb mechanics in the game

// Places a bomb at the player's current position
function placeBomb() {
    // Limit the number of bombs placed based on player's max allowed bombs
    if (gameState.bombs.length >= gameState.player.maxBombs) return;

    // Get the cell where the player currently is
    const cell = document.getElementById(`cell-${gameState.player.x}-${gameState.player.y}`);

    // Prevent placing a bomb if there is already one in this cell
    if (cell.classList.contains('bomb')) return;

    // Add a new bomb object to the bombs array with position, timer, and range
    gameState.bombs.push({
        x: gameState.player.x,
        y: gameState.player.y,
        timer: 20,               // Countdown timer before explosion
        range: gameState.player.bombRange  // Explosion range of the bomb
    });

    // Visually mark the cell as containing a bomb
    cell.classList.add('bomb');

    // Create a text element showing the bomb's countdown (starting at 3)
    const bombText = document.createElement('div');
    bombText.textContent = '3';
    cell.appendChild(bombText);

    // Play the bomb placement sound from the start
    gameState.sounds.bomb.currentTime = 0;
    gameState.sounds.bomb.play();
}

// Updates all bombs every game tick: decreases timer, handles explosion when timer ends
function updateBombs() {
    gameState.bombs.forEach((bomb, index) => {
        const cell = document.getElementById(`cell-${bomb.x}-${bomb.y}`);
        const bombText = cell.querySelector('div');

        bomb.timer--;  // Decrease the bomb timer by 1

        // If timer reaches zero or less, trigger explosion
        if (bomb.timer <= 0) {
            explodeBomb(bomb.x, bomb.y, bomb.range);
            // Remove bomb from the bombs array
            gameState.bombs.splice(index, 1);
            // Remove bomb visual marker and text from cell
            cell.classList.remove('bomb');
            cell.innerHTML = '';
        } else if (bomb.timer % 10 === 0) {
            // Update countdown text every 10 ticks (showing seconds)
            bombText.textContent = (bomb.timer / 10 + 1).toString();
        }
    });
}

// Handles the bomb explosion logic and visual effects
function explodeBomb(x, y, range) {
    // Play explosion sound from the start
    gameState.sounds.explosion.currentTime = 0;
    gameState.sounds.explosion.play();

    // Create explosion and particle effects at the bomb's location
    createParticles(x, y);
    createExplosion(x, y);

    // Directions to propagate the explosion (up, down, left, right)
    const directions = [
        { dx: 0, dy: -1 }, { dx: 0, dy: 1 },
        { dx: -1, dy: 0 }, { dx: 1, dy: 0 }
    ];

    // For each direction, propagate the explosion up to the bomb's range
    directions.forEach(dir => {
        for (let i = 1; i <= range; i++) {
            const newX = x + dir.dx * i;
            const newY = y + dir.dy * i;
            const cell = document.getElementById(`cell-${newX}-${newY}`);

            // Stop explosion propagation if the cell doesn't exist or is a solid wall
            if (!cell || cell.classList.contains('wall')) break;

            // Create explosion and particle effects on the current cell
            createExplosion(newX, newY);
            createParticles(newX, newY);

            // Handle the effects caused by the explosion in the cell (breaking blocks, hitting player/enemy)
            handleBombExplosionEffects(newX, newY, cell);
        }
    });
}

// Handles the effects triggered by the bomb explosion on a given cell
function handleBombExplosionEffects(x, y, cell) {
    // If the cell contains a breakable block
    if (cell.classList.contains('breakable')) {
        cell.classList.remove('breakable'); // Remove the breakable block class
        cell.classList.add('explosion');    // Show explosion effect

        // Check if a powerup is hidden in this cell and reveal it
        const powerupIndex = gameState.powerups.findIndex(p => p.x === x && p.y === y);
        if (powerupIndex !== -1) {
            revealPowerup(x, y, powerupIndex, cell);
        }

        // Remove explosion effect shortly after (if no powerup is present)
        setTimeout(() => {
            if (!cell.classList.contains('powerup')) {
                cell.classList.remove('explosion');
            }
        }, 300);

        // Increase score for destroying a breakable block
        gameState.score += 10;
        updateUI(); // Update score and other UI elements
        return true;
    }

    // Check if the explosion hit the player
    if (x === gameState.player.x && y === gameState.player.y) {
        playerHit();  // Handle player getting hit
    }

    // Check if the explosion hit an enemy
    handleEnemyHit(x, y, cell);

    // Check for chain reactions with other bombs nearby
    handleBombChainReaction(x, y, cell);

    return false;
}

// Reveals a power-up item in a given cell after destroying a block
function revealPowerup(x, y, index, cell) {
    const powerup = gameState.powerups[index];
    const powerupElement = document.createElement('div');
    powerupElement.className = 'powerup';

    // Assign text and color based on the powerup type
    if (powerup.type === 0) {
        powerupElement.textContent = 'B';    // Example: Bomb powerup
        powerupElement.style.color = '#FF0';
    } else if (powerup.type === 1) {
        powerupElement.textContent = 'R';    // Example: Range powerup
        powerupElement.style.color = '#0FF';
    } else {
        powerupElement.textContent = 'L';    // Example: Life powerup
        powerupElement.style.color = '#F0F';
    }

    // Clear the cell and add the powerup element visually
    cell.innerHTML = '';
    cell.appendChild(powerupElement);
}

// Handles enemy removal if hit by the explosion, and updates score
function handleEnemyHit(x, y, cell) {
    gameState.enemies.forEach((enemy, index) => {
        if (enemy.x === x && enemy.y === y) {
            cell.classList.remove('enemy');       // Remove enemy visual
            gameState.enemies.splice(index, 1);   // Remove enemy from the list
            gameState.score += 50;                 // Add score for enemy kill
            updateUI();

            // If all enemies are defeated, reveal the exit cell
            if (gameState.enemies.length === 0) {
                const exitCell = document.getElementById(`cell-${config.BOARD_SIZE-3}-${config.BOARD_SIZE-2}`);
                exitCell.classList.add('exit');
            }
        }
    });
}

// Handles chain reaction if the explosion hits another bomb
function handleBombChainReaction(x, y, cell) {
    if (cell.classList.contains('bomb')) {
        const bombIndex = gameState.bombs.findIndex(b => b.x === x && b.y === y);
        if (bombIndex !== -1) {
            gameState.bombs[bombIndex].timer = 1; // Trigger bomb to explode almost immediately
        }
    }
}

// Creates a visual explosion effect on the specified cell
function createExplosion(x, y) {
    const cell = document.getElementById(`cell-${x}-${y}`);
    const explosion = document.createElement('div');
    explosion.className = 'explosion';
    cell.appendChild(explosion);

    // Remove the explosion effect after a short delay
    setTimeout(() => {
        explosion.remove();
    }, 300);
}

// Creates particle effects simulating explosion debris on the specified cell
function createParticles(x, y) {
    const cell = document.getElementById(`cell-${x}-${y}`);
    const rect = cell.getBoundingClientRect();

    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';

        // Random angle and distance for particle movement
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 30 + 10;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        // Set CSS custom properties to control particle translation animation
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        // Position the particle in the center of the cell
        particle.style.left = `${rect.width / 2 - 4}px`;
        particle.style.top = `${rect.height / 2 - 4}px`;

        cell.appendChild(particle);

        // Remove the particle after the animation duration
        setTimeout(() => {
            particle.remove();
        }, 500);
    }
}
