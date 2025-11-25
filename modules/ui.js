// ==================== UI MODULE ====================

class UIManager {
    constructor() {
        this.overlayClass = "overlay";
        this.dialogClass = "dialog";
        this.snackbarClass = "snackbar";
    }

    /**
     * Shows a snackbar message.
     * @param {string} message 
     * @param {number} time 
     * @param {boolean} permanent 
     */
    showSnackbar(message, time = 4000, permanent = false) {
        const snackbar = document.createElement("div");
        snackbar.className = this.snackbarClass;
        snackbar.innerHTML = `
            <span>${message}</span>
            <button aria-label="Cerrar" onclick="this.parentElement.remove()">✖</button>
        `;
        document.body.appendChild(snackbar);

        // Trigger animation
        requestAnimationFrame(() => {
            snackbar.classList.add("show");
        });

        if (!permanent) {
            setTimeout(() => {
                snackbar.classList.remove("show");
                setTimeout(() => snackbar.remove(), 500); // Wait for transition
            }, time);
        }
    }

    /**
     * Creates a modal overlay.
     * @returns {HTMLElement}
     */
    createOverlay() {
        const overlay = document.createElement("div");
        overlay.className = this.overlayClass;
        return overlay;
    }

    /**
     * Shows a dialog to choose the next level.
     * @param {string[]} nextLevels 
     * @param {function(string): void} onSelect 
     */
    showNextLevelDialog(nextLevels, onSelect) {
        const overlay = this.createOverlay();
        const dialog = document.createElement("div");
        dialog.className = this.dialogClass;

        const title = document.createElement("h2");
        title.innerText = "Elige tu siguiente destino ❤️";

        const buttonsContainer = document.createElement("div");
        buttonsContainer.className = "dialog-buttons";

        nextLevels.forEach((lvl) => {
            const btn = document.createElement("button");
            btn.innerText = `Ir a nivel ${lvl}`;
            btn.onclick = () => {
                overlay.remove();
                onSelect(lvl);
            };
            buttonsContainer.appendChild(btn);
        });

        const closeBtn = document.createElement("button");
        closeBtn.innerText = "Cancelar";
        closeBtn.onclick = () => overlay.remove();

        dialog.append(title, buttonsContainer, closeBtn);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
    }

    /**
     * Shows a reward dialog.
     * @param {Object} level 
     * @param {function(): void} onContinue 
     */
    showRewardDialog(level, onContinue) {
        const overlay = this.createOverlay();
        const dialog = document.createElement("div");
        dialog.className = this.dialogClass;

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

        dialog.append(title, img, text, btn);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
    }
}

export const uiManager = new UIManager();

// Export wrapper functions for backward compatibility
export const showSnackbar = (m, t, p) => uiManager.showSnackbar(m, t, p);
export const showNextLevelDialog = (n, o) => uiManager.showNextLevelDialog(n, o);
export const showRewardDialog = (l, o) => uiManager.showRewardDialog(l, o);
