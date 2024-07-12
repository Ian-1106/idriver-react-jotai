import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import MyMap from '../../elements/mymap/MyMap';
import SideDrawer from '../../elements/mymap/SideDrawer';
import useMapStore from '../../../store/map';
import { searchNearPOI } from '../../../apis';


export default function Index() {
    const mapRef = useRef(null);
    const { lat, lng, range, scopes } = useMapStore(state => ({ lat: startTransition.lat, lng: state.lng, range: state.range }));

    useEffect(() => {
        if (lat && lng && range && scopes) {
            console.log(lat, lng, range, scopes);

            const query = useQuery({
                queryKey: ['searchNearPOI'],
                queryFn: () => searchNearPOI(),
                refetchOnWindowFocus: true
            })
        }
    }, [lat, lng, range, scopes]);

    useEffect();

    return (
        <Box sx={{ display: 'flex', flex: '1 1 auto' }} ref={mapRef}>
            <Box sx={{ position: 'fixed', top: '50vh', left: 0, zIndex: 999 }}>
                <SideDrawer mapRef={mapRef} />
            </Box>
            <MyMap />
        </Box>
    );
}