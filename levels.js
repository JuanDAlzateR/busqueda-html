// ==================== CONFIGURACIÓN DE NIVELES ====================

/**
 * @typedef {Object} Reward
 * @property {string} text
 * @property {string} image
 */

/**
 * @typedef {Object} GPSCoordinates
 * @property {number} lat
 * @property {number} lon
 */

/**
 * @typedef {Object} LevelDefinition
 * @property {string} text
 * @property {string} password
 * @property {string[]} next
 * @property {string} image
 * @property {Reward} reward
 * @property {GPSCoordinates} gps
 */

/** @type {Object<string, LevelDefinition>} */
const LEVELS = {
  "Inicio": {
    text: "💌 Pista 0:\nEl lugar donde comenzó todo...",
    password: "cafe1",
    next: ["Melisa", "JD"],
    image: "assets/images/perritos.jpg",
    reward: {
      text: "¡Ganaste +2 puntos de Amor! ❤️",
      image: "assets/images/reward_1.jpeg",
    },
    gps: {
      lat: 6.2080,
      lon: -75.6010,
    },
  },
  "JD": {
    text: "💌 Pista 1:\nEl lugar donde comenzó todo...",
    password: "cafe2",
    next: ["Melisa", "CP"],
    image: "assets/images/perritos.jpg",
    reward: {
      text: "¡Ganaste +2 puntos de Amor! ❤️",
      image: "assets/images/reward_1.jpeg",
    },
    gps: {
      lat: 6.2080,
      lon: -75.6010,
    },
  },
  "Melisa": {
    text: "🌳 Pista 2A:\nBusca el árbol donde oramos juntos por primera vez.",
    password: "fe",
    next: ["final"],
    image: "assets/images/corazon.jpg",
    reward: {
      text: "¡Ganaste +2 puntos de Amor! ❤️",
      image: "assets/images/reward_heart.png",
    },
    gps: {
      lat: 6.1729,
      lon: -75.5882,
    },
  },
  "CP": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "risa",
    next: ["final"],
    image: "assets/images/corazon.png",
    reward: {
      text: "¡Ganaste +2 puntos de Amor! ❤️",
      image: "assets/images/reward_heart.png",
    },
    gps: {
      lat: 6.2080,
      lon: -75.6010,
    },
  },
  "final": {
    text: "💍 Has completado la carrera del amor. Prepárate para el gran momento.",
    password: "?",
    next: [],
    image: "assets/images/corazon.png",
    reward: {
      text: "¡Ganaste +2 puntos de Amor! ❤️",
      image: "assets/images/reward_heart.png",
    },
    gps: {
      lat: 6.2080,
      lon: -75.6010,
    },
  },
};
//6.207995, -75.600965 JD
//6.172938, -75.588226 Melisa

// Prevent accidental modification of level configuration
Object.freeze(LEVELS);

// 🔹 Hacerlo accesible desde otros archivos
export { LEVELS };