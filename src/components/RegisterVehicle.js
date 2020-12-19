import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import message from "../properties/messagesForUser"
import React, {useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ListItem, List, TextField } from '@material-ui/core';
import Title from "./Home/Title"

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  const vehicleCategoryInfo = message.vehicleCategories

const Chapters = function ({ value }) {
    const chapters = value.split("\n");
  
    return (
      <List>
        {chapters.map((chapter, i) => (
          <ListItem key={i}>{chapter}</ListItem>
        ))}
      </List>
    );
}

export default function RegisterVehicle(){
    const classes = useStyles();
    const [vehicle, setVehicle] = useState(undefined)

    return(
        <div>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                     <Paper className={classes.paper}>
                        <Title>Registracija vozila</Title>
                        <Grid container spacing={2}>
                        <TextField
                            autoComplete="fname"
                            name="manufacturer"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="Proizvođač vozila"
                            onChange={(e)=>setVehicle({
                            ...vehicle,  
                            manufacturer:  e.target.value
                            })}
                            autoFocus
                        />
                        </Grid>
                     </Paper>
                </Grid>
                <Grid item xs={6}>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">OZNAKA KATEGORIJE</TableCell>
                      <TableCell>OPIS KATEGORIJE</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vehicleCategoryInfo.map((row) => (
                      <TableRow key={row.category}>
                        <TableCell align="left">{row.category}</TableCell>
                        <TableCell > <Chapters value={row.desc} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
                </Grid>
            </Grid>
        </div>

    )

}