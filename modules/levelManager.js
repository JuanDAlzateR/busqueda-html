// ==================== LEVEL MANAGER MODULE ====================
import { LEVELS } from "../levels.js";
import { loadStats, getStat, modifyStat, setStat } from "./stats.js";
import { showSnackbar, showRewardDialog, showNextLevelDialog } from "./ui.js";
import { saveGame } from "./saveSystem.js";

class LevelManager {
    constructor() {
        this.currentLevelId = null;
    }

    /**
     * Marks a place as visited in local storage.
     * @param {string} id 
     */
    markPlaceAsVisited(id) {
        const visited = JSON.parse(localStorage.getItem("visited_places")) || {};
        if (!visited[id]) {
            visited[id] = 1;
            localStorage.setItem("visited_places", JSON.stringify(visited));
        }
    }

    /**
     * Loads the level based on URL parameters.
     */
    loadLevel() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id") || "JD"; // Default level
        this.currentLevelId = id;

        const level = LEVELS[id];
        localStorage.setItem("current_level", id);
        this.markPlaceAsVisited(id);

        const container = document.querySelector(".container");
        if (!level) {
            if (container) container.innerHTML = "<h1>Nivel no encontrado 😢</h1>";
            return;
        }

        // Update UI
        const h1 = document.querySelector("h1");
        if (h1) h1.innerText = `Nivel ${id}`;

        const img = document.querySelector("#level-image");
        if (img) img.src = level.image;

        const text = document.querySelector("#level-text");
        if (text) text.innerHTML = level.text.replace(/\n/g, "<br>");

        // Bind events
        const scanBtn = document.querySelector("#scan-btn");
        if (scanBtn) scanBtn.onclick = () => this.goToQR(id);

        const confirmBtn = document.querySelector("#confirm-btn");
        if (confirmBtn) confirmBtn.onclick = () => this.confirmPassword(id);

        const saveBtn = document.querySelector("#btn-menu-guardar");
        if (saveBtn) saveBtn.onclick = () => {
            localStorage.setItem("previous_level", id);
            window.location.href = `save.html`;
        };

        loadStats();
    }

    /**
     * Redirects to the QR scanner page.
     * @param {string} currentLevel 
     */
    goToQR(currentLevel) {
        if (getStat("acciones") > 0) {
            localStorage.setItem("previous_level", currentLevel);
            setTimeout(() => { window.location.href = "qr.html"; }, 1000);
        } else {
            showSnackbar("Este turno ya no quedan más acciones disponibles");
        }
    }

    /**
     * Validates the password and handles level progression.
     * @param {string} levelId 
     */
    confirmPassword(levelId) {
        const inputEl = document.getElementById("password-input");
        if (!inputEl) return;

        const input = inputEl.value.trim().toLowerCase();
        const level = LEVELS[levelId];

        if (!input) {
            showSnackbar("⚠️ Escribe una respuesta antes de continuar.");
            return;
        }

        if (input === level.password.toLowerCase()) {
            showSnackbar("✅ ¡Respuesta correcta!<br>Has empleado ❤️ y pasado el nivel", 5000);
            modifyStat("amor", -1);
            setStat("acciones", 1);

            setTimeout(() => {
                // Show reward first
                showRewardDialog(level, () => {
                    this.handleNextLevel(level);
                });
            }, 3000);
        } else {
            showSnackbar("❌ Respuesta incorrecta, intenta de nuevo.");
        }
    }

    /**
     * Handles logic for moving to the next level.
     * @param {Object} level 
     */
    handleNextLevel(level) {
        if (Array.isArray(level.next) && level.next.length > 1) {
            showNextLevelDialog(level.next, (selectedLevel) => {
                this.navigateToLevel(selectedLevel);
            });
        } else if (Array.isArray(level.next) && level.next.length === 1) {
            this.navigateToLevel(level.next[0]);
        } else {
            showSnackbar("🎉 ¡Has completado la aventura!");
        }
    }

    /**
     * Saves game and navigates to the specified level.
     * @param {string} levelId 
     */
    navigateToLevel(levelId) {
        localStorage.setItem("save_level", levelId);
        saveGame();
        console.log("Navigating to:", levelId);
        setTimeout(() => {
            window.location.href = `nivel.html?id=${levelId}`;
        }, 2000);
    }
}

export const levelManager = new LevelManager();

// Export wrapper functions for backward compatibility
export const markPlaceAsVisited = (id) => levelManager.markPlaceAsVisited(id);
export const loadLevel = () => levelManager.loadLevel();
export const goToQR = (l) => levelManager.goToQR(l);
export const confirmPassword = (l) => levelManager.confirmPassword(l);
