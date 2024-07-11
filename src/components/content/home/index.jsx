import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const TextBox = ({ children }) => {
  return (
    <strong style={{ display: 'flex', justifyContent: 'center', marginBottom: '1%' }}>
      <span style={{ width: '50vw', padding: '3vw', backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '3px solid green' }}>
        <p>
          {children}
        </p>
      </span>
    </strong>
  );
};

const info_pictures = ['/Speedlimit.png', '/Traffic.png', '/Weather.png', '/Monitor.png'];

export default function Index() {
  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1%' }}>
        <Typography sx={{ width: '40vw', display: 'flex', justifyContent: 'center', backgroundColor: 'white', border: '5px solid green' }} variant="h5">
          APP介紹
        </Typography>
      </Box>
      <Divider sx={{ marginBottom: '1%' }} />

      <TextBox>
        使用道路已是日常生活的一部分，但接收道路資訊的方式卻很有限，例如：警察廣播電臺、Google Maps、衛星導航、政府交通網站。<br />
        資訊零散分布在各個網站，開車時駕駛若要取得道路資訊需要預覽多個服務，且資訊的呈現模式大多非視覺化，在行駛時無法快速掌握即時道路情況
      </TextBox>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <iframe
          style={{
            width: 960,
            height: 540,
            marginBottom: '1%',
          }}
          title="YouTube video player"
          src="https://www.youtube.com/embed/Qa9NNl3Gir8?si=4HG7sdenDNQJsfYr"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>

      <TextBox>
        道路資訊輔助系統自動彙整導航與相關道路資訊，提供駕駛即時的道路資訊，包含測速照相警示、沿途天氣概況與即時路況等，並以視覺化的方式呈現在地圖上，
        讓駕駛可以快速掌握路況。平台也會根據用戶收藏或標註的地點、常用路線與瀏覽紀錄，整合沿途的相關生活資訊，如：相關新聞瀏覽、店家優惠資訊和評論評分系統等，
        透過使用者的使用行為適性化推薦興趣點 (POIs, Point of Interests) 之路徑。<br />
        本平台從政府開放資源平台與相關網站擷取資訊，應用多種技術整合資訊物件。基於機器學習 (Machine Learning)
        分析蒐集之即時路況文字資訊，預測並對應到事件之持續時間預測，藉此提供用路人即時路況與塞車延遲等級等資訊。
        此外，平台需要以地圖視覺化呈現資訊，若使用付費平台提供的API (例如：Google Maps) 會有每日上限問題，
        因此本平台基於政府開放資料分析村里界圖，自行開發LBS (Location-Based Service) API服務。
      </TextBox>

      <Box sx={{ padding: '1%', display: 'flex', justifyContent: 'center' }}>
        {info_pictures.map((src, index) => (
          <img
            key={index}
            style={{ width: '8%', height: '8%', display: 'block', margin: 'auto' }}
            src={src}
            alt={`描述圖片的文字 ${index + 1}`}
          />
        ))}
      </Box>
    </Box>
  )
}
