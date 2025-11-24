// ==================== SAVE SYSTEM MODULE ====================
import { showSnackbar } from "./ui.js";

export function saveGame() {
    const gameState = {
        level: localStorage.getItem("save_level"),
        stats: JSON.parse(localStorage.getItem("stats")),
        visited: JSON.parse(localStorage.getItem("visited_places")) || {}
    };
    localStorage.setItem("savegame", JSON.stringify(gameState));
    console.log("save:" + JSON.stringify(gameState));
    //showSnackbar("Juego guardado. Nivel: "+gameState.level);
}

export function loadGame() {
    const data = JSON.parse(localStorage.getItem("savegame"));
    if (data) {
        //localStorage.setItem("current_level", data.level); //no hay necesidad pues loadlevel lo guarda.
        localStorage.setItem("stats", JSON.stringify(data.stats));
        localStorage.setItem("visited_places", JSON.stringify(data.visited || {}));
        setTimeout(() => {
            window.location.href = `nivel.html?id=${data.level}`;
        }, 100); //se deja el timeout, por si se requiere emplear despues para debug
    }
}

export function downloadSave() {
    saveGame();
    const data = localStorage.getItem("savegame");
    console.log("data:" + data);
    const blob = new Blob([data], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "savegame.json";
    a.click();
}

export function uploadSave(file) {
    const reader = new FileReader();
    reader.onload = () => {
        console.log("result: " + reader.result);
        localStorage.setItem("savegame", reader.result);
    };
    reader.readAsText(file); //al terminar la lectura activa el evneto onload
    console.log("loaded file: " + file.name);

    setTimeout(() => {
        console.log("loaded savegame: " + localStorage.getItem("savegame"));
        loadGame(); //importante: se requiere un pequeño delay para esperar a que finalice el reader.
    }, 100);
}
