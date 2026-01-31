// Plik: src/main.js
import { initGraphics } from './graphics.js';
import { setupInput } from './input.js';
import { updatePhysics, drawGame, handleItemInteraction, handleDoorInteraction } from './gameLogic.js';

// 1. Pobierz Canvas
const canvas = document.getElementById('gameCanvas');

// 2. Uruchom grafikę
initGraphics(canvas);

// 3. Uruchom sterowanie (przekazujemy funkcje co robić jak wciśnie E lub F)
setupInput(
    handleItemInteraction, // Co robić na 'E'
    handleDoorInteraction  // Co robić na 'F'
);

// 4. Główna pętla gry
function loop() {
    updatePhysics(); // Oblicz
    drawGame();      // Narysuj
    requestAnimationFrame(loop); // Powtórz
}

// START!
loop();
