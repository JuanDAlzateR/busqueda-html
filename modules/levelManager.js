// ==================== LEVEL MANAGER MODULE ====================
import { LEVELS } from "../levels.js";
import { loadStats, getStat, modifyStat, setStat } from "./stats.js";
import { showSnackbar, showRewardDialog, showNextLevelDialog } from "./ui.js";
import { saveGame } from "./saveSystem.js";

export function markPlaceAsVisited(id) {
    const visited = JSON.parse(localStorage.getItem("visited_places")) || {};
    if (!visited[id]) {
        visited[id] = 1;
        localStorage.setItem("visited_places", JSON.stringify(visited));
    }
}

export function loadLevel() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "JD"; // Nivel por defecto
    const level = LEVELS[id];
    localStorage.setItem("current_level", id); //guardar el id del nivel actual
    markPlaceAsVisited(id);

    if (!level) {
        document.querySelector(".container").innerHTML = "<h1>Nivel no encontrado 😢</h1>";
        return;
    }

    document.querySelector("h1").innerText = `Nivel ${id}`;
    document.querySelector("#level-image").src = level.image;
    document.querySelector("#level-text").innerHTML = level.text.replace(/\n/g, "<br>");
    document.querySelector("#scan-btn").onclick = () => goToQR(id);
    document.querySelector("#confirm-btn").onclick = () => confirmPassword(id);
    document.querySelector("#btn-menu-guardar").onclick = () => {
        localStorage.setItem("previous_level", id);
        window.location.href = `save.html`;
    };
    loadStats();
}

export function goToQR(currentLevel) {
    if (getStat("acciones") > 0) {
        localStorage.setItem("previous_level", currentLevel);
        setTimeout(() => { window.location.href = "qr.html"; }, 1000);
    } else {
        showSnackbar("Este turno ya no quedan más acciones disponibles");
    }
}

export function confirmPassword(levelId) {
    const input = document.getElementById("password-input").value.trim().toLowerCase();
    const level = LEVELS[levelId];
    if (!input) {
        showSnackbar("⚠️ Escribe una respuesta antes de continuar.");
        return;
    }

    if (input === level.password.toLowerCase()) {
        showSnackbar("✅ ¡Respuesta correcta!<br>Haz empleado ❤️ y pasado el nivel", 5000);
        modifyStat("amor", -1);
        setStat("acciones", 1);
        setTimeout(() => {
            // Mostrar recompensa primero
            showRewardDialog(level, () => {
                if (Array.isArray(level.next) && level.next.length > 1) {
                    showNextLevelDialog(level.next, (selectedLevel) => {
                        localStorage.setItem("save_level", selectedLevel);
                        saveGame();
                        console.log(selectedLevel);
                        setTimeout(() => {
                            window.location.href = `nivel.html?id=${selectedLevel}`;
                        }, 5000);
                    });
                } else if (Array.isArray(level.next) && level.next.length === 1) {
                    localStorage.setItem("save_level", level.next[0]);
                    saveGame(); //Ocurre en el penúltimo nivel
                    console.log(level.next[0]);
                    setTimeout(() => {
                        window.location.href = `nivel.html?id=${level.next[0]}`;
                    }, 5000);
                } else {
                    showSnackbar("🎉 ¡Has completado la aventura!");
                }
            });
        }, 3000);
    } else {
        showSnackbar("❌ Respuesta incorrecta, intenta de nuevo.");
    }
}
