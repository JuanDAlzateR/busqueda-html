// ==================== GPS MODULE ====================
import { showSnackbar } from "./ui.js";
import { LEVELS } from "../levels.js";

class GPSManager {
    constructor() {
        this.tolerance = 0.00005;
    }

    /**
     * Redirects to the GPS test page.
     * @param {string} currentLevel 
     */
    goToGPS(currentLevel) {
        localStorage.setItem("previous_level", currentLevel);
        window.location.href = "gps-test.html";
    }

    /**
     * Gets the current location using the Geolocation API.
     * @returns {Promise<{lat: number, lon: number}>}
     */
    getLocation() {
        showSnackbar("Activando GPS, favor esperar unos segundos...");
        return new Promise((resolve, reject) => {
            if (!("geolocation" in navigator)) {
                reject(new Error("Geolocalización no soportada."));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    console.log(`📍 Tu ubicación: ${lat}, ${lon}`);
                    localStorage.setItem("last_location", JSON.stringify({ lat, lon }));
                    resolve({ lat, lon });
                },
                (error) => {
                    console.error("❌ Error obteniendo ubicación:", error.message);
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    }

    /**
     * Handles manual location request (for testing/debug).
     */
    async handleLocation() {
        try {
            const { lat, lon } = await this.getLocation();
            console.log("Ubicación obtenida:", lat, lon);
            showSnackbar(`📍 Ubicación: ${lat.toFixed(6)}, ${lon.toFixed(6)}`, 0, true);
        } catch (err) {
            console.error("Error:", err.message);
            showSnackbar("❌ No se pudo obtener la ubicación.");
        }
    }

    /**
     * Compares current location with target level location.
     * @param {string} levelId 
     * @returns {Promise<boolean>}
     */
    async compareLocation(levelId) {
        const level = LEVELS[levelId];
        if (!level || !level.gps) return false;

        try {
            const { lat, lon } = await this.getLocation();
            return this.checkDifference(lat, level.gps.lat, lon, level.gps.lon);
        } catch (err) {
            console.error("Error:", err.message);
            showSnackbar("❌ No se pudo obtener la ubicación.");
            return false;
        }
    }

    /**
     * Calculates difference and checks against tolerance.
     * @param {number} lat1 
     * @param {number} lat2 
     * @param {number} lon1 
     * @param {number} lon2 
     * @returns {boolean}
     */
    checkDifference(lat1, lat2, lon1, lon2) {
        const difLat = Math.abs(lat1 - lat2);
        const difLon = Math.abs(lon1 - lon2);

        // Debug info
        // showSnackbar(`Lat Diff: ${difLat.toFixed(5)}, Lon Diff: ${difLon.toFixed(5)}`, 0, true);

        return (difLat <= this.tolerance) && (difLon <= this.tolerance);
    }

    /**
     * Calculates raw difference values.
     * @param {number} lat1 
     * @param {number} lat2 
     * @param {number} lon1 
     * @param {number} lon2 
     * @returns {{difLat: number, difLon: number}}
     */
    calculateDifference(lat1, lat2, lon1, lon2) {
        return {
            difLat: Math.abs(lat1 - lat2),
            difLon: Math.abs(lon1 - lon2)
        };
    }

    /**
     * Debug function to compare location and show details.
     * @param {string} levelId 
     */
    async compareLocationGPS(levelId) {
        const level = LEVELS[levelId];
        if (!level || !level.gps) return;

        try {
            const { lat, lon } = await this.getLocation();
            const { difLat, difLon } = this.calculateDifference(lat, level.gps.lat, lon, level.gps.lon);
            showSnackbar(`Level: ${levelId} | LatDiff: ${difLat.toFixed(5)} | LonDiff: ${difLon.toFixed(5)}`, 0, true);
        } catch (err) {
            console.error("Error:", err.message);
            showSnackbar("❌ No se pudo obtener la ubicación.");
        }
    }
}

export const gpsManager = new GPSManager();

// Export wrapper functions for backward compatibility
export const goToGPS = (l) => gpsManager.goToGPS(l);
export const getLocation = () => gpsManager.getLocation();
export const handleLocation = () => gpsManager.handleLocation();
export const compareLocation = (l) => gpsManager.compareLocation(l);
export const diferenceLocation = (lat1, lat2, lon1, lon2, tol) => gpsManager.checkDifference(lat1, lat2, lon1, lon2); // Note: tolerance arg ignored in favor of class property, but kept signature
export const diferenceGPS = (lat1, lat2, lon1, lon2) => gpsManager.calculateDifference(lat1, lat2, lon1, lon2);
export const compareLocationGPS = (l) => gpsManager.compareLocationGPS(l);
