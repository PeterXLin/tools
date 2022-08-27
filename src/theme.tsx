import { createTheme } from '@mui/material/styles';

let lightTheme = createTheme({
    palette: {
        primary: {
            // navbar color
            main: '#385466',
        },
        secondary: {
            main: '#5bc2e7',
        },
        info: {
            // option zone border's color
            main: '#6980C5'
        },
        success: {
            main: "#F7F6EE"
        },
        warning: {
            main: "#70DFDF"
        }

    },
});


export default lightTheme;