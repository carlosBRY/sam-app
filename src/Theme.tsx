import React from 'react';

import { createTheme } from '@mui/material/styles';
import { green, orange, purple, red, yellow } from '@mui/material/colors';

const theme = createTheme({
    
    palette: {
        primary: {
            main: purple[500]
        },
        secondary: {
            main: green[500]
        },
        warning: {
            main: yellow[800]
        }
    },
});

export default theme;