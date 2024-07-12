import api from "../lib/api";

export const searchNearPOI = async (lat, lng, range, scopes) => {
    // lat = 23.97120
    // lng = 120.947916
    // range = 3

    const cell = {
        lat: lat,
        lon: lng,
        range: range,
        scopes: scopes
    };

    try {
        const response = await api({ method: "GET", cmd: "api/LBSE/nearpoi", data: cell });
        return response;
    } catch (error) {
        console.error("Error fetching POI:", error);
        throw error;
    }
};