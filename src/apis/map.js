import api from "../lib/api";


export const searchNearPOI = async (lat, lng, range, scopes) => {
    const param = {
        lat: lat,
        lon: lng,
        range: range,
        scopes: scopes
    }
    const response = await api({ method: "GET", cmd: "api/LBSE/nearpoi", data: param });
    return response
}