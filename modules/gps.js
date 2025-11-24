// ==================== GPS MODULE ====================
import { showSnackbar } from "./ui.js";
import { LEVELS } from "../levels.js";

export function goToGPS(currentLevel) {
    localStorage.setItem("previous_level", currentLevel);
    window.location.href = "gps-test.html";
}

export function getLocation() {
    showSnackbar("activando gps, favor esperar unos segundos...");
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    console.log(`📍 Tu ubicación: ${lat}, ${lon}`);
                    //showSnackbar(`📍 Ubicación detectada: ${lat.toFixed(4)}, ${lon.toFixed(4)}`);
                    localStorage.setItem("last_location", JSON.stringify({ lat, lon }));
                    resolve({ lat, lon });
                },
                (error) => {
                    console.error("❌ Error obteniendo ubicación:", error.message);
                    //showSnackbar("❌ No se pudo obtener la ubicación. Verifica permisos GPS.");
                    reject(error);
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
        showSnackbar(`📍handle ${lat.toFixed(6)}, ${lon.toFixed(6)}`, 0, true);
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
        const compare = diferenceLocation(lat, level.gps.lat, lon, level.gps.lon, tolerance);
        if (compare) {
            //showSnackbar("✅Locacion correcta.");
        } else {
            //showSnackbar("❌ Locación incorrecta.");
        }
        return compare;
    } catch (err) {
        console.error("Error:", err.message);
        showSnackbar("❌ No se pudo obtener la ubicación.");
        return false;
    }
}

export function diferenceLocation(lat1, lat2, lon1, lon2, tolerance) {
    const difLat = Math.abs(lat1 - lat2);
    const difLon = Math.abs(lon1 - lon2);
    showSnackbar(`Lat: ${difLat.toFixed(5)},  Lon: ${difLon.toFixed(5)}`, 0, true);
    return (difLat <= tolerance) && (difLon <= tolerance);
}

export function diferenceGPS(lat1, lat2, lon1, lon2) {
    const difLat = Math.abs(lat1 - lat2);
    const difLon = Math.abs(lon1 - lon2);
    return { difLat, difLon };
}

export async function compareLocationGPS(levelId) {
    const tolerance = 0.00005;
    const level = LEVELS[levelId];
    //showSnackbar("debug:: level: "+levelId,0,true);
    try {
        const { lat, lon } = await getLocation();
        const { difLat, difLon } = diferenceGPS(lat, level.gps.lat, lon, level.gps.lon);
        showSnackbar(`level: ${levelId}  lat: ${difLat.toFixed(5)}  lon: ${difLon.toFixed(5)}`, 0, true);

    } catch (err) {
        console.error("Error:", err.message);
        showSnackbar("❌ No se pudo obtener la ubicación.");
        return false;
    }
}
