// Plik: src/gameLogic.js
import { gameState, player, monsters } from './state.js';
import { rooms } from './rooms.js';
import { keys } from './input.js';
import { GRAVITY, PLAYER_SPEED, JUMP_FORCE } from './config.js';
import { drawSprite, getCtx } from './graphics.js';

// --- POMOCNICZE ---
function checkOverlap(rect1, rect2) {
    return (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y);
}

function showMessage(msg) {
    const box = document.getElementById('message-box');
    box.innerText = msg;
    box.style.display = 'block';
    gameState.messageTimer = 180;
}

// --- LOGIKA FIZYKI I RUCHU ---
export function updatePhysics() {
    if (gameState.gameOver) return;

    // Timer wiadomości
    if (gameState.messageTimer > 0) {
        gameState.messageTimer--;
        if (gameState.messageTimer <= 0) document.getElementById('message-box').style.display = 'none';

    // 1. Ustalanie stanu gracza (stanie, kucanie, czołganie)
    let currentSpeed = PLAYER_SPEED;
    let room = rooms[gameState.currentRoom];

    if (keys.z) {
        player.state = "crawling";
        player.height = 25;
        currentSpeed *= 0.3;
    } else if (keys.s) {
        player.state = "crouching";
        player.height = 40;
    } else {
        player.state = "standing";
        player.height = 60;
        // Wymuszone czołganie w niskich pokojach
        if (room.lowCeiling) {
             player.state = "crawling"; 
             player.height = 25;
             currentSpeed *= 0.3;
        }
    }

    // 2. Ruch poziomy (X)
    if (keys.a) { player.vx = -currentSpeed; player.facingRight = false; }
    else if (keys.d) { player.vx = currentSpeed; player.facingRight = true; }
    else player.vx = 0;

    // 3. Ruch pionowy (Y) i Grawitacja
    player.vy += GRAVITY;
    player.x += player.vx;
    player.y += player.vy;

    // 4. Kolizje z platformami
    let onGround = false;
    room.platforms.forEach(p => {
        // p = [x, y, w, h]
        if (player.x + player.width > p[0] && player.x < p[0] + p[2] &&
            player.y + player.height > p[1] && player.y + player.height < p[1] + 20) {
                player.y = p[1] - player.height;
                player.vy = 0;
                onGround = true;
        }
    });

    // 5. Ograniczenia ekranu
    if (player.x < 0) player.x = 0;
    if (player.x > 800 - player.width) player.x = 800 - player.width;

    // 6. Skok
    if (onGround && keys.w && player.state === "standing") {
        player.vy = JUMP_FORCE;
    }

    // 7. Zagrożenia (np. Czad)
    if (room.hazard === "czad" && !player.clothing.includes("Maska Gazowa")) {
        player.hp -= 0.2;
        if (Math.random() < 0.05) showMessage("Duszę się! Potrzebuję maski!");
    }
    if (player.hp <= 0) {
        alert("Śmierć. Odśwież stronę, by spróbować ponownie.");
        gameState.gameOver = true;
    }

    // --- LOGIKA POTWORÓW (Tarantula) ---
    const t = monsters.tarantula;
    if (t.active && gameState.currentRoom === t.room) {
        
        if (t.stunTimer > 0) {
            // Tarantula jest ogłuszona
            t.stunTimer--;
        } else {
            // 1. RUCH PATROLOWY
            t.x += t.speed * t.direction;

            // Zawracanie przy ścianach pokoju (0 - 800)
            if (t.x <= 50 || t.x + t.w >= 750) {
                t.direction *= -1;
            }

            // 2. ATAK NA GRACZA (Obrażenia)
            if (checkOverlap(player, {x: t.x, y: t.y, width: t.w, height: t.h})) {
                player.hp -= 0.5; // Zabiera HP co klatkę przy dotyku
            }
        }
    }    
    updateUI();
}


    
// --- INTERAKCJE (E i F) ---

// Wywoływane przez input.js (klawisz F)
export function handleDoorInteraction() {
    let room = rooms[gameState.currentRoom];
    let usedDoor = null;

    room.doors.forEach(door => {
        if(checkOverlap(player, {x: door.x, y: door.y, width: door.w, height: door.h})) {
            usedDoor = door;
        }
    });

    if(usedDoor) {
        if(usedDoor.locked) {
            // Sprawdź klucz w ręce
            if(player.handItem && player.handItem.name === usedDoor.keyName) {
                showMessage("Otwierasz drzwi: " + usedDoor.keyName);
                usedDoor.locked = false;
                changeRoom(usedDoor);
            } else if (usedDoor.keyName === "tunel" && gameState.flags.bunkierOpen) {
                 changeRoom(usedDoor);
            } else {
                showMessage("Zamknięte. Wymaga: " + usedDoor.keyName);
            }
        } else {
            changeRoom(usedDoor);
        }
    }
}

function changeRoom(doorData) {
    gameState.currentRoom = doorData.to;
    player.x = doorData.tx;
    player.y = doorData.ty;
}

// Wywoływane przez input.js (klawisz E)
export function handleItemInteraction() {
    let room = rooms[gameState.currentRoom];
    let foundItemIndex = -1;

    // Szukamy przedmiotu pod nogami
    for(let i=0; i<room.items.length; i++) {
        let it = room.items[i];
        if(!it.hidden && checkOverlap(player, {x: it.x, y: it.y, width: 30, height: 30})) {
            foundItemIndex = i;
            break;
        }
    }


    const t = monsters.tarantula;
    
    // ATACK NOŻEM (Jeśli mamy nóż w ręku i tarantula jest blisko)
    if (player.handItem?.id === "noz" && 
        gameState.currentRoom === t.room && 
        checkOverlap(player, {x: t.x - 20, y: t.y - 20, width: t.w + 40, height: t.h + 40})) {
        
        import('./config.js').then(cfg => {
            t.stunTimer = cfg.STUN_DURATION;
        });
        
        showMessage("TRAFIONA! Tarantula ogłuszona na 10s!");
        return; // Kończymy funkcję, żeby nie wyrzucić noża na ziemię
    }


    
    // A. Stoimy na przedmiocie -> Podnosimy/Używamy
    if(foundItemIndex !== -1) {
        let newItem = room.items[foundItemIndex];
        
        if(newItem.type === "static") {
            if(newItem.id === "regal") {
                if(player.clothing.includes("Rękawice")) {
                    newItem.x = 600; 
                    let key = room.items.find(x => x.id === "klucz_czesc_3");
                    if(key) key.hidden = false;
                    showMessage("Przesunięto regał.");
                } else showMessage("Za ciężkie. Potrzeba rękawic.");
            }
            return;
        }

        if(newItem.type === "keypart") {
            player.keysParts[newItem.partIdx] = true;
            room.items.splice(foundItemIndex, 1);
            showMessage("Znaleziono część klucza!");
            return;
        }

        if(newItem.type === "clothing") {
            if(!player.clothing.includes(newItem.name)) {
                player.clothing.push(newItem.name);
                room.items.splice(foundItemIndex, 1);
                showMessage("Założono: " + newItem.name);
            }
            return;
        }

        if(newItem.type === "hand") {
            // Wymiana lub podniesienie
            if(player.handItem) {
                // Stary na ziemię
                let oldItem = player.handItem;
                oldItem.x = player.x;
                oldItem.y = player.y + 20;
                room.items.push(oldItem);
            }
            player.handItem = newItem;
            room.items.splice(foundItemIndex, 1);
            showMessage("Wzięto: " + newItem.name);
            return;
        }
    } 
    // B. Puste miejsce -> Wyrzucamy przedmiot z ręki
    else if (player.handItem) {
        let itemToDrop = player.handItem;
        itemToDrop.x = player.x;
        itemToDrop.y = player.y + 20;
        room.items.push(itemToDrop);
        player.handItem = null;
        showMessage("Wyrzucono: " + itemToDrop.name);
    }
}

// --- UI ---
function updateUI() {
    document.getElementById('heart-display').innerText = "♥ " + Math.floor(player.hp) + "%";
    
    for(let i=0; i<3; i++) {
        let slot = document.getElementById('key'+(i+1));
        if(player.keysParts[i]) slot.classList.add('key-found');
        else slot.classList.remove('key-found');
    }

    let handText = player.handItem ? player.handItem.name : "Pusta";
    document.getElementById('hand-slot').innerText = handText;
    
    let clothText = player.clothing.length > 0 ? player.clothing.join(", ") : "Brak";
    document.getElementById('clothing-slot').innerText = clothText;
}

// --- RYSOWANIE ---
export function drawGame() {
    let room = rooms[gameState.currentRoom];
    let ctx = getCtx();
    if(!ctx) return;

    // Tło
    drawSprite(room.bgCode, 0, 0, 800, 600, '#222');

    // Platformy (Debug)
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    room.platforms.forEach(p => ctx.fillRect(p[0], p[1], p[2], p[3]));

    if(monsters.tarantula.active && gameState.currentRoom === "sklad") {
    let t = monsters.tarantula;
    let ctx = getCtx();
    
    if (t.stunTimer > 0) {
        ctx.globalAlpha = 0.5; // Półprzezroczystość podczas ogłuszenia
        drawSprite("tarantula", t.x, t.y, t.w, t.h, "grey");
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = "white";
        ctx.fillText("OGŁUSZONA", t.x, t.y - 5);
    } else {
        drawSprite("tarantula", t.x, t.y, t.w, t.h, "purple");
    }
    }
    
    // --- DRZWI (Zawsze widoczne z detalami) ---
    room.doors.forEach(d => {
        // 1. Rysowanie głównej tekstury drzwi
        drawSprite('door', d.x, d.y, d.w, d.h, '#5d4037');

        // 2. Rysowanie framugi (obramowania)
        ctx.strokeStyle = "#3e2723"; // Bardzo ciemny brąz
        ctx.lineWidth = 4;
        ctx.strokeRect(d.x, d.y, d.w, d.h);

        // 3. Rysowanie klamki (małe złote kółko)
        ctx.fillStyle = "#f1c40f"; // Złoty kolor
        ctx.beginPath();
        // Umieszcza klamkę po prawej stronie (80% szerokości) w połowie wysokości
        ctx.arc(d.x + d.w * 0.8, d.y + d.h * 0.5, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke(); // Dodaje obwódkę klamki

        // 4. Logika podpowiedzi (tylko gdy gracz stoi przy drzwiach)
        if(checkOverlap(player, {x: d.x, y: d.y, width: d.w, height: d.h})) {
            // Lekkie rozświetlenie drzwi, gdy gracz przy nich stoi
            ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
            ctx.fillRect(d.x, d.y, d.w, d.h);

            ctx.fillStyle = "white";
            ctx.font = "bold 14px Courier New";
            ctx.textAlign = "center";
            
            // Napis nad drzwiami
            ctx.fillText("[F] OTWÓRZ", d.x + d.w / 2, d.y - 10);
            
            if(d.locked) {
                ctx.fillStyle = "#ff4d4d";
                ctx.fillText("ZAMKNIĘTE", d.x + d.w / 2, d.y - 25);
            }
            
            // Resetujemy wyrównanie tekstu, żeby nie popsuć innych napisów
            ctx.textAlign = "left";
        }
    });

    // Przedmioty
    room.items.forEach(item => {
        if(item.hidden) return;
        let w = item.w || 30;
        let h = item.h || 30;
        drawSprite(item.tex, item.x, item.y, w, h, item.color);

        if(checkOverlap(player, {x:item.x - 20, y:item.y - 20, width: w+40, height: h+40})) {
            ctx.fillStyle = "lime";
            ctx.font = "12px monospace";
            let action = item.type === "static" ? "[F] Użyj" : "[E] Weź";
            ctx.fillText(item.name, item.x, item.y - 5);
            ctx.fillText(action, item.x, item.y - 18);
        }
    });

    // Gracz
    drawSprite("player", player.x, player.y, player.width, player.height, "blue");

    // Potwory (Prosta implementacja)
    if(monsters.tarantula.active && gameState.currentRoom === "sklad") {
        let t = monsters.tarantula;
        drawSprite("tarantula", t.x, t.y, t.w, t.h, "purple");
    }

    // Ciemność
    if(room.dark && !player.handItem?.name?.includes("Lampa")) {
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,800,600);
    }
}
