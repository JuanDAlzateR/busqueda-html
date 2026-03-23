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
    password: "22",
    next: ["Melisa", "JD", "Viva Envigado"],
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
    password: "22",
    next: ["Los Molinos", "Los Perritos", "Santa Juana", "La Resurrección", "CP"],
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
    password: "22",
    next: ["Viva Envigado", "El portal", "CP"],
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
  "Viva Envigado": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["María Auxiliadora", "CP", "JD"],
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
  "El portal": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["María Auxiliadora"],
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
  "CP": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["Melisa", "JD", "Los Perritos", "2do Mirador Las Palmas"],
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
  "María Auxiliadora": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["San Jose de la Montaña"],
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
  "San Jose de la Montaña": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["Mayorca"],
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
  "Mayorca": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["Viva Envigado"],
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
  //Medellin


  "Los Perritos": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["CP"],
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
  "Santa Juana": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["CP", "La Resurrección"],
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
  "La Resurrección": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["Parques del Rio"],
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
  "Parques del Rio": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["Los Molinos", "CP", "Metropolitana"],
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
  "Los Molinos": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["La Resurrección", "Jardín Botánico", "Unal", "Ntra Señora del Carmen", "Parques del Rio"],
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
  "Jardín Botánico": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["Unal", "Metropolitana", "Doña Blanca"],
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
  "Metropolitana": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["Jardín Botánico", "Parques del Rio", "Unal"],
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
  "Unal": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["Metropolitana", "Jardín Botánico", "Doña Blanca"],
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
  "Doña Blanca": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["Jardín Botánico", "Unal"],
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
  "Ntra Sra del Carmen": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["Doña Blanca"],
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
  //Nivel 2

  "2do Mirador Las Palmas": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["LeMont"],
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
  "LeMont": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["SCM", "Ricas Arepas"],
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
  "Ricas Arepas": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["Aeropuerto"],
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
  "SCM": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["Aeropuerto"],
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
  "Aeropuerto": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["Ave María"],
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
  "Estadero Piedras Blancas": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["Restaurante Jardines de Oriente"],
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
  "Restaurante Jardines de Oriente": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["Santi"],
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
  "Santi": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "22",
    next: ["Ave María"],
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
  "Ave María": {
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