import React from 'react'
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import Home from './home'
import About from './about'
import EMap from './emap'

export default function index() {
  return (
    <Box sx={{ flex: "1 1 auto" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<EMap />} />
      </Routes>
    </Box>
  )
}
