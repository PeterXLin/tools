import React, { useState } from 'react';
import lightTheme from "../theme";
import { ThemeProvider, Grid, Button } from '@mui/material';
import NavBar from "../components/NavBar";
import coinHead from "../images/coin_head_square.png";
import coinTail from "../images/coin_tail_square.png";

const FlipACoinPage = () => {
    const [result, setResult] = useState<string>("擲硬幣");

    const handleFlipACoin = (): void => {
        setResult(Math.random() >= 0.5 ? "人頭" : "正面");
    }


    return (
        <ThemeProvider theme={lightTheme}>
            <NavBar />
            <Grid container spacing={2}>
                <Grid item xs={12} lg={3}>

                </Grid>
                <Grid item xs={12} lg={6}>
                    <h1 style={{ textAlign: "center" }}>{result}</h1>
                    <img src={result === "人頭" ? coinHead : coinTail}
                        style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "50%" }}
                        alt="picture of coin" />
                    <Button
                        size="large" color="secondary" variant="contained"
                        sx={{ width: "40%", mx: "30%", mt: "50px" }}
                        style={{ fontWeight: "bold", fontSize: "20px" }}
                        onClick={handleFlipACoin}>
                        {"擲"}
                    </Button>
                </Grid>
                <Grid item xs={12} lg={3}>

                </Grid>
            </Grid>
        </ThemeProvider>
    );

}


export default FlipACoinPage;