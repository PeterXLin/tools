import React from 'react';
import Box from '@mui/material/Box';

const MainPage = () => {
    return (
        <Box display="grid"
            style={{
                gridTemplateColumns: "repeat(6, 1fr)",
                gridGap: "10px",
                gridAutoRows: "minmax(100px, auto)"
            }}>
            <Box id="header" style={{ gridColumnStart: 1, gridColumnEnd: 7, backgroundColor: "black" }}></Box>
            <Box id="nav-bar" style={{}}></Box>
            <Box id="spin-wheel"></Box>
            <Box id="add"></Box>
        </Box>
    )
}

export default MainPage;