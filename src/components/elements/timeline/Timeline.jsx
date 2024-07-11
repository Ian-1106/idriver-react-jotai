import React from 'react';
import { Chrono } from 'react-chrono';

export default function index({ Information }) {
    return (
        <Chrono items={Information} mode="VERTICAL_ALTERNATING" disableToolbar={true} />
    );
};
