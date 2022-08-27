import * as React from 'react';
import lightTheme from "../theme";
import { ThemeProvider, Button } from '@mui/material';
import NavBar from "../components/NavBar";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Wheel from "../components/wheel";
import useState from 'react-usestateref';
import { Option } from '../components/typeFile';
import OptionsArea from "../components/OptionsArea";
import { v4 as uuid } from 'uuid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const MainPage = () => {
    // type option = {
    //     name: string,
    //     weight: number,
    //     used: boolean,
    // };



    // include option that used == false
    const [allOptions, setAllOptions, allOptionsRef] = useState<Option[]>(JSON.parse(localStorage.getItem("firstWheel") || '[]'));
    // not include option that used == false
    const [wheelOptions, setWheelOptions, wheelOptionsRef] = useState<Option[]>([{ id: uuid(), name: "測試", weight: 1, used: true }]);
    const [updateWheel, setUpdateWheel] = useState(true);
    React.useEffect(() => {
        // setUpdateWheel(false);
        let tmp: Option[] = [];
        for (let i = 0; i < allOptions.length; i++) {
            if (allOptions[i].used) {
                tmp.push(allOptions[i]);
            }
        }
        setWheelOptions(tmp);
        localStorage.setItem("firstWheel", JSON.stringify(allOptions));
    }, [allOptions])

    return (
        <ThemeProvider theme={lightTheme}>
            <NavBar />
            <Grid container spacing={2}>
                <Grid item xs={12} lg={3}>
                    <Item>xs=8</Item>
                </Grid>
                <Grid item xs={12} lg={5}>
                    <Wheel items={wheelOptionsRef.current}></Wheel>
                    {/* <Button onClick={() => { setWheelOptions(wheelOptions => [...wheelOptions, { name: "測試", weight: 1, used: true }]); }}>click me</Button> */}
                </Grid>
                <Grid item xs={12} lg={4}>
                    <OptionsArea allOptions={allOptionsRef.current} setAllOptions={setAllOptions} setUpdateWheel={setUpdateWheel}></OptionsArea>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};
export default MainPage;