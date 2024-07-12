import React, { useState, useEffect } from 'react';
import { Box, Drawer, Typography, Divider, Switch, IconButton, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useMapStore from '../../../store/map';


const initialRoadPOIState = {
    '測速照相': false,
    '即時路況': false,
    '危險路段': false,
    '天氣狀況': false,
    '即時影像': false
};

export default function Index({ mapRef }) {
    const [open, setOpen] = useState(false);
    const [switches, setSwitches] = useState(initialRoadPOIState);
    const [searchText, setSearchText] = useState('');
    const [mapHeight, setMapHeight] = useState(0);
    const [markLocation, setMarkLocation] = useState({});
    const { setMapState } = useMapStore();

    useEffect(() => {
        if (mapRef && mapRef.current) {
            setMapHeight(mapRef.current.clientHeight);
        }
    }, [mapRef]);

    useEffect(() => {
        const trueValues = Object.entries(switches)
            .filter(([key, value]) => value === true)
            .map(([key]) => key);

        if (trueValues.length === 0) {
            setMapState({ scopes: '', pois: [] });
        } else {
            const resultString = trueValues.join(',');
            setMapState({ scopes: resultString });
        }
    }, [switches]);



    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    const handleSwitchChange = (key) => (event) => {
        setSwitches((prevSwitches) => ({
            ...prevSwitches,
            [key]: event.target.checked
        }));
    };

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleButtonClick = () => {
        setSearchAddress(searchText);
    };

    const searchResultonClick = (element) => {
        setMarkLocation(element);
    };

    const ListView = ({ results }) => (
        <List>
            {results.map((element, index) => (
                <ListItem
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: '#f0f0f0'
                        }
                    }}
                    key={index}
                    onClick={() => searchResultonClick(element)}> {/* 將函數包裹在箭頭函數中 */}
                    <ListItemText
                        primary={element.address}
                        secondary={`Lat: ${element.x}, Lng: ${element.y}`}
                    />
                </ListItem>
            ))}
        </List>
    );

    return (
        <Box sx={{
            backgroundColor: 'white',
            borderRadius: '5px',
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
            border: 'solid',
            borderColor: '#C4C5C7',
            borderWidth: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(!open)}
                style={{ margin: 'auto', height: 'auto' }}
            >
                {open ? <ArrowBackIcon /> : <ArrowForwardIcon />}
            </IconButton>
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        marginTop: '64px',
                        minHeight: 'calc(100vh - 64px)',
                    }
                }}
            >
                <Box sx={{ minWidth: '20vw' }}>
                    <Box sx={{ marginBottom: '10%' }}>
                        <Box sx={{ display: 'flex', marginBottom: '1%', marginLeft: '1%' }}>
                            <Divider sx={{ marginBottom: '1%', border: '3px solid gray' }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>搜尋地點</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField id="outlined-basic" label="Search" variant="outlined" value={searchText} onChange={handleInputChange} />
                            <Button variant="outlined" sx={{ marginLeft: '1vw' }} onClick={handleButtonClick}>搜尋</Button>
                        </Box>

                    </Box>
                    <Box>
                        <Box sx={{ display: 'flex', marginBottom: '1%', marginLeft: '1%' }}>
                            <Divider sx={{ marginBottom: '1%', border: '3px solid gray' }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>道路資訊</Typography>
                        </Box>
                        <Box sx={{ marginLeft: '5%' }}>
                            {Object.entries(switches).map(([key, value]) => (
                                <Box key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '1%' }}>
                                    <Typography>{key}</Typography>
                                    <Switch checked={value} onChange={handleSwitchChange(key)} inputProps={{ 'aria-label': 'controlled' }} />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
}
