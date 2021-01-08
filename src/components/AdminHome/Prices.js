import { useState, useEffect } from "react"
import { Paper, CircularProgress, FormLabel, Select, MenuItem, InputLabel, FormControl, Grid, FilledInput, InputAdornment } from "@material-ui/core";
import message from "../../properties/messagesForUser";
import Title from "../Home/Title";
import { makeStyles } from '@material-ui/core/styles';
import { getSectionsPrices, setSectionsPrices } from '../../actions/adminActions'
import "./prices.css";
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';

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
    fabButtonRoot: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
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

export default function Prices() {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [current, setCurrent] = useState({
        key: 2,
        section: 'Zagreb - Jastrebarsko',
        infrastructure: 12.50,
        outside: 1.10
    })
    const [values, setValues] = useState([]);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });


    useEffect(() => {
        async function fetch() {
            const tmpSections = await getSectionsPrices();

            if (tmpSections && tmpSections[0]) {
                setValues(tmpSections)
                setCurrent(tmpSections[0])
                setIsLoading(false);
            }
        }
        fetch();
    }, [])

    const handleSubmit = async function (e) {
        e.preventDefault();
    }

    const handleButtonClick = async () => {
        if (!buttonLoading) {
            setSuccess(false);
            setButtonLoading(true);
            const response = await setSectionsPrices(values);
            if (response === "OK") {
                setSuccess(true);
                setButtonLoading(false);
            }
        }
    };


    const handleOutside = function (e) {
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

    const handleInfrastructure = function (e) {
        var tmpCurrent = current;
        var category = e.target.id.split("-")[1];

        tmpCurrent[category].infrastructure = e.target.value;
        console.log(tmpCurrent[category])
        setCurrent({
            ...current,
            [category]: {
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

    const selectSection = function (event) {
        const tmpCurrent = values.find(e => event.target.value === e.section);
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
                        <Grid container spacing={2}>
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
                            <Grid item xs={2}>
                                <FormLabel>{message.vehicleCategoriesNames.IA}</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.margin} variant="filled">
                                    <InputLabel htmlFor="infrastructure-IA">{message.infrastructureCost}</InputLabel>
                                    <FilledInput
                                        id="infrastructure-IA"
                                        value={current.IA.infrastructure}
                                        type="number"
                                        onChange={handleInfrastructure}
                                        endAdornment={<InputAdornment position="start">{message.unit}</InputAdornment>}
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
                                        endAdornment={<InputAdornment position="start">{message.unit}</InputAdornment>}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={2}>
                                <FormLabel>{message.vehicleCategoriesNames.I}</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.margin} variant="filled">
                                    <InputLabel htmlFor="infrastructure-I">{message.infrastructureCost}</InputLabel>
                                    <FilledInput
                                        id="infrastructure-I"
                                        value={current.I.infrastructure}
                                        type="number"
                                        onChange={handleInfrastructure}
                                        endAdornment={<InputAdornment position="start">{message.unit}</InputAdornment>}
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
                                        endAdornment={<InputAdornment position="start">{message.unit}</InputAdornment>}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={2}>
                                <FormLabel>{message.vehicleCategoriesNames.II}</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.margin} variant="filled">
                                    <InputLabel htmlFor="infrastructure-II">{message.infrastructureCost}</InputLabel>
                                    <FilledInput
                                        id="infrastructure-II"
                                        value={current.II.infrastructure}
                                        type="number"
                                        onChange={handleInfrastructure}
                                        endAdornment={<InputAdornment position="start">{message.unit}</InputAdornment>}
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
                                        endAdornment={<InputAdornment position="start">{message.unit}</InputAdornment>}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={2}>
                                <FormLabel>{message.vehicleCategoriesNames.III}</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.margin} variant="filled">
                                    <InputLabel htmlFor="infrastructure-III">{message.infrastructureCost}</InputLabel>
                                    <FilledInput
                                        id="infrastructure-III"
                                        value={current.III.infrastructure}
                                        type="number"
                                        onChange={handleInfrastructure}
                                        endAdornment={<InputAdornment position="start">{message.unit}</InputAdornment>}
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
                                        endAdornment={<InputAdornment position="start">{message.unit}</InputAdornment>}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={2}>
                                <FormLabel>{message.vehicleCategoriesNames.IV}</FormLabel>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth className={classes.margin} variant="filled">
                                    <InputLabel htmlFor="infrastructure-IV">{message.infrastructureCost}</InputLabel>
                                    <FilledInput
                                        id="infrastructure-IV"
                                        value={current.IV.infrastructure}
                                        type="number"
                                        onChange={handleInfrastructure}

                                        endAdornment={<InputAdornment position="start">{message.unit}</InputAdornment>}
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
                                        endAdornment={<InputAdornment position="start">{message.unit}</InputAdornment>}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={classes.fabButtonRoot}>
                                    <div className={classes.wrapper}>
                                        <Fab
                                            aria-label="save"
                                            color="primary"
                                            className={buttonClassname}
                                            onClick={handleButtonClick}
                                        >
                                            {success ? <CheckIcon /> : <SaveIcon />}
                                        </Fab>
                                        {buttonLoading && <CircularProgress size={68} className={classes.fabProgress} />}
                                    </div>
                                    <div className={classes.wrapper}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={buttonClassname}
                                            disabled={buttonLoading}
                                            onClick={handleButtonClick}
                                        >
                                            {message.save}
                                        </Button>
                                        {buttonLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </div>
    )
}