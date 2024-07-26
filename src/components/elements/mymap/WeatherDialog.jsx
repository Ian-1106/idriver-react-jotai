import { Box } from "@mui/material";
import React from "react";
import useMapStore from "../../../store/map";

export default function WeatherInfo() {
    const { weather } = useMapStore();

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
            flexDirection: 'column',  // 新增這行以垂直排列內容
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'  // 添加内边距
        }}>
            {weather && weather.stationJson ? (
                <>
                    <Box>氣象: {weather.stationJson.WeatherElement.Weather}</Box>
                    <Box>溫度: {weather.stationJson.WeatherElement.AirTemperature} °C</Box>
                    <Box>濕度: {weather.stationJson.WeatherElement.RelativeHumidity} %</Box>
                </>
            ) : (
                <Box>無法取得天氣資訊!</Box>
            )}
        </Box>
    );
}
