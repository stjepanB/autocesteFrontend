import  {useState, useEffect} from "react"
import { Paper, Chip, Divider, CircularProgress , Select, MenuItem, InputLabel, FormControl, Grid, FilledInput,InputAdornment } from "@material-ui/core";
import message from "../../properties/messagesForUser";
import Title from "../Home/Title";
import { makeStyles } from '@material-ui/core/styles';
import {getSectionsPrices} from '../../actions/adminActions'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,
      },
    margin: {
      margin: theme.spacing(1),
      minWidth: 200
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    circular: {
        display: 'flex',
        '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    }
  }));

export default function Prices () {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [current,setCurrent] = useState({
        key: 2,
        section : 'Zagreb - Jastrebarsko',
        infrastructure:12.50,
        outside: 1.10
    })
    const [values, setValues] = useState([]);

    useEffect(() => {
            async function fetch(){
                const tmpSections = await getSectionsPrices();

                if(tmpSections && tmpSections[0]) {
                    setValues(tmpSections)
                    setCurrent(tmpSections[0])
                    setIsLoading(false);
                }
            }    
        fetch();
        }, [])

    const handleSubmit = async function(e) {
        e.preventDefault();
    }

    const handleOutside = function (e){
        var tmpCurrent = current;
        var category = e.target.id.split("-")[1];

        tmpCurrent[category].outside = e.target.value;

        setCurrent({
            ...current,
            [category]: {
                outside: e.target.value,
                infrastructure: current[category].infrastructure
            }
        })
        handle(tmpCurrent)
    }

    const handleInfrastructure = function (e){
        var tmpCurrent = current;
        var category = e.target.id.split("-")[1];

        tmpCurrent[category].infrastructure = e.target.value;
        console.log(tmpCurrent[category])
        setCurrent({
            ...current,
            [category]:{
                outside: current[category].outside,
                infrastructure: e.target.value
            }
            
        })
        handle(tmpCurrent)
    }
    const handle = function (curr) {
       
        const tmpValues = values.filter(e => e.section !== curr.section);
        tmpValues.push(curr);
        setValues(tmpValues)
    }

    const selectSection = function (event){
        const tmpCurrent = values.find(e=> event.target.value === e.section);
        setCurrent(tmpCurrent);
    }

    return (
        isLoading ?
        <div>
            <Paper className={classes.paper}>
                <CircularProgress size={160} thickness={5.6} />
            </Paper>
        </div>
        :
        <div className={classes.root}>
            <Paper className={classes.paper} variant="outlined">
                <Title children={message.pricesSetup} />
                <form onSubmit={handleSubmit}>
                <Grid container justify="center" spacing={3}>
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-helper-label">{message.selectSection}</InputLabel>
                                <Select
                                    labelId="select-section"
                                    id="select-section"
                                    value={current.section}
                                    onChange={selectSection}
                                >{
                                    values.map(
                                        e => <MenuItem value={e.section} key={e.key}>{e.section}</MenuItem>
                                    )
                                }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth className={classes.margin} variant="filled">
                                <InputLabel htmlFor="infrastructure-IA">{message.infrastructureCost}</InputLabel>
                                <FilledInput
                                    id="infrastructure-IA"
                                    value={current.IA.infrastructure}
                                    type="number"
                                    onChange={handleInfrastructure}
                                    endAdornment={<InputAdornment position="start">kn</InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth className={classes.margin} variant="filled">
                                <InputLabel htmlFor="outside-IA">{message.outsideCost}</InputLabel>
                                <FilledInput
                                    id="outside-IA"
                                    value={current.IA.outside}
                                    type="number"
                                    onChange={handleOutside}
                                    endAdornment={<InputAdornment position="start">kn</InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <Chip label="Kategorija IA"/>
                        </Grid>
                        <Divider />
                        <Grid item xs={5}>
                            <FormControl fullWidth className={classes.margin} variant="filled">
                                <InputLabel htmlFor="infrastructure-I">{message.infrastructureCost}</InputLabel>
                                <FilledInput
                                    id="infrastructure-I"
                                    value={current.I.infrastructure}
                                    type="number"
                                    onChange={handleInfrastructure}
                                    endAdornment={<InputAdornment position="start">kn</InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth className={classes.margin} variant="filled">
                                <InputLabel htmlFor="outside-I">{message.outsideCost}</InputLabel>
                                <FilledInput
                                    id="outside-I"
                                    value={current.I.outside}
                                    type="number"
                                    onChange={handleOutside}
                                    endAdornment={<InputAdornment position="start">kn</InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <Chip label="Kategorija I"/>
                        </Grid>
                        <Divider />
                        <Grid item xs={5}>
                            <FormControl fullWidth className={classes.margin} variant="filled">
                                <InputLabel htmlFor="infrastructure-II">{message.infrastructureCost}</InputLabel>
                                <FilledInput
                                    id="infrastructure-II"
                                    value={current.II.infrastructure}
                                    type="number"
                                    onChange={handleInfrastructure}
                                    endAdornment={<InputAdornment position="start">kn</InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth className={classes.margin} variant="filled">
                                <InputLabel htmlFor="outside-II">{message.outsideCost}</InputLabel>
                                <FilledInput
                                    id="outside-II"
                                    value={current.II.outside}
                                    type="number"
                                    onChange={handleOutside}
                                    endAdornment={<InputAdornment position="start">kn</InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <Chip label="Kategorija II"/>
                        </Grid>
                        <Divider />
                        <Grid item xs={5}>
                            <FormControl fullWidth className={classes.margin} variant="filled">
                                <InputLabel htmlFor="infrastructure-III">{message.infrastructureCost}</InputLabel>
                                <FilledInput
                                    id="infrastructure-III"
                                    value={current.III.infrastructure}
                                    type="number"
                                    onChange={handleInfrastructure}
                                    endAdornment={<InputAdornment position="start">kn</InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth className={classes.margin} variant="filled">
                                <InputLabel htmlFor="outside-III">{message.outsideCost}</InputLabel>
                                <FilledInput
                                    id="outside-III"
                                    value={current.III.outside}
                                    type="number"
                                    onChange={handleOutside}
                                    endAdornment={<InputAdornment position="start">kn</InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <Chip label="Kategorija III"/>
                        </Grid>
                        <Divider />
                        <Grid item xs={5}>
                            <FormControl fullWidth className={classes.margin} variant="filled">
                                <InputLabel htmlFor="infrastructure-IV">{message.infrastructureCost}</InputLabel>
                                <FilledInput
                                    id="infrastructure-IV"
                                    value={current.IV.infrastructure}
                                    type="number"
                                    onChange={handleInfrastructure}
                                
                                    endAdornment={<InputAdornment position="start">kn</InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth className={classes.margin} variant="filled">
                                <InputLabel htmlFor="outside-IV">{message.outsideCost}</InputLabel>
                                <FilledInput
                                    id="outside-IV"
                                    value={current.IV.outside}
                                    type="number"
                                    onChange={handleOutside}
                                    endAdornment={<InputAdornment position="start">kn</InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <Chip label="Kategorija IV"/>
                        </Grid>
                </Grid>
                </form>
            </Paper>
        </div>
    )
}