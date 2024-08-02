import { Box } from "@mui/material";
import React from "react";
import useMapStore from "../../../store/map";

export default function WeatherInfo() {
    const { weather } = useMapStore();
    const stationJson = weather.StationJson;
    console.log(stationJson);

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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'  // 添加内边距
        }}>
            {stationJson ? (
                <>
                    <Box>氣象: {stationJson.WeatherElement.Weather}</Box>
                    <Box>溫度: {stationJson.WeatherElement.AirTemperature} °C</Box>
                    <Box>濕度: {stationJson.WeatherElement.RelativeHumidity} %</Box>
                </>
            ) : (
                <Box>無法取得天氣資訊!</Box>
            )}
        </Box>
    );
}
