import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import MyMap from '../../elements/mymap/MyMap';
import SideDrawer from '../../elements/mymap/SideDrawer';
import WeatherDialog from '../../elements/mymap/WeatherDialog';
import useMapStore from '../../../store/map';
import { searchData } from '../../../apis';
import { useQuery } from '@tanstack/react-query';

export default function Index() {
    const mapRef = useRef(null);
    const { lat, lng, range, scopes, setMapState } = useMapStore();
    const { data } = useQuery({
        queryKey: ['searchData', { lat, lng, range, scopes }],
        queryFn: () => searchData(lat, lng, range, scopes),
        refetchOnWindowFocus: true,
        enabled: !!lat && !!lng && !!range && !!scopes
    });

    useEffect(() => {
        if (data) {
            if (data["OID"]) {
                setMapState({ pois: data });
            }
            else if (data["stationJson"]) {
                //console.log('Test', data);
                setMapState({ weather: data });
            }
        }
    }, [data]);

    return (
        <Box sx={{ display: 'flex', flex: '1 1 auto' }} ref={mapRef}>
            <Box sx={{ position: 'fixed', top: '50vh', left: 0, zIndex: 999 }}>
                <SideDrawer mapRef={mapRef} />
            </Box>

            <MyMap />

            <Box sx={{ position: 'fixed', top: '50vh', right: 0, zIndex: 999 }}>
                <WeatherDialog />
            </Box>
        </Box>
    );
}
