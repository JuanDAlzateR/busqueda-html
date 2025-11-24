// ==================== UI MODULE ====================

// ==================== SNACKBAR ====================
export function showSnackbar(message, time = 4000, permanent = false) {
    const snackbar = document.createElement("div");
    snackbar.className = "snackbar";
    snackbar.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">✖</button>
  `;
    document.body.appendChild(snackbar);

    setTimeout(() => {
        snackbar.classList.add("show");
    }, 100); // pequeña pausa para activar animación

    if (!permanent) {
        setTimeout(() => {
            snackbar.classList.remove("show");
            snackbar.remove();
        }, time);
    }
}

// ==================== POPUP PARA ELEGIR RUTA ====================
export function showNextLevelDialog(nextLevels, onSelect) {
    // Crear el fondo oscuro
    const overlay = document.createElement("div");
    overlay.className = "overlay";

    // Crear el cuadro del diálogo
    const dialog = document.createElement("div");
    dialog.className = "dialog";

    const title = document.createElement("h2");
    title.innerText = "Elige tu siguiente destino ❤️";

    const buttons = document.createElement("div");
    buttons.className = "dialog-buttons";

    nextLevels.forEach((lvl) => {
        const btn = document.createElement("button");
        btn.innerText = `Ir a nivel ${lvl}`;
        btn.onclick = () => {
            overlay.remove();
            onSelect(lvl);
        };
        buttons.appendChild(btn);
    });

    const closeBtn = document.createElement("button");
    closeBtn.innerText = "Cancelar";
    closeBtn.onclick = () => overlay.remove();

    dialog.appendChild(title);
    dialog.appendChild(buttons);
    dialog.appendChild(closeBtn);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
}

// ==================== POPUP PARA RECOMPENSA ====================
export function showRewardDialog(level, onContinue) {
    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const dialog = document.createElement("div");
    dialog.className = "dialog";

    const title = document.createElement("h2");
    title.innerText = "🎁 ¡Recompensa desbloqueada!";

    const img = document.createElement("img");
    img.src = level.reward?.image || "assets/images/reward_default.png";
    img.alt = "Recompensa";
    img.style.width = "200px";
    img.style.borderRadius = "10px";
    img.style.margin = "10px 0";

    const text = document.createElement("p");
    text.innerText = level.reward?.text || "¡Has ganado puntos de amor! ❤️";

    const btn = document.createElement("button");
    btn.innerText = "Continuar ➡️";
    btn.onclick = () => {
        overlay.remove();
        onContinue();
    };

    dialog.appendChild(title);
    dialog.appendChild(img);
    dialog.appendChild(text);
    dialog.appendChild(btn);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
}
