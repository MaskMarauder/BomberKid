// Enemy-related functions

// Spawn a given number of enemies at random valid positions on the board
function spawnEnemies(count) {
    gameState.enemies = [];  // Clear existing enemies
    
    for (let i = 0; i < count; i++) {
        let x, y;
        // Keep generating positions until a valid one is found
        do {
            x = Math.floor(Math.random() * (config.BOARD_SIZE - 2)) + 1;  // Avoid edges
            y = Math.floor(Math.random() * (config.BOARD_SIZE - 2)) + 1;
        } while (!isValidEnemyPosition(x, y));
        
        // Add new enemy with initial position, no movement (dx, dy), random speed, and timer for movement
        gameState.enemies.push({ 
            x, y, dx: 0, dy: 0,
            speed: Math.random() < 0.3 ? 2 : 1,  // 30% chance of speed 2, otherwise 1
            moveTimer: 0
        });
        
        // Mark the cell visually as occupied by an enemy
        document.getElementById(`cell-${x}-${y}`).classList.add('enemy');
    }
}

// Check if a given position is valid for placing an enemy
function isValidEnemyPosition(x, y) {
    return !(x === gameState.player.x && y === gameState.player.y) &&  // Not player's position
           !(x === config.BOARD_SIZE - 2 && y === config.BOARD_SIZE - 2) && // Not exit position
           !document.getElementById(`cell-${x}-${y}`).classList.contains('wall') &&   // Not a wall
           !document.getElementById(`cell-${x}-${y}`).classList.contains('breakable'); // Not a breakable block
}

// Move all enemies according to their speed and direction, with simple AI for random direction changes
function moveEnemies() {
    gameState.enemies.forEach(enemy => {
        const currentCell = document.getElementById(`cell-${enemy.x}-${enemy.y}`);
        currentCell.classList.remove('enemy');  // Remove enemy visual from old cell
        
        if (enemy.moveTimer <= 0) {
            // 30% chance to change direction or if currently not moving
            if (Math.random() < 0.3 || (enemy.dx === 0 && enemy.dy === 0)) {
                const directions = [
                    { dx: 1, dy: 0 }, { dx: -1, dy: 0 },
                    { dx: 0, dy: 1 }, { dx: 0, dy: -1 }
                ];
                // Pick a random direction from possible moves
                const randomDir = directions[Math.floor(Math.random() * directions.length)];
                enemy.dx = randomDir.dx;
                enemy.dy = randomDir.dy;
                // Reset move timer based on speed: faster enemies update more frequently
                enemy.moveTimer = enemy.speed === 1 ? 3 : 2;
            }
        } else {
            enemy.moveTimer--;  // Count down move timer before next possible move
        }
        
        const newX = enemy.x + enemy.dx;
        const newY = enemy.y + enemy.dy;
        const newCell = document.getElementById(`cell-${newX}-${newY}`);
        
        // Check if the new position is valid for movement
        if (isValidEnemyMove(newX, newY, newCell)) {
            enemy.x = newX;
            enemy.y = newY;
        } else {
            // Invalid move, stop movement
            enemy.dx = 0;
            enemy.dy = 0;
        }
        
        // Add enemy visual to the new cell
        document.getElementById(`cell-${enemy.x}-${enemy.y}`).classList.add('enemy');
        
        // If enemy collides with player, trigger player hit event
        if (enemy.x === gameState.player.x && enemy.y === gameState.player.y) {
            playerHit();
        }
    });
}

// Check if the enemy's move to the specified position is allowed (inside board and no obstacles)
function isValidEnemyMove(x, y, cell) {
    return x > 0 && x < config.BOARD_SIZE - 1 &&  // Inside horizontal bounds
           y > 0 && y < config.BOARD_SIZE - 1 &&  // Inside vertical bounds
           !cell.classList.contains('wall') &&    // Not blocked by wall
           !cell.classList.contains('breakable') && // Not blocked by breakable block
           !cell.classList.contains('bomb') &&    // Not blocked by bomb
           !cell.classList.contains('explosion'); // Not inside explosion area
}
