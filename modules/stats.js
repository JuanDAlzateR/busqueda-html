// ==================== STATS MODULE ====================
/**
 * @typedef {Object} GameStats
 * @property {number} amor
 * @property {number} fe
 * @property {number} dinero
 * @property {number} tiempo
 * @property {number} acciones
 */

class StatsManager {
    constructor() {
        this.defaultStats = {
            amor: 5,
            fe: 5,
            dinero: 5,
            tiempo: 5,
            acciones: 1,
        };
        this.storageKey = "stats";
    }

    /**
     * @returns {GameStats}
     */
    getStats() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : { ...this.defaultStats };
        } catch (e) {
            console.error("Error loading stats:", e);
            return { ...this.defaultStats };
        }
    }

    /**
     * @param {GameStats} stats 
     */
    saveStats(stats) {
        localStorage.setItem(this.storageKey, JSON.stringify(stats));
        this.notifyChange(stats);
    }

    /**
     * @param {string} statName 
     * @param {number} value 
     */
    modifyStat(statName, value) {
        const stats = this.getStats();
        if (stats.hasOwnProperty(statName)) {
            stats[statName] += value;
            this.saveStats(stats);
        } else {
            console.warn(`Stat '${statName}' not found.`);
        }
    }

    /**
     * @param {string} statName 
     * @param {number} value 
     */
    setStat(statName, value) {
        const stats = this.getStats();
        if (stats.hasOwnProperty(statName)) {
            stats[statName] = value;
            this.saveStats(stats);
        } else {
            console.warn(`Stat '${statName}' not found.`);
        }
    }

    /**
     * @param {string} statName 
     * @returns {number}
     */
    getStat(statName) {
        const stats = this.getStats();
        return stats[statName] ?? -1;
    }

    resetStats() {
        this.saveStats({ ...this.defaultStats });
        localStorage.setItem("visited_places", JSON.stringify({}));
    }

    /**
     * @param {GameStats} stats 
     */
    notifyChange(stats) {
        const event = new CustomEvent('statsUpdated', { detail: stats });
        document.dispatchEvent(event);
        this.updateUI(stats); // Keep direct UI update for now, but event is better
    }

    /**
     * @param {GameStats} stats 
     */
    updateUI(stats) {
        const updateElement = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.innerText = value;
        };

        updateElement("stat-amor", stats.amor);
        updateElement("stat-fe", stats.fe);
        updateElement("stat-dinero", stats.dinero);
        updateElement("stat-tiempo", stats.tiempo);
        updateElement("stat-acciones", stats.acciones);
    }

    // Initial load
    init() {
        this.updateUI(this.getStats());
    }
}

export const statsManager = new StatsManager();

// Export wrapper functions for backward compatibility during refactor
export const loadStats = () => statsManager.init();
export const modifyStat = (s, v) => statsManager.modifyStat(s, v);
export const setStat = (s, v) => statsManager.setStat(s, v);
export const getStat = (s) => statsManager.getStat(s);
export const resetStat = () => statsManager.resetStats();
