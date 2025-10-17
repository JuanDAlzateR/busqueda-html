// Inicializa stats si no existen
if (!localStorage.getItem("stats")) {
  const initialStats = { amor: 5, fe: 5, dinero: 5, tiempo: 5 };
  localStorage.setItem("stats", JSON.stringify(initialStats));
}

function getStats() {
  return JSON.parse(localStorage.getItem("stats"));
}

function updateStatsDisplay() {
  const stats = getStats();
  document.getElementById("stat-amor").innerText = stats.amor + "/20";
  document.getElementById("stat-fe").innerText = stats.fe + "/10";
  document.getElementById("stat-dinero").innerText = stats.dinero + "/10";
  document.getElementById("stat-tiempo").innerText = stats.tiempo + "/10";
}

function modifyStat(stat, delta) {
  const stats = getStats();
  stats[stat] = Math.min(Math.max(stats[stat] + delta, 0), stat === "amor" ? 20 : 10);
  localStorage.setItem("stats", JSON.stringify(stats));
  updateStatsDisplay();
}

function resetStats() {
  localStorage.removeItem("stats");
  location.reload();
}

document.addEventListener("DOMContentLoaded", updateStatsDisplay);