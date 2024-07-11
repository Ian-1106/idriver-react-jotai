import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import Config from 'Config';

const { google_maps_api_key } = Config;

export default function Index() {
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [userZoom, setUserZoom] = useState(17);
    const googleMapRef = useRef(null);
    const leafletContainerRef = useRef(null);
    const leafletInstanceRef = useRef(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    setLoading(false);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    setLoading(false);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!userLocation) return;

        const mapContainer = leafletContainerRef.current;
        leafletInstanceRef.current = L.map(mapContainer, { attributionControl: false }).setView([userLocation.lat, userLocation.lng], userZoom);

        const OSMUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        const tileLayer = L.tileLayer(OSMUrl).addTo(leafletInstanceRef.current);
        tileLayer.setOpacity(0);

        const greenIcon = new L.Icon({
            iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        L.circle([userLocation.lat, userLocation.lng], {
            color: "blue",
            fillColor: "blue",
            fillOpacity: 0.5,
            radius: 5
        }).addTo(leafletInstanceRef.current);

        return () => {
            if (leafletInstanceRef.current) {
                leafletInstanceRef.current.remove();
                leafletInstanceRef.current = null;
            }
        };
    }, [userLocation]);

    const handleGoogleMapDrag = ({ center, zoom }) => {
        const { lat, lng } = center;
        const leafletCenter = L.latLng(lat, lng);
        leafletInstanceRef.current.setView(leafletCenter, zoom);
    };

    const handleGoogleMapZoomChange = (zoom) => {
        setUserZoom(zoom);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userLocation) {
        return <div>Unable to get user location.</div>;
    }

    return (
        <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }} ref={leafletContainerRef} />
            <GoogleMapReact
                style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                ref={googleMapRef}
                onDragend={handleGoogleMapDrag}
                onChange={({ center, zoom }) => {
                    handleGoogleMapDrag({ center, zoom });
                    handleGoogleMapZoomChange(zoom);
                }}
                bootstrapURLKeys={{ key: google_maps_api_key }}
                defaultCenter={userLocation}
                defaultZoom={userZoom}
            />
        </Box>
    );
}
