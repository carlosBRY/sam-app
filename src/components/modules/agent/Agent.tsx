import axios from 'axios';
import React, { Component } from 'react';
import {Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Pagination, Typography, Button} from '@mui/material';
import SYS_PARAMS from '../../../system';
import AgentAdd from './AgentAdd';


type Props = {};

type State = {
    agents: Array<any>,
    // curr_agent: any,
    // action: string,
    count: number
};


export default class Agent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            agents: [],
            // curr_agent: null,
            // action: 'create',
            count: 0
        };

        this.getPage(0);
    }

    getPage(pageNum: number) {
        axios({
            method: 'post',
            url: SYS_PARAMS.agent,
            data: {
                action: 'list',
                page: pageNum
            }
        }).then((response) => {
            if (response.data.success) {
                this.setState({
                    agents: response.data.data,
                    count: response.data.count
                });
            }
            else {
                console.log(response);
                alert(response.data.message);
            }
        });
    }

    pageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        this.getPage(value-1);
        console.log('page changed: '+(value-1));
    };

    render() {
        var agents = this.state.agents,
            // curr_agent = this.state.curr_agent,
            // action = this.state.action,
            // page = this.state.page,
            count = this.state.count;
        
        return (
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid lg={8} md={10} xs={12} id="data_area">
                    <Grid container justifyContent="center" alignItems="center" spacing={2}>
                        <Typography variant="h2">Gestion des agents</Typography>
                        <Button variant="contained" href="#contained-buttons">Ajouter</Button>

                        <AgentAdd />
                    </Grid>
                    
                    <Grid container justifyContent="center" alignItems="center" spacing={2}>
                        {/* <Pagination count={count} onChange={this.pageChange} /> */}
                    </Grid>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nom</TableCell>
                                    <TableCell>Prénom</TableCell>
                                    <TableCell>Poste</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Role</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {agents.map((agent:any, index: number) => (
                                    <TableRow
                                        key={agent.id}>
                                        <TableCell component="th" scope="row">{agent.nom}</TableCell>
                                        <TableCell>{agent.prenom}</TableCell>
                                        <TableCell>{agent.poste}</TableCell>
                                        <TableCell>{agent.age}</TableCell>
                                        <TableCell>{agent.role}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Grid container justifyContent="center" alignItems="center" spacing={2}>
                        <Pagination count={count} onChange={this.pageChange} />
                    </Grid>

                </Grid>
            </Grid>
        );
    };
}