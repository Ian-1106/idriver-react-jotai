import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import MyMap from '../../elements/mymap/MyMap';
import SideDrawer from '../../elements/mymap/SideDrawer';

export default function Index() {
    const mapRef = useRef(null);

    return (
        <Box sx={{ display: 'flex', flex: '1 1 auto', height: '100vh' }} ref={mapRef}>
            <Box sx={{ position: 'fixed', top: '50vh', left: 0, zIndex: 999 }}>
                <SideDrawer mapRef={mapRef} />
            </Box>
            <MyMap />
        </Box>
    );
}