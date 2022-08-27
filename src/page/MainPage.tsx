import * as React from 'react';
import lightTheme from "../theme"
import { ThemeProvider } from '@mui/material';
import NavBar from "../component/NavBar"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import WheelComponent from 'react-wheel-of-prizes'
import 'react-wheel-of-prizes/dist/index.css'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const MainPage = () => {
    return (
        <ThemeProvider theme={lightTheme}>
            <NavBar />
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Item>xs=8</Item>
                </Grid>
                <Grid item xs={5}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>xs=4</Item>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};
export default MainPage;