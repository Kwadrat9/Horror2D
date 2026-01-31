// Plik: src/input.js

// Stan klawiszy (true jeśli wciśnięty)
export const keys = { w: false, a: false, s: false, d: false, z: false };

// Funkcja inicjująca nasłuchiwanie
// Przyjmuje dwie funkcje z zewnątrz, które uruchomią się po wciśnięciu E lub F
export function setupInput(onInteract, onDoor) {
    
    window.addEventListener('keydown', (e) => {
        let k = e.key.toLowerCase();
        
        // Ruch
        if(k === 'w') keys.w = true;
        if(k === 'a') keys.a = true;
        if(k === 's') keys.s = true;
        if(k === 'd') keys.d = true;
        if(k === 'z') keys.z = true;
        
        // Akcje (Wywoływane tylko raz przy naciśnięciu)
        if(k === 'e') {
            if (onInteract) onInteract();
        }
        if(k === 'f') {
            if (onDoor) onDoor();
        }
    });

    window.addEventListener('keyup', (e) => {
        let k = e.key.toLowerCase();
        if(k === 'w') keys.w = false;
        if(k === 'a') keys.a = false;
        if(k === 's') keys.s = false;
        if(k === 'd') keys.d = false;
        if(k === 'z') keys.z = false;
    });
}
