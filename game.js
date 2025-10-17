// ==================== CONFIGURACIÓN DE NIVELES ====================
const LEVELS = {
  "1": {
    text: "💌 Pista 1:\nEl lugar donde comenzó todo...",
    password: "cafe",
    next: "2A",
    image: "assets/images/perritos.jpg",
  },
  "2A": {
    text: "🌳 Pista 2A:\nBusca el árbol donde oramos juntos por primera vez.",
    password: "fe",
    next: "2B",
    image: "assets/images/corazon.jpg",
  },
  "2B": {
    text: "☕ Pista 2B:\nRecuerda aquel café donde te reíste sin parar.",
    password: "risa",
    next: "final",
    image: "assets/images/corazon.png",
  },
  "final": {
    text: "💍 Has completado la carrera del amor. Prepárate para el gran momento.",
    password: "?",
    next: null,
    image: "assets/images/corazon.png",
  },
};

// ==================== ESTADÍSTICAS ====================
function loadStats() {
  const stats = JSON.parse(localStorage.getItem("stats")) || {
    amor: 0,
    fe: 0,
    dinero: 0,
    tiempo: 0,
  };
  document.getElementById("stat-amor").innerText = stats.amor;
  document.getElementById("stat-fe").innerText = stats.fe;
  document.getElementById("stat-dinero").innerText = stats.dinero;
  document.getElementById("stat-tiempo").innerText = stats.tiempo;
}

function modifyStat(stat, value) {
  const stats = JSON.parse(localStorage.getItem("stats")) || {
    amor: 0,
    fe: 0,
    dinero: 0,
    tiempo: 0,
  };
  stats[stat] += value;
  localStorage.setItem("stats", JSON.stringify(stats));
  loadStats();
}

function resetStat() {
  const stats = {
    amor: 5,
    fe: 5,
    dinero: 5,
    tiempo: 5,
  };  
  localStorage.setItem("stats", JSON.stringify(stats));
  loadStats();
}

// ==================== SNACKBAR ====================
function showSnackbar(message,time=4000) {
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

  setTimeout(() => {
    snackbar.classList.remove("show");
    snackbar.remove();
  }, time);
}

// ==================== QR ====================
function goToQR(currentLevel) {
  localStorage.setItem("previous_level", currentLevel);
  window.location.href = "qr.html";
}

// ==================== CONFIRMAR RESPUESTA ====================
function confirmPassword(levelId) {
  const input = document.getElementById("password-input").value.trim().toLowerCase();
  const level = LEVELS[levelId];
  if (!input) {
    showSnackbar("⚠️ Escribe una respuesta antes de continuar.");
    return;
  }
  if (input === level.password.toLowerCase()) {    
    if (level.next) {
      showSnackbar("✅ ¡Respuesta correcta!<br>Haz empleado ❤️ y pasado el nivel",5000);
      modifyStat("amor", -1);
      setTimeout(() => (window.location.href = `nivel.html?id=${level.next}`),4000);
            
    } else {
      showSnackbar("🎉 ¡Has completado la aventura!");
    }
  } else {
    showSnackbar("❌ Respuesta incorrecta, intenta de nuevo.");
  }
}

// ==================== CARGA DE NIVEL ====================
function loadLevel() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "1"; // Nivel por defecto
  const level = LEVELS[id];

  if (!level) {
    document.querySelector(".container").innerHTML = "<h1>Nivel no encontrado 😢</h1>";
    return;
  }

  document.querySelector("h1").innerText = `Nivel ${id}`;
  document.querySelector("#level-image").src = level.image;
  document.querySelector("#level-text").innerHTML = level.text.replace(/\n/g, "<br>");
  document.querySelector("#scan-btn").onclick = () => goToQR(id);
  document.querySelector("#confirm-btn").onclick = () => confirmPassword(id);

  loadStats();

  // Verifica si hay resultado de escaneo pendiente
  const last = localStorage.getItem("last_qr");
  if (last) {
    if (last.toLowerCase() === level.password.toLowerCase()) {
      modifyStat("amor", 2);
      showSnackbar("¡Código correcto! ❤️");
      localStorage.removeItem("last_qr");
      if (level.next) {
        setTimeout(() => (window.location.href = `nivel.html?id=${level.next}`), 2000);
      }
    } else {
      showSnackbar("Código incorrecto 😅");
      localStorage.removeItem("last_qr");
    }
  }
}