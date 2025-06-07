// Main function that runs when the page loads
window.onload = function() {
    // Show the game start screen by setting its display to 'flex'
    dom.gameStart.style.display = 'flex';
};

// Make key game functions globally accessible to the HTML
window.startGame = startGame;
window.resetGame = resetGame;
window.togglePause = togglePause;
