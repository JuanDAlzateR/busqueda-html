import { LEVELS } from "./levels.js";

// ==================== ESTADÍSTICAS ====================
function setLoadStat(id, value) {
  const element = document.getElementById(id);
  if (element) element.innerText = value;
}

export function loadStats() {
  const stats = JSON.parse(localStorage.getItem("stats")) || {
    amor: 0,
    fe: 0,
    dinero: 0,
    tiempo: 0,
    acciones: 0,
  };
  document.getElementById("stat-amor").innerText = stats.amor;
  document.getElementById("stat-fe").innerText = stats.fe;
  document.getElementById("stat-dinero").innerText = stats.dinero;
  document.getElementById("stat-tiempo").innerText = stats.tiempo;
  setLoadStat("stat-acciones",stats.acciones);
}

export function modifyStat(stat, value) {
  const stats = JSON.parse(localStorage.getItem("stats")) || {
    amor: 0,
    fe: 0,
    dinero: 0,
    tiempo: 0,
    acciones: 0,
  };
  stats[stat] += value;
  localStorage.setItem("stats", JSON.stringify(stats));
  loadStats();
}

export function setStat(stat, value) {
  const stats = JSON.parse(localStorage.getItem("stats")) || {
    amor: 0,
    fe: 0,
    dinero: 0,
    tiempo: 0,
    acciones: 0,
  };
  stats[stat] = value;
  localStorage.setItem("stats", JSON.stringify(stats));
  loadStats();
}

export function getStat(stat) {
  const stats = JSON.parse(localStorage.getItem("stats"))
  return stats?.[stat] ?? -1;
}

export function resetStat() {
  const stats = {
    amor: 5,
    fe: 5,
    dinero: 5,
    tiempo: 5,
    acciones: 1,
  };  
  localStorage.setItem("stats", JSON.stringify(stats));
  loadStats();
}

// ==================== CARGA DE NIVEL ====================
export function loadLevel() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "JD"; // Nivel por defecto
  const level = LEVELS[id];
  localStorage.setItem("current_level", id) //guardar el id del nivel actual

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
    localStorage.setItem("previous_level",id);
    window.location.href = `save.html`;
  }
  loadStats();

}

// ==================== SNACKBAR ====================
export function showSnackbar(message,time=4000,permanent=false) {
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

  if(!permanent){
    setTimeout(() => {
      snackbar.classList.remove("show");
      snackbar.remove();
    }, time);
  }
}

// ==================== QR ====================
export function goToQR(currentLevel) {
  if(getStat("acciones")>0){
    localStorage.setItem("previous_level", currentLevel);
    setTimeout(() =>{window.location.href = "qr.html"},1000);
  }else{
    showSnackbar("Este turno ya no quedan más acciones disponibles");
  }
    
}

// ==================== GPS ====================
export function goToGPS(currentLevel) {
  localStorage.setItem("previous_level", currentLevel);
  window.location.href = "gps-test.html";

}


// ==================== CONFIRMAR RESPUESTA ====================
export function confirmPassword(levelId) {
  const input = document.getElementById("password-input").value.trim().toLowerCase();
  const level = LEVELS[levelId];
  if (!input) {
    showSnackbar("⚠️ Escribe una respuesta antes de continuar.");
    return;
  }

  if (input === level.password.toLowerCase()) {
    showSnackbar("✅ ¡Respuesta correcta!<br>Haz empleado ❤️ y pasado el nivel",5000);
    modifyStat("amor", -1);
    setStat("acciones",1);
    setTimeout(() => {
      // Mostrar recompensa primero
      showRewardDialog(level, () => {
        if (Array.isArray(level.next) && level.next.length > 1) {
          showNextLevelDialog(level.next);
        } else if (Array.isArray(level.next) && level.next.length === 1) {
          localStorage.setItem("save_level",level.next[0]);
          saveGame(); //Ocurre en el penúltimo nivel
          console.log(level.next[0]);
          setTimeout(() => {
          window.location.href = `nivel.html?id=${level.next[0]}`;
          },10000);
        } else {
          showSnackbar("🎉 ¡Has completado la aventura!");
        }
      });
    }, 3000);
  } else {
    showSnackbar("❌ Respuesta incorrecta, intenta de nuevo.");
  }

}



// ==================== POPUP PARA ELEGIR RUTA ====================
export function showNextLevelDialog(nextLevels) {
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
      localStorage.setItem("save_level",lvl),
      saveGame();
      console.log(lvl);
       setTimeout(() => {
      window.location.href = `nivel.html?id=${lvl}`;
       },10000);
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

// ==================== FUNCION GPS ====================
export function getLocation() {
  showSnackbar("activando gps, favor esperar unos segundos...");
  return new Promise((resolve, reject) =>{
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log(`📍 Tu ubicación: ${lat}, ${lon}`);
          //showSnackbar(`📍 Ubicación detectada: ${lat.toFixed(4)}, ${lon.toFixed(4)}`);
          localStorage.setItem("last_location", JSON.stringify({ lat, lon }));
          resolve({lat,lon});
          
        },
        (error) => {
          console.error("❌ Error obteniendo ubicación:", error.message);
          //showSnackbar("❌ No se pudo obtener la ubicación. Verifica permisos GPS.");
          reject(error)
        }
      );
    } else {
      //showSnackbar("⚠️ Este dispositivo no soporta geolocalización.");
      reject(new Error("Geolocalización no soportada."));
    }
  });
}

export async function handleLocation() {
  try {
    const { lat, lon } = await getLocation();
    console.log("Ubicación obtenida:", lat, lon);
    showSnackbar(`📍handle ${lat.toFixed(6)}, ${lon.toFixed(6)}`,0,true);
  } catch (err) {
    console.error("Error:", err.message);
    showSnackbar("❌ No se pudo obtener la ubicación.");
  }
}

export async function compareLocation(levelId) {
  const tolerance = 0.00005;
  const level = LEVELS[levelId];

  try {
    const { lat, lon } = await getLocation();    
    const compare=diferenceLocation(lat,level.gps.lat,lon,level.gps.lon,tolerance);
    if (compare){
      //showSnackbar("✅Locacion correcta.");
    }else{
      //showSnackbar("❌ Locación incorrecta.");
    }
    return compare;
  } catch (err) {
    console.error("Error:", err.message);
    showSnackbar("❌ No se pudo obtener la ubicación.");
    return false;
  }

}

export function diferenceLocation(lat1,lat2,lon1,lon2,tolerance) {
  const difLat=Math.abs(lat1-lat2);
  const difLon=Math.abs(lon1-lon2);
  showSnackbar(`Lat: ${difLat.toFixed(5)},  Lon: ${difLon.toFixed(5)}`,0,true);
  return (difLat<=tolerance) && (difLon<=tolerance);
}

// ==================== FUNCION GPS ====================
export function diferenceGPS(lat1,lat2,lon1,lon2) {
  const difLat=Math.abs(lat1-lat2);
  const difLon=Math.abs(lon1-lon2);
  return {difLat,difLon};
}

export async function compareLocationGPS(levelId) {
  const tolerance = 0.00005;
  const level = LEVELS[levelId];
  //showSnackbar("debug:: level: "+levelId,0,true);
  try {
    const { lat, lon } = await getLocation();    
    const {difLat,difLon}=diferenceGPS(lat,level.gps.lat,lon,level.gps.lon)
    showSnackbar(`level: ${levelId}  lat: ${difLat.toFixed(5)}  lon: ${difLon.toFixed(5)}`,0,true);

  } catch (err) {
    console.error("Error:", err.message);
    showSnackbar("❌ No se pudo obtener la ubicación.");
    return false;
  }

}

// ==================== SAVE GAME ====================
export function saveGame() {
  const gameState = {    
    level: localStorage.getItem("save_level"),
    stats: JSON.parse(localStorage.getItem("stats"))
  };
  localStorage.setItem("savegame", JSON.stringify(gameState));
  console.log("save:"+JSON.stringify(gameState));
  //showSnackbar("Juego guardado. Nivel: "+gameState.level);
}

export function loadGame() {
  const data = JSON.parse(localStorage.getItem("savegame"));
  if (data) {
    //localStorage.setItem("current_level", data.level); //no hay necesidad pues loadlevel lo guarda.
    localStorage.setItem("stats", JSON.stringify(data.stats));
    setTimeout(() => {
    window.location.href = `nivel.html?id=${data.level}`;
    },10000);
  }
}

export function downloadSave() {
  saveGame();
  const data = localStorage.getItem("savegame");
  console.log("data:"+data);
  const blob = new Blob([data], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "savegame.json";
  a.click();
}

export function uploadSave(file) {
  const reader = new FileReader();
  reader.onload = () => {
    console.log("result: "+reader.result);
    localStorage.setItem("savegame", reader.result);    
  }
  reader.readAsText(file); //al terminar la lectura activa el evneto onload
  console.log("loaded file: "+file.name);
 
  setTimeout(() => {
    console.log("loaded savegame: "+localStorage.getItem("savegame"));
    loadGame(); //importante: se requiere un pequeño delay para esperar a que finalice el reader.
    },100);
  

}

// ==================== POPUP GUARDAR ====================
export function showSaveDialog() {
  // Crear el fondo oscuro
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  // Crear el cuadro del diálogo
  const dialog = document.createElement("div");
  dialog.className = "dialog";

  const title = document.createElement("h2");
  title.innerText = "Puedes guardar o cargar el juego ❤️";

  const buttons = document.createElement("div");
  buttons.className = "dialog-buttons";

  let btn = document.createElement("button");
  btn.innerText = `Guardar`;
  btn.onclick = () => {
    overlay.remove();
    saveGame();
  };
  buttons.appendChild(btn);

  const data = JSON.parse(localStorage.getItem("savegame"));

  if (data) {
  btn = document.createElement("button");
  btn.innerText = `Cargar: nivel ${data.level}`;
  btn.onclick = () => {
    overlay.remove();
    loadGame();
  };
  buttons.appendChild(btn);
  }

  btn = document.createElement("button");
  btn.innerText = `Download savegame`;
  btn.onclick = () => {
    overlay.remove();
    downloadSave();
  };
  buttons.appendChild(btn);

  btn = document.createElement("button");
  btn.innerText = `Upload savegame`;
  btn.onclick = () => {
    overlay.remove();
    downloadSave();
  };
  buttons.appendChild(btn);

  const closeBtn = document.createElement("button");
  closeBtn.innerText = "Cancelar";
  closeBtn.onclick = () => overlay.remove();

  dialog.appendChild(title);
  dialog.appendChild(buttons);
  dialog.appendChild(closeBtn);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
}



