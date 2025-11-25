// ==================== CARDS MODULE ====================
import { modifyStat } from "./stats.js";
import { showSnackbar } from "./ui.js";

/**
 * @typedef {Object} CardDefinition
 * @property {string} name
 * @property {function(): void} effect
 * @property {string} message
 */

class CardManager {
    constructor() {
        /** @type {Object<string, CardDefinition>} */
        this.cards = {
            "QR1": {
                name: "Carta de Amor",
                effect: () => {
                    modifyStat("amor", 2);
                    modifyStat("acciones", -1);
                },
                message: "¡Has ganado puntos de amor! ❤️"
            },
            "QR2": {
                name: "Carta de Fe",
                effect: () => {
                    modifyStat("fe", 2);
                    modifyStat("acciones", -1);
                },
                message: "¡Has ganado puntos de fe! ✝️"
            },
            "QR3": {
                name: "Carta de Dinero",
                effect: () => {
                    modifyStat("dinero", 2);
                    modifyStat("acciones", -1);
                },
                message: "¡Has ganado dinero! 💰"
            },
            "QR4": {
                name: "Carta de Tiempo",
                effect: () => {
                    modifyStat("tiempo", 2);
                    modifyStat("acciones", -1);
                },
                message: "¡Has ganado tiempo! ⏳"
            },
            "QR5": {
                name: "Carta de Acción",
                effect: () => {
                    modifyStat("acciones", 3);
                },
                message: "¡Has recuperado acciones! ⚙️"
            },
            // Legacy support
            "CAFE": {
                name: "Carta Café",
                effect: () => {
                    modifyStat("amor", 2);
                    modifyStat("acciones", -1);
                },
                message: "¡Código correcto! ❤️"
            }
        };
    }

    /**
     * Processes a QR code string.
     * @param {string} code 
     */
    processQRCode(code) {
        // If code is not provided, try to get from localStorage (legacy behavior)
        if (!code) {
            code = localStorage.getItem("last_qr");
            localStorage.removeItem("last_qr");
        }

        console.log("Último Código detectado:", code);

        if (code) {
            const cardKey = code.toUpperCase();
            const card = this.cards[cardKey];

            if (card) {
                card.effect();
                showSnackbar(card.message);
            } else {
                showSnackbar("Código incorrecto o carta desconocida 😅");
            }
        }
    }
}

export const cardManager = new CardManager();

// Export wrapper function for backward compatibility
export const CARDS = cardManager.cards;
export const processQRCode = () => cardManager.processQRCode();
