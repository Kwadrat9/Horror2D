// Plik: src/rooms.js

export const rooms = {
    "hol": {
        name: "Hol", bgCode: "bg_hol",
        platforms: [[0, 550, 800, 50]],
        doors: [
            { to: "salon", x: 10, y: 450, w: 40, h: 100, tx: 700, ty: 450 },
            { to: "kuchnia", x: 750, y: 450, w: 40, h: 100, tx: 50, ty: 450 },
            { to: "korytarz", x: 380, y: 450, w: 40, h: 100, tx: 380, ty: 450, type: "stairs_up" },
            { to: "sklad", x: 200, y: 450, w: 40, h: 100, tx: 50, ty: 450, locked: true, keyName: "Klucz Piwniczny" }
        ],
        items: [
            { id: "buty", name: "Buty", type: "clothing", x: 300, y: 520, tex: "item_buty", color: "brown" },
            { id: "stół_miejsce", name: "Miejsce na Stół", type: "static", x: 500, y: 520, tex: "", color: "grey" }
        ]
    },
    "salon": {
        name: "Salon", bgCode: "bg_salon",
        platforms: [[0, 550, 800, 50]],
        doors: [ { to: "hol", x: 750, y: 450, w: 40, h: 100, tx: 50, ty: 450 } ],
        items: [
            { id: "klucz_piwnica", name: "Klucz Piwniczny", type: "hand", x: 200, y: 520, tex: "item_klucz", color: "gold" },
            { id: "regal", name: "Regał", type: "static", x: 400, y: 450, w: 60, h: 100, tex: "", color: "sienna" },
            { id: "klucz_czesc_3", name: "Część Klucza 3", type: "keypart", partIdx: 2, x: 420, y: 520, tex: "item_part3", color: "silver", hidden: true }
        ]
    },
    "kuchnia": {
        name: "Kuchnia", bgCode: "bg_kuchnia",
        platforms: [[0, 550, 800, 50]],
        doors: [ { to: "hol", x: 10, y: 450, w: 40, h: 100, tx: 700, ty: 450 } ],
        items: [
            { id: "noz", name: "Nóż", type: "hand", x: 300, y: 520, tex: "item_noz", color: "silver" },
            { id: "zapalniczka", name: "Zapalniczka", type: "hand", x: 350, y: 520, tex: "item_zapalniczka", color: "orange" },
            { id: "zsyp", name: "Zsyp", type: "static", x: 600, y: 530, w: 100, h: 20, tex: "", color: "black" }
        ]
    },
    "korytarz": {
        name: "Korytarz", bgCode: "bg_korytarz",
        platforms: [[0, 550, 800, 50]],
        doors: [
            { to: "hol", x: 380, y: 450, w: 40, h: 100, tx: 380, ty: 450, type: "stairs_down" },
            { to: "sypialnia", x: 10, y: 450, w: 40, h: 100, tx: 700, ty: 450 },
            { to: "strych", x: 600, y: 450, w: 40, h: 100, tx: 50, ty: 450, locked: true, keyName: "Klucz Piwniczny" }
        ],
        items: []
    },
    "sypialnia": {
        name: "Sypialnia", bgCode: "bg_sypialnia",
        platforms: [[0, 550, 800, 50]],
        doors: [ { to: "korytarz", x: 750, y: 450, w: 40, h: 100, tx: 40, ty: 450 } ],
        items: [ { id: "dyktafon", name: "Dyktafon", type: "hand", x: 400, y: 520, tex: "item_dyktafon", color: "cyan" } ]
    },
    "strych": {
        name: "Strych", bgCode: "bg_strych",
        platforms: [[0, 550, 800, 50]],
        doors: [
            { to: "korytarz", x: 10, y: 450, w: 40, h: 100, tx: 550, ty: 450 },
            { to: "poddasze", x: 400, y: 450, w: 60, h: 100, tx: 400, ty: 500, locked: true, keyName: "Łom" }
        ],
        items: [
            { id: "maska", name: "Maska Gazowa", type: "clothing", x: 200, y: 520, tex: "item_maska", color: "green" },
            { id: "klucz_nastawny", name: "Klucz Nastawny", type: "hand", x: 500, y: 520, tex: "item_klucz_nastawny", color: "grey" },
            { id: "lampa", name: "Lampa Węglowa", type: "hand", x: 600, y: 520, tex: "item_lampa", color: "yellow" }
        ]
    },
    "poddasze": {
        name: "Poddasze", bgCode: "bg_poddasze",
        lowCeiling: true, hazard: "wata",
        platforms: [[0, 550, 800, 50]],
        doors: [ { to: "strych", x: 400, y: 500, w: 60, h: 50, tx: 400, ty: 450 } ],
        items: [
            { id: "klucz_czesc_1", name: "Część Klucza 1", type: "keypart", partIdx: 0, x: 700, y: 520, tex: "item_part1", color: "silver" },
            { id: "pakiet_wwi", name: "Broń WWI", type: "hand", x: 100, y: 520, tex: "item_skrzynia", color: "olive" }
        ]
    },
    "sklad": {
        name: "Skład", bgCode: "bg_sklad",
        platforms: [[0, 550, 800, 50]],
        doors: [
            { to: "hol", x: 10, y: 450, w: 40, h: 100, tx: 200, ty: 450 },
            { to: "kotlownia", x: 750, y: 450, w: 40, h: 100, tx: 50, ty: 450 }
        ],
        items: [
            { id: "lom", name: "Łom", type: "hand", x: 200, y: 520, tex: "item_lom", color: "red" },
            { id: "wegiel", name: "Węgiel", type: "hand", x: 300, y: 520, tex: "item_wegiel", color: "black" },
            { id: "rekawice", name: "Rękawice", type: "clothing", x: 400, y: 520, tex: "item_rekawice", color: "orange" },
            { id: "bomba", name: "Bomba", type: "hand", x: 500, y: 520, tex: "item_bomba", color: "white" }
        ]
    },
    "kotlownia": {
        name: "Kotłownia", bgCode: "bg_kotlownia",
        hazard: "czad",
        platforms: [[0, 550, 800, 50]],
        doors: [
            { to: "sklad", x: 10, y: 450, w: 40, h: 100, tx: 700, ty: 450 },
            { to: "bunkier", x: 400, y: 450, w: 50, h: 50, tx: 50, ty: 450, locked: true, keyName: "tunel" }
        ],
        items: [
            { id: "skrzynia", name: "Skrzynia", type: "hand", x: 150, y: 520, tex: "item_skrzynia", color: "brown" },
            { id: "stol", name: "Stół Majsterkowicza", type: "hand", x: 600, y: 500, w: 60, h: 50, tex: "item_stol", color: "blue", heavy: true }, 
            { id: "piec", name: "Piec", type: "static", x: 300, y: 450, w: 80, h: 100, tex: "item_piec", color: "darkred" }
        ]
    },
    "bunkier": {
        name: "Bunkier", bgCode: "bg_bunkier",
        dark: true,
        platforms: [[0, 550, 800, 50]],
        doors: [ { to: "kotlownia", x: 10, y: 450, w: 40, h: 100, tx: 400, ty: 450 } ],
        items: [
            { id: "klucz_czesc_2", name: "Część Klucza 2", type: "keypart", partIdx: 1, x: 700, y: 520, tex: "item_part2", color: "silver" }
        ]
    }
};
