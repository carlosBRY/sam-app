import React from 'react';
import { Outlet } from "react-router-dom";
// import { Grid, Container, Card, CardContent, CardActions, Typography, CardActionArea, Button, Icon, Link } from '@mui/material';
// import PeopleIcon from '@mui/icons-material/People';

import ParamVal from '../modules/paramVal/ParamVal';
import MainMenu from './MainMenu';

export default function Dashboard() {
    return (
            // <Routes>
            //     <Route path="/" element={<MainMenu />} />
            //     <Route path="/dashboard/param" element={<ParamVal />} />
        <Outlet />
            
        // <Grid container direction="row" justifyContent="center" alignItems="center">

    );
}