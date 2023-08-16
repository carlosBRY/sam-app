import React from 'react';
import { Grid, Container, Card, CardContent, CardActions, Typography, CardActionArea, Button, Icon, Link } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

export default function MainMenu() {
    return (
        <Container maxWidth="md">
            <Typography align="center" variant="h3">Tableau de bord</Typography>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs md>
                    <Card color="primary">
                        <CardActionArea>
                            <Link href="/dashboard/param">
                                <CardContent>
                                    <Typography align="center">
                                        <SettingsIcon fontSize="large" />
                                    </Typography>
                                    <Typography align="center" variant="h5">Paramètres</Typography>
                                    <div>Gestion des paramètres</div>
                                </CardContent>
                            </Link>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs md>
                    <Card color="primary">
                        <CardActionArea>
                            <Link href="/dashboard/agent">
                                <CardContent>
                                    <Typography align="center">
                                        <PeopleIcon fontSize="large" />
                                    </Typography>
                                    <Typography align="center" variant="h5">21</Typography>
                                    <Typography align="center"><b>Gestion des agents</b></Typography>
                                </CardContent>
                            </Link>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs md>
                    <Card color="primary">
                        <CardActionArea>
                            <CardContent>
                                <Typography align="center">
                                    <PeopleIcon fontSize="large" />
                                </Typography>
                                <Typography align="center" variant="h5">21</Typography>
                                <div>Gestion des paramètres</div>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}