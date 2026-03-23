// ==================== MAIN GAME MODULE ====================
// This file aggregates all modules and initializes the game

import { statsManager } from "./modules/stats.js";
import { saveSystem } from "./modules/saveSystem.js";
import { levelManager } from "./modules/levelManager.js";
import { gpsManager } from "./modules/gps.js";
import { cardManager } from "./modules/cards.js";
import { uiManager } from "./modules/ui.js";

// Export everything for backward compatibility and easy access
export * from "./modules/stats.js";
export * from "./modules/ui.js";
export * from "./modules/saveSystem.js";
export * from "./modules/gps.js";
export * from "./modules/levelManager.js";
export * from "./modules/cards.js";

class Game {
    constructor() {
        this.stats = statsManager;
        this.save = saveSystem;
        this.level = levelManager;
        this.gps = gpsManager;
        this.cards = cardManager;
        this.ui = uiManager;
    }

    init() {
        console.log("Game initialized");
        this.stats.init();
    }
}

export const game = new Game();
game.init();
