import * as React from 'react';
import lightTheme from "../theme";
import { ThemeProvider } from '@mui/material';
import NavBar from "../components/NavBar";
import Grid from '@mui/material/Grid';
import Wheel from "../components/wheel";
import useState from 'react-usestateref';
import { Option, SpinTheWheel } from '../components/typeFile';
import OptionsArea from "../components/OptionsArea";
import MoreWheelsArea from '../components/MoreWheelsArea';
import { v4 as uuid } from 'uuid';

const MainPage = () => {
    // type option = {
    //     name: string,
    //     weight: number,
    //     used: boolean,
    // };
    const firstWheel: SpinTheWheel[] = [{
        id: uuid(),
        title: "轉盤",
    }]

    const [allSpinWheels, setAllSpinWheels, allSpinWheelsRef] = useState<SpinTheWheel[]>(JSON.parse(localStorage.getItem("allWheels") || JSON.stringify(firstWheel)));
    React.useEffect(() => {
        localStorage.setItem("allWheels", JSON.stringify(allSpinWheelsRef.current));
    }, [allSpinWheels]);


    const [currentWheelId, setCurrentWheelId, currentWheelIdRef] = useState<string>(allSpinWheelsRef.current[0].id);
    React.useEffect(() => {
        setAllOptions(JSON.parse(localStorage.getItem(currentWheelIdRef.current) || '[]'));
    }, [currentWheelId]);
    // include option that used == false
    const [allOptions, setAllOptions, allOptionsRef] = useState<Option[]>(JSON.parse(localStorage.getItem(currentWheelIdRef.current) || '[]'));

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
        localStorage.setItem(currentWheelIdRef.current, JSON.stringify(allOptions));
    }, [allOptions])

    return (
        <ThemeProvider theme={lightTheme}>
            <NavBar />
            <Grid container spacing={2}>
                <Grid item xs={12} lg={3}>
                    <MoreWheelsArea spinWheelList={allSpinWheelsRef.current} setSpinWheelList={setAllSpinWheels}
                        currentWheelId={currentWheelIdRef.current} setCurrentWheelId={setCurrentWheelId} />
                </Grid>
                <Grid item xs={12} lg={5}>
                    <Wheel items={wheelOptionsRef.current} currentWheelID={currentWheelIdRef.current}></Wheel>
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