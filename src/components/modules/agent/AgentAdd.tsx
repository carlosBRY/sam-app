import React, { Component } from 'react';
import axios from 'axios';
import { Box, Button, Modal, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import SYS_PARAMS from '../../../system';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type Props = {};
type State = {
    modal_open: boolean,
    curr_agent: any,
    action: string
};

export default class AgentAdd extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            curr_agent: {
                id: 0,
                nom: '',
                prenom: '',
                age: '',
                poste: '',
                role: ''
            },
            action: 'create',
            modal_open: false
        };
    }

    submitAgentForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            lib: data.get('lib')
        });
        axios({
            method: 'post',
            url: SYS_PARAMS.param_val,
            data: {
                // action: this.state.action,
                // lib: data.get('lib'),
                // param: this.state.curr_param.code,
                // id: data.get('id')
            }
        }).then((response) => {
            if (response.data.success) {
                // if(this.state.action == 'create'){
                //     swal.fire('Notification', 'Création avec succès', 'success');
                //     this.state.pvaleur.push(response.data.data as IParamValeur);
                //     this.setState({
                //         curr_valeur: {lib: '', id: '', param: ''}
                //     });
                // }
                // else{
                //     swal.fire('Notification', 'Mise à jour avec succès', 'info');
                //     this.setState({
                //         curr_valeur: {lib: '', id: '', param: ''},
                //         pvaleur: response.data.data
                //     });
                // }
                alert('on success');
            }
            else {
                alert(response.data.message);
            }
        });
    };


    render() {
        const handleOpen = () => this.setState({ modal_open: true });
        const handleClose = () => this.setState({ modal_open: false });

        // var pvaleur = this.state.pvaleur;
        // var curr_param = this.state.curr_param,
        //     action = this.state.action
        //     curr_valeur = this.state.curr_valeur;
        var action: string = this.state.action,
            curr_agent: any = this.state.curr_agent;
        return (
            <Grid container alignContent="center">
                <Button onClick={handleOpen}>Ajouter un agent</Button>
                
                <Modal
                    open={this.state.modal_open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Grid container direction="row" justifyContent="center" alignContent="center">
                        <Paper elevation={1}>
                    {/* <Grid item xs={6} sm={8}> */}
                        <h3>Ajouter un agent</h3>
                        <Box component="form" onSubmit={this.submitAgentForm}>
                            <input type="hidden" name="action" value={action} />
                            <input type="hidden" name="id" value={curr_agent ? curr_agent.id : ''} />
                            <Grid container>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        onChange={(e) => { curr_agent.nom = e.target.value; this.setState({}); }}
                                        value={curr_agent ? curr_agent.nom : ''}
                                        name="nom" fullWidth id="nom" label="Nom" required />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        onChange={(e) => { curr_agent.prenom = e.target.value; this.setState({}); }}
                                        value={curr_agent ? curr_agent.prenom : ''}
                                        name="prenom" fullWidth id="prenom" label="Prénom" required />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        onChange={(e) => { curr_agent.age = e.target.value; this.setState({}); }}
                                        value={curr_agent ? curr_agent.age : ''}
                                        name="age" fullWidth id="age" label="Âge" size="small" type="number" required />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        onChange={(e) => { curr_agent.poste = e.target.value; this.setState({}); }}
                                        value={curr_agent ? curr_agent.poste : ''}
                                        name="poste" fullWidth id="poste" label="Poste" required />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Rôle</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={curr_agent ? curr_agent.role: ''}
                                            label="Age"
                                            onChange={(e) => { curr_agent.role = e.target.value; this.setState({}); }}>
                                            <MenuItem value="Admin">Admin</MenuItem>
                                            <MenuItem value="Agent">Agent</MenuItem>
                                            <MenuItem value="RH">RH</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid container direction="row" justifyContent="center" alignItems="center">
                                    <Button type="submit" fullWidth variant="contained">Valider</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    {/* </Grid> */}
                    </Paper>
                    </Grid>
                    
                    {/* <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}
                </Modal>
            </Grid>
        );
    }
}