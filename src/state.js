// Plik: src/state.js
import { SPEED_MODIFIER } from './config.js';

// Główny stan gry
export const gameState = {
    currentRoom: "hol",
    gameOver: false,
    messageTimer: 0,
    flags: {
        stoveOff: false,
        bunkierOpen: false,
        finalKeyForged: false,
        recorderData: null,
        isBasementLocked: true 
    }
};

// Stan gracza
export const player = {
    x: 100, y: 500, width: 30, height: 60,
    vx: 0, vy: 0,
    hp: 100,
    state: "standing",
    facingRight: true,
    
    // Ekwipunek
    handItem: null,
    clothing: [],
    keysParts: [false, false, false]
};

// Stan potworów
export const monsters = {
    tarantula: { active: true, room: "sklad", x: 400, y: 500, w: 60, h: 40, hp: 2 },
    breather: { active: true, room: "bunkier", x: 600, y: 460, w: 50, h: 90, hp: 100, speed: 2.0 * SPEED_MODIFIER }
};
