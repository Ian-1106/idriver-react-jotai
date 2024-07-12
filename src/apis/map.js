import api from "../lib/api";
import useMapStore from '../store/map';

export const searchNearPOI = async () => {
    const { lat, lng, range, scopes } = useMapStore()

    let scopesStr = ""
    for (ss in scopes) {
        scopesStr += ss
    }

    const cell = {
        lat: lat,
        lng: lng,
        range: range,
        scopes: scopesStr
    }

    response = await api({ method: "GET", cmd: "api/LBSE/nearpoi", data: cell })
    return response
}