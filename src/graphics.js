// Plik: src/graphics.js
import { IMAGE_LIST } from './config.js';

let ctx = null; // Kontekst Canvas
const textures = {}; // Załadowane obrazki

// Inicjalizacja grafiki - musi dostać element canvas
export function initGraphics(canvasElement) {
    ctx = canvasElement.getContext('2d');
    
    // Ładowanie obrazków
    IMAGE_LIST.forEach(name => {
        const img = new Image();
        // Sprytne wykrywanie rozszerzenia: tła to .jpg, reszta .png
        let ext = name.startsWith('bg_') ? '.jpg' : '.png';
        img.src = 'img/' + name + ext; 
        textures[name] = img;
    });
}

// Funkcja rysująca sprite'a (lub kolorowy prostokąt, jeśli brak grafiki)
export function drawSprite(name, x, y, w, h, fallbackColor) {
    if (!ctx) return; // Zabezpieczenie

    const img = textures[name];
    if (img && img.complete && img.naturalHeight !== 0) {
        ctx.drawImage(img, x, y, w, h);
    } else {
        // Fallback (zastępstwo)
        ctx.fillStyle = fallbackColor || 'magenta';
        ctx.fillRect(x, y, w, h);
        
        // Napis debugowy
        if(w > 30) {
            ctx.fillStyle = "white";
            ctx.font = "10px Arial";
            ctx.fillText(name.substring(0,5), x, y+10);
        }
    }
}

// Eksportujemy ctx, żeby inne pliki mogły rysować proste kształty (np. ciemność)
export function getCtx() {
    return ctx;
}
