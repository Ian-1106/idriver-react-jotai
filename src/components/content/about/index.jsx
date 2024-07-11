import React from 'react';
import {Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid} from '@mui/material'
import TimeLine from '../../elements/timeline/Timeline'
import TimeLineInfo from "./timeline_info.json";


export default function index() {
    const data = [
        { id: 1, information: '測速照相', source: ['政府資料開放平台'], url: ['https://data.gov.tw/dataset/7320'] },
        { id: 2, information: '即時路況', source: ['警察廣播電台', '政府資料開放平台'], url: ['https://www.pbs.npa.gov.tw/ch/index', 'https://data.gov.tw/dataset/15221'] },
        { id: 3, information: '危險路段', source: ['政府資料開放平台'], url: ['https://data.gov.tw/dataset/12197'] },
        { id: 4, information: '天氣狀況', source: ['中央氣象署'], url: ['https://opendata.cwa.gov.tw/dist/opendata-swagger.html#/%E8%A7%80%E6%B8%AC/get_v1_rest_datastore_O_A0001_001'] },
        { id: 5, information: '即時影像', source: ['智慧化省道國道資訊網'], url: ['https://168.thb.gov.tw/'] },
    ];

    return (
        <div id='app_introduction' style={{ padding: '1%' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1%' }}>
                <Typography width={{ width: '40vw' }} variant="h5" sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', border: '5px solid green' }}>關於我們</Typography>
            </div>
            <Divider sx={{ marginBottom: '1%' }} />

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1%' }}>
                <div style={{ width: '50vw', padding: '3vw', marginBottom: '1%', backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '3px solid green' }}>
                    <TimeLine Information={TimeLineInfo.About} />
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1%' }}>
                <strong style={{ width: '50vw', padding: '3vw', backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '3px solid green' }}>
                    為了讓使用者可以在最短的時間內取得最全面的資訊，本系統會定期至政府機關的各大平台取得資料並更新至資料庫加以分析，各項道路資訊詳細來源如下表所示:

                    <Grid container justifyContent="center" sx={{ marginTop: '1%' }}>
                        <Grid item xs={10}>
                            <TableContainer component={Paper} sx={{ border: '1px solid black' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No.</TableCell>
                                            <TableCell>道路資訊</TableCell>
                                            <TableCell>來源</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.id}</TableCell>
                                                <TableCell>{row.information}</TableCell>
                                                <TableCell>
                                                    {row.source.map((source, index) => (
                                                        <span key={index}>
                                                            {index > 0 && '、'}
                                                            <a href={row.url[index]} target="_blank" rel="noopener noreferrer">
                                                                {source}
                                                            </a>
                                                        </span>
                                                    ))}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </strong>
            </div>

        </div>
    );
}