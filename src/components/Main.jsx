import React from 'react'
import { Box, Toolbar, useMediaQuery } from '@mui/material'
import Sidebar from './sidebar'
import Content from './content'
import Footer from './footer'

export default function Main() {
  const matches = useMediaQuery('(min-width:900px)')

  return (
    <Box
      sx={{
        display: 'flex',
        height: "100vh",
        width: "100%",
        backgroundImage: `url(/bg.jpg)`,
        backgroundSize: "cover",
        backgroundAttachment: 'fixed',  // 確保背景圖片部會跟著滾動
        backgroundPosition: 'center',
        overflow: 'auto', // 確保內容可以滾動
      }}
    >
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: !matches ? "100%" : `calc(100% - ${240}px)`,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Toolbar />
        <Content />
        <Footer
          title={
            <video className='footer-logo' autoPlay={true} loop muted controls={false}>
              <source src="./wke_ani.mp4" type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
            // <img src='./wke_ani.gif' alt="wke logo" className='footer-logo' />
          }
        />
      </Box>
    </Box >
  )
}
