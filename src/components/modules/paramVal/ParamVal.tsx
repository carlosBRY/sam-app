import React, { Component } from 'react';
import axios from 'axios';
import { Grid, TableContainer, Table, TableRow, TableCell, TableBody, Paper, Box, Typography, TextField, Button } from '@mui/material';
import PARAMETERS from './params';
import SYS_PARAMS from '../../../system';
import IParamValeur from '../../../types/param_valeur.type';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import swal from 'sweetalert2';

type Props = {};

type State = {
    pvaleur: Array<IParamValeur>,
    curr_param: any,
    curr_valeur: any,
    action: string
};

export default class ParamVal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            pvaleur: [],
            curr_param: null,
            curr_valeur: {lib: '', id: '', param: ''},
            action: 'create'
        };
    }

    submitValeurForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            lib: data.get('lib')
        });
        axios({
            method: 'post',
            url: SYS_PARAMS.param_val,
            data: {
                action: this.state.action,
                lib: data.get('lib'),
                param: this.state.curr_param.code,
                id: data.get('id')
            }
        }).then((response) => {
            if (response.data.success) {
                if(this.state.action == 'create'){
                    swal.fire('Notification', 'Création avec succès', 'success');
                    this.state.pvaleur.push(response.data.data as IParamValeur);
                    this.setState({
                        curr_valeur: {lib: '', id: '', param: ''}
                    });
                }
                else{
                    swal.fire('Notification', 'Mise à jour avec succès', 'info');
                    this.setState({
                        curr_valeur: {lib: '', id: '', param: ''},
                        pvaleur: response.data.data
                    });
                }
            }
            else {
                alert(response.data.message);
            }
        });
    };

    param_click(prm: any) {
        axios({
            method: 'post',
            url: SYS_PARAMS.param_val,
            data: {
                action: 'list',
                param: prm.code
            }
        }).then((response) => {
            this.state.curr_valeur.param = prm.code;
            this.setState({
                pvaleur: response.data.data,
                curr_param: prm,
                action: 'create'
            });
        });
    }

    editItem(prm: IParamValeur) {
        this.setState({
            curr_valeur: prm,
            action: 'update'
        });
    }

    deleteItem(prm: IParamValeur) {
        swal.fire({
            title: 'Êtes vous sûr?',
            text: "Cette action ne peut pas être annulée",
            icon: 'warning',
            showCancelButton: true,
            // confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non'
          }).then((result) => {
            var index: number = this.state.pvaleur.indexOf(prm);
            
            if (result.isConfirmed) {
                axios({
                    method: 'post',
                    url: SYS_PARAMS.param_val,
                    data: {
                        action: 'delete',
                        id: prm.id
                    }
                }).then((response) => {
                    this.state.pvaleur.splice(index, 1);
                    this.setState({
                        curr_valeur: {lib: '', id: '', param: ''},
                    });
                    if(response.status){
                        swal.fire(
                            'Suppression!',
                            'Elément supprimé avec succès!',
                            'success'
                        );
                    }
                });
                
            }
          })
    }

    render() {
        var pvaleur = this.state.pvaleur;
        var curr_param = this.state.curr_param,
            action = this.state.action,
            curr_valeur = this.state.curr_valeur;
        return (
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={6} md={4}>

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableBody>
                                {PARAMETERS.map((prm, index: number) =>
                                    <TableRow key={index}>
                                        <TableCell onClick={() => this.param_click(prm)}>{prm.lib}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={6} md={8}>
                    <Box component="form" onSubmit={this.submitValeurForm}>
                        <input type="hidden" name="action" value={action} />
                        <input type="hidden" name="id" value={curr_valeur ? curr_valeur.id : ''} />
                        <Grid xs={12} md={12} container spacing={2}>
                            <Grid item xs={12} lg={2}>
                                <Typography variant="h5">{curr_param ? curr_param.lib : 'Choisir un paramètre'}</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField autoComplete="given-name" onChange={(e) => { this.state.curr_valeur.lib = e.target.value; this.setState({}); }} value={curr_valeur ? curr_valeur.lib : ''} name="lib" fullWidth id="lib" label="Libellé" required />
                            </Grid>
                            <Grid item xs={12} lg={2}>
                                <Button type="submit" fullWidth variant="contained">Valider</Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableBody>
                                {pvaleur.length > 0 ? pvaleur.map((prm: IParamValeur, index: number) =>
                                (<TableRow key={index}>
                                    <TableCell>{prm.lib}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => this.editItem(prm)} variant="text" color="secondary"><EditIcon /></Button>
                                        <Button onClick={() => this.deleteItem(prm)} variant="text" color="warning"><DeleteIcon /></Button>
                                    </TableCell>
                                </TableRow>))
                                    : (<TableRow>
                                        <TableCell>'- Aucune donnée trouvée -'</TableCell>
                                    </TableRow>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        );
    }
}