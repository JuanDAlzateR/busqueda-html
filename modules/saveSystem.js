// ==================== SAVE SYSTEM MODULE ====================
import { showSnackbar } from "./ui.js";

class SaveSystem {
    constructor() {
        this.saveKey = "savegame";
    }

    /**
     * Saves the current game state to localStorage.
     */
    saveGame() {
        try {
            const gameState = {
                level: localStorage.getItem("save_level"),
                stats: JSON.parse(localStorage.getItem("stats")),
                visited: JSON.parse(localStorage.getItem("visited_places")) || {},
                timestamp: new Date().toISOString()
            };
            localStorage.setItem(this.saveKey, JSON.stringify(gameState));
            console.log("Game saved:", gameState);
        } catch (error) {
            console.error("Failed to save game:", error);
            showSnackbar("❌ Error al guardar el juego.");
        }
    }

    /**
     * Loads the game state from localStorage.
     */
    loadGame() {
        try {
            const dataStr = localStorage.getItem(this.saveKey);
            if (!dataStr) {
                showSnackbar("No hay partida guardada.");
                return;
            }

            const data = JSON.parse(dataStr);
            if (data) {
                localStorage.setItem("stats", JSON.stringify(data.stats));
                localStorage.setItem("visited_places", JSON.stringify(data.visited || {}));

                // Use requestAnimationFrame or just immediate redirect, timeout is flaky but kept for now if needed for UI
                setTimeout(() => {
                    window.location.href = `nivel.html?id=${data.level}`;
                }, 100);
            }
        } catch (error) {
            console.error("Failed to load game:", error);
            showSnackbar("❌ Error al cargar la partida.");
        }
    }

    /**
     * Downloads the current save file as JSON.
     */
    downloadSave() {
        this.saveGame(); // Ensure latest state is saved
        const data = localStorage.getItem(this.saveKey);
        if (!data) return;

        const blob = new Blob([data], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `savegame_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a); // Append to body to ensure click works in some browsers
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    }

    /**
     * Uploads a save file and loads it.
     * @param {File} file 
     */
    uploadSave(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const result = e.target.result;
                // Basic validation
                const parsed = JSON.parse(result);
                if (!parsed.level || !parsed.stats) {
                    throw new Error("Invalid save file format");
                }

                localStorage.setItem(this.saveKey, result);
                console.log("Save file loaded:", file.name);

                showSnackbar("Partida cargada correctamente. Redirigiendo...");
                setTimeout(() => {
                    this.loadGame();
                }, 500);
            } catch (error) {
                console.error("Error parsing save file:", error);
                showSnackbar("❌ El archivo de guardado está corrupto o es inválido.");
            }
        };
        reader.readAsText(file);
    }
}

export const saveSystem = new SaveSystem();

// Export wrapper functions for backward compatibility
export const saveGame = () => saveSystem.saveGame();
export const loadGame = () => saveSystem.loadGame();
export const downloadSave = () => saveSystem.downloadSave();
export const uploadSave = (file) => saveSystem.uploadSave(file);
