import api from "../lib/api";

export const searchNearPOI = async (lat, lng, range, scopes) => {
    // lat = 23.97120
    // lng = 120.947916
    // range = 3

    const scopesArray = scopes.split(',').map(scope => scope.trim());
    const targetScopes = scopesArray.filter(scope => 
        scope !== '天氣狀況' && scope !== '危險路段'
    );

    const filteredScopes = targetScopes.join(',');

    if (filteredScopes === '') {
        return [];
    }

    try {
        const response = await api({
            method: "GET",
            cmd: `api/LBSE/nearpoi?lat=${lat}&lon=${lng}&range=${range}&scopes=${encodeURIComponent(filteredScopes)}`
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const searchWeather = async (lat, lng, scopes) => {
    // lat = 23.97120
    // lng = 120.947916

    const scopeArray = scopes.split(',').map(s => s.trim());

    if (scopeArray.includes('天氣狀況')) {
        try {
            const response = await api({
                method: "GET",
                cmd: `api/LBSE/weather?lat=${lat}&lon=${lng}`
            });
            return response;
        } catch (error) { 
            throw error;
        }
    }
    return null;
};

// 主函數
export const searchData = async (lat, lng, range, scopes) => {
    const scopeArray = scopes.split(',').map(scope => scope.trim());

    if (scopeArray.includes('天氣狀況')) {
        return await searchWeather(lat, lng, scopes);
    } else {
        return await searchNearPOI(lat, lng, range, scopes);
    }
};
