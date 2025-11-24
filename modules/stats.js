// ==================== STATS MODULE ====================

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
    const amorEl = document.getElementById("stat-amor");
    if (amorEl) amorEl.innerText = stats.amor;

    const feEl = document.getElementById("stat-fe");
    if (feEl) feEl.innerText = stats.fe;

    const dineroEl = document.getElementById("stat-dinero");
    if (dineroEl) dineroEl.innerText = stats.dinero;

    const tiempoEl = document.getElementById("stat-tiempo");
    if (tiempoEl) tiempoEl.innerText = stats.tiempo;

    setLoadStat("stat-acciones", stats.acciones);
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
    const stats = JSON.parse(localStorage.getItem("stats"));
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
    localStorage.setItem("visited_places", JSON.stringify({}));
    loadStats();
}
