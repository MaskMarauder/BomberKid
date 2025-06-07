# 🎮 BomberKid - Retro Edition

**BomberKid** is a retro-style Bomberman clone built with HTML, CSS, and JavaScript. It features pixel-art visuals, classic gameplay mechanics, and a simulated CRT display for nostalgic flair.

## 📋 Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [How to Play](#how-to-play)
- [Game Structure](#game-structure)
- [Controls](#controls)
- [Development Notes](#development-notes)
- [License](#license)

---

## ✨ Features

- 🕹️ Classic Bomberman-style gameplay  
- 🧱 Destructible walls, power-ups, and enemy AI  
- 🔥 Bomb chaining and explosion effects  
- 🎨 Pixel-perfect graphics with CRT simulation  
- 🎵 Retro audio system with sound effects and music  
- 🧠 Score, lives, and time-based level progression  
- 📈 Built-in game states and UI transitions

---

## 🖼️ Screenshots

*(Add your images here using `![Screenshot](path/to/image)` when available)*

---

## 📦 Installation

1. Clone or download the repository:

```bash
git clone https://github.com/yourusername/bomberkid.git
```

2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge).

> 📌 No build step required. Everything runs locally in the browser.

---

## 🕹️ How to Play

- Move your character with `W`, `A`, `S`, `D`
- Place bombs with `SPACE`
- Defeat all enemies and reach the exit
- Collect power-ups hidden in breakable walls
- Avoid explosions, timeouts, and enemy collisions

---

## 🧱 Game Structure

```
bomberkid/
│── index.html            # Main HTML file
│── css/
│   └── style.css         # Game styling
│── js/
│   ├── config.js         # Constants and settings
│   ├── gameState.js      # Game state object
│   ├── init.js           # Initialization routines
│   ├── player.js         # Player logic
│   ├── enemies.js        # Enemy AI
│   ├── bombs.js          # Bomb handling
│   ├── powerups.js       # Power-up logic
│   ├── ui.js             # UI rendering and HUD
│   ├── gameLoop.js       # Core game loop
│   ├── audio.js          # Sound management
│   └── main.js           # Entry point
```

---

## 🎮 Controls

| Key        | Action         |
|------------|----------------|
| `W`        | Move Up        |
| `A`        | Move Left      |
| `S`        | Move Down      |
| `D`        | Move Right     |
| `SPACE`    | Place Bomb     |
| `ESC / P`  | Pause/Resume   |

---

## 🧠 Development Notes

- Built with vanilla JavaScript and DOM-based rendering
- Responsive but optimized for desktop browsers
- CRT effect achieved using CSS filters and scanlines
- All logic is modular and can be extended easily
- Includes game states: start, playing, pause, level complete, game over, victory

---

## 🚀 Future Improvements

- Move CSS and JS into separate files (if embedded)
- Add more enemy types with smarter AI
- Implement save/load and level editor
- Add multiplayer support
- Improve mobile support

---

## 📄 License

This project is released under the [MIT License](LICENSE).