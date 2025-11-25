// ==================== CARDS MODULE ====================
import { modifyStat } from "./stats.js";
import { showSnackbar } from "./ui.js";

export const CARDS = {
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

export function processQRCode() {
    const last = localStorage.getItem("last_qr");
    console.log("Último Código detectado:", last);

    if (last) {
        const cardKey = last.toUpperCase(); // Normalize to uppercase
        const card = CARDS[cardKey];

        if (card) {
            card.effect();
            showSnackbar(card.message);
        } else {
            showSnackbar("Código incorrecto o carta desconocida 😅");
        }
        localStorage.removeItem("last_qr");
    }
}
