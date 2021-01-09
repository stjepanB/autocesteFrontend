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
import { ListItem, List, Button, TextField } from '@material-ui/core';
import Title from "./Home/Title"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import {validateWeight,validatePlateLetters,validatePlateNumber,validateAxles,validateHeight} from "../validators/vehicleValidators"
import {registerVehicle} from "../actions/vehicleActions"
import {Link} from "react-router-dom"
import {localUrl} from "../properties/constants"
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    bigForm : {
      margine: theme.spacing(2),
      minWidth: 300
    },
    table : {

    }
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



export default function RegisterVehicle(props){
    const classes = useStyles();

    const [vehicle, setVehicle] = useState({
      manufacturer:"",
      model: "",
      registrationPlate: "",
      maxWeightWithCargo: 0,
      axles: 0,
      category: "",
      color: ""
    })
    const [town, setTown] = React.useState('');
    const [plateNumber, setPlateNumber] = useState(undefined)
    const [plateLetters, setPlateLetters] = useState(undefined)
    const towns = [ 'ZG','BJ','BM','ČK','DA','DE','DJ','DU','GS','IM','KA','KC','KR','KT','KŽ','MA','NA','NG','OG','OS','PU','PŽ','RI','SB','SK','SL','ST','ŠI','VK','VT','VU','VŽ','ZD','ŽU']
    const cats = ['IA', 'I', 'II', 'III', 'IV']
    const [open,setOpen] = useState(false)
    const [errors,setErrors] = useState({
        category: false,
        town: false,
        plateNumber: false,
        plateLetters: false,
        maxWeight: false,
        height: false,
        axles: false,
  });
    
    const handleChange = (event) => {
      setTown(event.target.value);
    };
    const handleClose = (event,reason) =>{
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    }

    const handleSubmit = async function(e) {
        e.preventDefault();
        const vehicleDto = {
          plate : town + plateNumber + plateLetters,
          category: vehicle.category,
          color : vehicle.color,
          manufacturer: vehicle.manufacturer,
          type: vehicle.model,
          maxWeight: vehicle.maxWeightWithCargo,
          height:vehicle.height
        }
        const response = await registerVehicle(vehicleDto)

        if(response === "OK"){
            window.location.replace("/")
        }else {
          setOpen(true)
        }
    }
    

    return(
        <div>
          <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                              horizontal: 'right',
                            }}
                            open={open}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            message={message.vehicleRegistrationFailed}
                            action={
                              <React.Fragment>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                              </React.Fragment>
                            }
          />
          <form  onSubmit={handleSubmit}>
            <Grid container direction="row" spacing={3}>
                <Grid item xs={6}>      
                     <Paper className={classes.paper} variant="outlined">
                        <Title>Registracija vozila</Title>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                                autoComplete="manufacturer"
                                name="manufacturer"
                                variant="outlined"
                                required
                                fullWidth
                                id="manufacturer"
                                label="Proizvođač vozila"
                                onChange={(e)=>setVehicle({
                                ...vehicle,  
                                manufacturer: e.target.value
                                })}
                                autoFocus
                            />
                            </Grid>
                          <Grid item xs={12}>
                            <TextField
                              autoComplete="model"
                              name="model"
                              variant="outlined"
                              required
                              fullWidth
                              id="model"
                              label="Model vozila"
                              onChange={(e)=>setVehicle({
                              ...vehicle,  
                                model: e.target.value
                              })}
                              autoFocus
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <FormControl className={classes.formControl} >
                                <InputLabel id="registration-plate-town">Grad</InputLabel>
                                <Select
                                  labelId="select-registration-plate-town"
                                  id="selectRegistrationPlateTown"
                                  value={town}
                                  onChange={handleChange}
                                >
                                  {
                                    towns.map((t) => {
                                      return <MenuItem value={t} key={t}>{t}</MenuItem>
                                    })
                                  }
                                </Select>
                            </FormControl>
                            </Grid>
                          <Grid item xs={5}>

                            <TextField
                              variant="outlined"
                              type='number'
                              required
                              fullWidth
                              autoComplete="off"
                              name="registrationPlateNumber"
                              id="registrationPlateNumber"
                              label="Registracijska oznaka brojke"
                              error={errors.plateNumber}

                              onChange={(e)=>{
                                setErrors({
                                  ...errors,
                                  plateNumber: validatePlateNumber(e.target.value)})
                                setPlateNumber(e.target.value)
                              }}
                              
                          />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField 
                              variant="outlined"
                              type="outlined"
                              required
                              fullWidth
                              name="registrationPlateLetters"
                              label="Registracijska oznaka slova"
                              error={errors.plateLetters}
                              id="registrationPlateLetters"
                              onChange={(e)=>{
                                  setErrors({
                                    ...errors,
                                    plateLetters : validatePlateLetters(e.target.value)
                                  })
                                  setPlateLetters(e.target.value)
                                }
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              autoComplete="on"
                              name="maxWeightWithCargo"
                              variant="outlined"
                              type="number"
                              required
                              fullWidth
                              id="maxWeightWithCargo"
                              label="Maksimalna težina vozila s teretom"
                              error={errors.maxWeight}
                              InputProps={{
                                endAdornment: <InputAdornment position='end'>Kg</InputAdornment>,
                              }}
                              onChange={(e)=> {
                                setErrors({
                                  ...errors,
                                  maxWeight: validateWeight(e.target.value)
                                })
                                setVehicle({
                                        ...vehicle,  
                                        maxWeightWithCargo: e.target.value
                                })
                              }
                            }
                              autoFocus
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              autoComplete="on"
                              name="height"
                              variant="outlined"
                              type="number"
                              required
                              fullWidth
                              id="height"
                              error={errors.height}
                              label="Visina vozila"
                              InputProps={{
                                endAdornment: <InputAdornment position='end'>cm</InputAdornment>,
                              }}
                              onChange={(e)=> {
                                setErrors({
                                  ...errors,
                                  height: validateHeight(e.target.value)
                                })
                                setVehicle({
                                        ...vehicle,  
                                        height: e.target.value
                                })
                              }
                            }
                              autoFocus
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                                autoComplete="on"
                                name="axles"
                                variant="outlined"
                                type="number"
                                required
                                fullWidth
                                error={errors.axles}
                                id="axles"
                                label="Broj osovina"
                                onChange={(e)=> {
                                  setErrors({
                                    ...errors,
                                    axles:validateAxles(e.target.value)
                                  })
                                  setVehicle({
                                          ...vehicle,  
                                          axles: e.target.value
                                  })
                                }
                              }
                                autoFocus
                              />
                          </Grid>
                          <Grid item xs={6}>
                            <FormControl className={classes.bigForm} >
                              <InputLabel id="vehicleCategory">Kategorija vozila</InputLabel>
                              <Select
                                labelId="select-vehicle-category"
                                id="selectVehicleCategory"
                                value={vehicle.category}
                                onChange={(e) => {
                                  setVehicle({
                                    ...vehicle,
                                    category: e.target.value
                                  })
                                }}
                              >
                                {
                                  cats.map((t) => {
                                    return <MenuItem value={t} key={t}>{t}</MenuItem>
                                  })
                                }
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              autoComplete="color"
                              name="color"
                              variant="outlined"
                              required
                              fullWidth
                              id="color"
                              label="Boja vozila"
                              onChange={(e)=>setVehicle({
                              ...vehicle,  
                                color: e.target.value
                              })}
                              autoFocus
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              className={classes.submit}
                            >
                              Spremi
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Link to={localUrl.homepage}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                > 
                                    Odustani
                                </Button>
                            </Link>
                          </Grid>
                        </Grid>
                        
                     </Paper>
                </Grid>
                <Grid item xs={6}>
                <TableContainer component={Paper} className={classes.paper}>
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
                        <TableCell padding='none' > <Chapters value={row.desc} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
                </Grid>
            </Grid>
          </form>
        </div>
    )

}