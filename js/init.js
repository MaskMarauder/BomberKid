// Game Initialization
function initGame() {
    // Clear the game board content before creating a new one
    dom.gameBoard.innerHTML = '';
    
    // Create the game board with walls, breakables, and grass
    createBoard();
    
    // Set the player starting position on the board
    positionPlayer();
    
    // Spawn enemies based on the current level (increases difficulty)
    spawnEnemies(2 + gameState.level);
    
    // Update the UI elements like score, lives, timer
    updateUI();
    
    // Add event listener for player controls (keyboard input)
    document.addEventListener('keydown', handleKeyPress);
    
    // Set background music volume and play it, with error handling for autoplay restrictions
    gameState.sounds.bgMusic.volume = 0.3;
    gameState.sounds.bgMusic.play().catch(e => console.log("Autoplay prevented:", e));
}

// Function to create the game board layout
function createBoard() {
    // Loop through each row (y-axis)
    for (let y = 0; y < config.BOARD_SIZE; y++) {
        // Loop through each column (x-axis)
        for (let x = 0; x < config.BOARD_SIZE; x++) {
            // Create a div element for each cell
            const cell = document.createElement('div');
            cell.className = 'cell';          // Assign base cell class
            cell.id = `cell-${x}-${y}`;       // Unique id for each cell
            
            // Add walls around the border of the board
            if (x === 0 || y === 0 || x === config.BOARD_SIZE - 1 || y === config.BOARD_SIZE - 1) {
                cell.classList.add('wall');
            } 
            // Add inner walls in a checkered pattern (both coordinates even)
            else if (x % 2 === 0 && y % 2 === 0) {
                cell.classList.add('wall');
            } 
            // Add breakable blocks randomly, avoiding player start and goal positions
            else if (shouldAddBreakable(x, y)) {
                cell.classList.add('breakable');
                
                // Occasionally assign a powerup inside breakable blocks
                if (Math.random() < 0.2) {
                    gameState.powerups.push({ 
                        x, 
                        y, 
                        type: Math.floor(Math.random() * 3)  // Random powerup type (0,1,2)
                    });
                }
            }
            
            // Append the cell element to the game board container
            dom.gameBoard.appendChild(cell);
        }
    }
    
    // Add 'grass' class to all cells that are not walls, breakables, players, enemies, or bombs
    document.querySelectorAll('.cell:not(.wall):not(.breakable):not(.player):not(.enemy):not(.bomb)').forEach(cell => {
        cell.classList.add('grass');
    });
}

// Function to decide if a breakable block should be added at position (x, y)
function shouldAddBreakable(x, y) {
    return Math.random() < 0.35 &&                // 35% chance to add breakable
           !(x === 1 && y === 1) &&                // Avoid player start position
           !(x === config.BOARD_SIZE - 2 && y === config.BOARD_SIZE - 2);  // Avoid exit position
}

// Set the player's starting position coordinates and update the display
function positionPlayer() {
    gameState.player.x = 1;
    gameState.player.y = 1;
    updatePlayerPosition();
}
