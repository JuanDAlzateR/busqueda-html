// ==================== CARDS MODULE ====================
import { getStat, modifyStat } from "./stats.js";
import { showSnackbar, showInputDialog } from "./ui.js";

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
                },
                message: "¡Has ganado puntos de amor! ❤️"
            },
            "QR2": {
                name: "Carta de Fe",
                effect: () => {
                    modifyStat("fe", 2);
                },
                message: "¡Has ganado puntos de fe! ✝️"
            },
            "QR3": {
                name: "Carta de Dinero",
                effect: () => {
                    modifyStat("dinero", 2);
                },
                message: "¡Has ganado dinero! 💰"
            },
            "QR4": {
                name: "Carta de Tiempo",
                effect: () => {
                    modifyStat("tiempo", 2);
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
            "CAFE": {
                name: "Carta Cafe",
                effect: () => {
                    modifyStat("dinero", 3);
                },
                message: "¡Has recuperado acciones! ⚙️"
            },
            // Cards
            "QR01": {
                name: "Teletransportación",
                effect: () => {
                    //
                },
                message: "Has usado teletransportación"
            },
            "QR02": {
                name: "Paseo Juntos",
                effect: () => {
                    modifyStat("acciones", 2);
                },
                message: "Arrastra 1 carta"
            },
            "QR03": {
                name: "Carta de Dinero",
                effect: () => {
                    modifyStat("acciones", +1);
                },
                message: "Arrastra 2 cartas"
            },
            "QR04": {
                name: "Regalo con Amor",
                effect: () => {
                    modifyStat("amor", 3);

                },
                message: "¡Has ganado 3 puntos de amor! ❤️"
            },
            "QR05": {
                name: "Planear Paseo",
                effect: () => {
                    //
                },
                message: "¡Has usado planear paseo! ⚙️"
            },
            "QR06": {
                name: "Consultar Mapa",
                effect: () => {
                    modifyStat("amor", 2);

                },
                message: "¡Has usado consulatr mapa!"
            },
            "QR07": {
                name: "Parte Mapa",
                effect: () => {
                    //
                    ;
                },
                message: "¡Has usado parte mapa!"
            },
            "QR08": {
                name: "Rezar a Maria",
                effect: () => {
                    modifyStat("fe", 2);

                },
                message: "¡Has ganado 2 puntos de fe! ✝️"
            },
            "QR09": {
                name: "Ahorro",
                effect: () => {
                    modifyStat("dinero", 1);

                },
                message: "¡Has ganado dinero! 💰"
            },
            "QR10": {
                name: "Carta de Acción",
                effect: () => {
                    modifyStat("acciones", 3);
                },
                message: "¡Has recuperado acciones! ⚙️"
            },
            "QR11": {
                name: "Renacer en el Espíritu",
                effect: () => {
                    //

                },
                message: "Elimina una carta permanentemente"
            },
            "QR12": {
                name: "Carta de Fe",
                effect: () => {
                    modifyStat("fe", 2);

                },
                message: "¡Has ganado puntos de fe! ✝️"
            },
            "QR13": {
                name: "juegos de mesa",
                effect: () => {
                    //

                },
                message: "Aplica el efecto de la carta"
            },
            "QR14": {
                name: "Compartir con amigos",
                effect: () => {
                    //

                },
                message: "¡Has ganado tiempo! ⏳"
            },
            "QR15": {
                name: "Compartir en familia",
                effect: () => {
                    //
                },
                message: "¡Has recuperado acciones! ⚙️"
            },
            "QR16": {
                name: "Salir a comer",
                effect: () => {
                    //

                },
                message: "Arrastra 3 cartas"
            },
            "QR17": {
                name: "Dia de picnic",
                effect: () => {
                    modifyStat("acciones", 2);

                },
                message: "¡Has ganado puntos de fe! ✝️"
            },
            "QR18": {
                name: "Conversar Juntos",
                effect: () => {
                    modifyStat("acciones", 1);

                },
                message: "Mira la siguiente carta del mazo, descartala o devuelvela al mazo en su posición"
            },
            "QR19": {
                name: "Estado Barados",
                effect: () => {
                    //

                },
                message: "¡No tiene efecto!"
            },
            "QR20": {
                name: "Ir a un retiro",
                effect: () => {
                    //activar efecto para el siguiente turno

                },
                message: "¡Descarta toda tu mano!"
            },
            "QR21": {
                name: "Cor 1 13",
                effect: () => {
                    //aplicar efecto durante este turno.

                },
                message: "¡Has ganado puntos de amor! ❤️"
            },
            "QR22": {
                name: "Comer afuera",
                effect: () => {
                    showSnackbar(`Comer afuera 🍽️`, 3000);
                    showInputDialog(
                        "Comer afuera 🍽️",
                        "Favor ingrese la cantidad de dinero a gastar:",
                        (cantidad) => {
                            modifyStat("dinero", -cantidad);
                            showSnackbar(`Has gastado $${cantidad} en comida. ¡Buen provecho! 😋`);
                        }
                    );
                },
                message: "¡Hora de comer! 🍕"
            },
            "QR23": {
                name: "Carta de Dinero",
                effect: () => {
                    modifyStat("dinero", 2);

                },
                message: "¡Has ganado dinero! 💰"
            },
            "QR24": {
                name: "Carta de Tiempo",
                effect: () => {
                    modifyStat("tiempo", 2);

                },
                message: "¡Has ganado tiempo! ⏳"
            },
            "QR25": {
                name: "Carta de Acción",
                effect: () => {
                    modifyStat("acciones", 3);
                },
                message: "¡Has recuperado acciones! ⚙️"
            },
            "QR26": {
                name: "Carta de Amor",
                effect: () => {
                    modifyStat("amor", 2);

                },
                message: "¡Has ganado puntos de amor! ❤️"
            },
            "QR27": {
                name: "Carta de Fe",
                effect: () => {
                    modifyStat("fe", 2);

                },
                message: "¡Has ganado puntos de fe! ✝️"
            },
            "QR28": {
                name: "Carta de Dinero",
                effect: () => {
                    modifyStat("dinero", 2);

                },
                message: "¡Has ganado dinero! 💰"
            },
            "QR29": {
                name: "Carta de Tiempo",
                effect: () => {
                    modifyStat("tiempo", 2);

                },
                message: "¡Has ganado tiempo! ⏳"
            },
            "QR30": {
                name: "Carta de Acción",
                effect: () => {
                    modifyStat("acciones", 3);
                },
                message: "¡Has recuperado acciones! ⚙️"
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
                if (getStat("acciones") > 0) {
                    modifyStat("acciones", -1);
                    card.effect();
                    showSnackbar(card.message);
                } else {
                    showSnackbar("No tienes acciones para jugar la carta 😅");
                }

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
