// Plik: src/config.js

// Konfiguracja fizyki
export const SPEED_MODIFIER = 0.6; 
export const GRAVITY = 0.5 * SPEED_MODIFIER;
export const PLAYER_SPEED = 4 * SPEED_MODIFIER; 
export const JUMP_FORCE = -9 * SPEED_MODIFIER;
export const STUN_DURATION = 60 * 10; // 10 sekund (60 klatek na sekundę * 10)

// Lista obrazków do załadowania
export const IMAGE_LIST = [
    'player', 'tarantula', 'breather', 'door',
    'bg_hol', 'bg_salon', 'bg_kuchnia', 'bg_sypialnia', 'bg_korytarz', 
    'bg_strych', 'bg_poddasze', 'bg_sklad', 'bg_kotlownia', 'bg_bunkier',
    'item_buty', 'item_klucz', 'item_noz', 'item_zapalniczka', 'item_dyktafon',
    'item_maska', 'item_klucz_nastawny', 'item_lampa', 'item_lom', 'item_wegiel',
    'item_rekawice', 'item_bomba', 'item_skrzynia', 'item_stol', 'item_piec',
    'item_part1', 'item_part2', 'item_part3'
];
