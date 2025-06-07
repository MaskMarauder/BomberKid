
# BomberKid - Retro Edition Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Game Components](#game-components)
4. [Game Mechanics](#game-mechanics)
5. [UI Elements](#ui-elements)
6. [Audio System](#audio-system)
7. [Configuration](#configuration)
8. [Game States](#game-states)
9. [Controls](#controls)
10. [Development Notes](#development-notes)

## Project Overview

BomberKid is a retro-style Bomberman clone featuring:
- Pixel-art aesthetic with CRT simulation effects
- Classic Bomberman gameplay mechanics
- Multiple levels with increasing difficulty
- Power-ups and enemy AI
- Score system and lives

## File Structure

```
bomberkid/
│── index.html            # Main HTML file with embedded CSS and JavaScript
│── css/
│   └── style.css         # Styling for the game (currently embedded in HTML)
│── js/
│   ├── config.js         # Game configuration constants
│   ├── gameState.js      # Current game state management
│   ├── domElements.js    # DOM element references
│   ├── init.js           # Game initialization logic
│   ├── player.js         # Player character logic
│   ├── enemies.js        # Enemy AI and behavior
│   ├── bombs.js          # Bomb placement and explosion logic
│   ├── powerups.js       # Power-up system
│   ├── ui.js             # User interface updates
│   ├── gameLoop.js       # Main game loop
│   ├── audio.js          # Audio management
│   └── main.js           # Entry point and core game logic
```

## Game Components

### Game Board
- 10x10 grid of cells
- Cell types:
  - Empty (grass)
  - Solid walls (indestructible)
  - Breakable walls (can be destroyed, may contain power-ups)
- Visual effects:
  - Pixelated rendering
  - Scanlines and CRT simulation
  - Animations for all game elements

### Player Character
- Controlled with WASD keys
- Places bombs with SPACE
- Features:
  - Lives system
  - Bomb capacity upgrades
  - Explosion range upgrades
  - Visual pulse animation

### Enemies
- Basic AI with random movement
- Two speed types (normal and fast)
- Destroyed by bomb explosions
- Defeating all enemies reveals the level exit

### Bombs
- Countdown timer (3 seconds)
- Chain reactions with other bombs
- Explosion range increases with power-ups
- Visual effects:
  - Pulsing animation
  - Countdown display
  - Particle effects on explosion

### Power-ups
Hidden in breakable walls:
1. Bomb+ (B) - Increases bomb capacity (yellow)
2. Range+ (R) - Increases explosion range (cyan)
3. Life (L) - Grants extra life (magenta)

## Game Mechanics

### Level Progression
- Starting position: top-left corner (1,1)
- Exit position: bottom-right corner (7,8)
- Defeat all enemies to unlock exit
- Complete level to advance
- 5 levels total with increasing difficulty

### Scoring
- Destroy breakable wall: +10 points
- Defeat enemy: +50 points
- Collect power-up: +20 points
- Level completion: +500 points + time bonus

### Time System
- 120 seconds per level (2 minutes)
- Time bonus: +10 points per remaining 10 seconds
- Game over when time reaches 0

## UI Elements

### Game Screens
1. **Start Screen**
   - Game title
   - Start button
   - Controls reference

2. **Game Screen**
   - Game board
   - UI overlay with:
     - Lives counter
     - Score display
     - Level indicator
     - Bombs counter
     - Explosion range
     - Timer

3. **Pause Screen**
   - Resume button
   - Controls reminder

4. **Level Complete Screen**
   - Bonus points display
   - Next level indicator

5. **Game Over Screen**
   - Final score
   - Level reached
   - Play again button

6. **Victory Screen** (after level 5)
   - Special victory message
   - Confetti effects

### UI Indicators
- Lives: Red circle + number
- Score: Gold text
- Level: Blue circle + number
- Bombs: Black circle + count (current/max)
- Range: Orange circle + number
- Time: Green circle + seconds

## Audio System

### Sound Effects
1. Background music (looping)
2. Bomb placement
3. Explosion
4. Power-up collection
5. Game over
6. Level complete

### Audio Management
- Volume control (background music at 30%)
- Play/pause with game states
- Reset on game restart

## Configuration

```javascript
const config = {
    BOARD_SIZE: 10,
    CELL_SIZE: 48,
    INITIAL_LIVES: 3,
    INITIAL_TIME: 120,
    INITIAL_BOMBS: 1,
    INITIAL_RANGE: 2,
    LEVEL_TIME_BONUS: 15,
    LEVEL_SCORE_BONUS: 500,
    MAX_BOMBS: 5,
    MAX_RANGE: 5
};
```

## Game States

### State Object

```javascript
const gameState = {
    player: {
        x: 1,
        y: 1,
        lives: 3,
        maxBombs: 1,
        bombRange: 2
    },
    enemies: [],
    bombs: [],
    powerups: [],
    score: 0,
    timeLeft: 120,
    level: 1,
    active: false,
    paused: false,
    sounds: {
        bgMusic: audioElement,
        bomb: audioElement,
        explosion: audioElement,
        powerup: audioElement,
        gameOver: audioElement,
        levelComplete: audioElement
    }
};
```

### State Transitions
1. **Initialization**
2. **Gameplay**
3. **Level Completion**
4. **Game Over**

## Controls

| Key   | Action         |
|-------|----------------|
| W     | Move Up        |
| A     | Move Left      |
| S     | Move Down      |
| D     | Move Right     |
| SPACE | Place Bomb     |
| ESC/P | Pause/Unpause  |

## Development Notes

### Visual Effects
- Pixel-perfect rendering
- CRT simulation
- Retro font
- Animations

### Performance Considerations
- DOM-based rendering
- Optimized selectors
- Minimal reflows

### Browser Compatibility
- Modern browsers
- Responsive design (fixed size)
- Audio: user interaction required on mobile

### Future Enhancements
1. Separate CSS and JavaScript files
2. Add more enemy types
3. Implement save/load system
4. Add multiplayer support
5. Create level editor
