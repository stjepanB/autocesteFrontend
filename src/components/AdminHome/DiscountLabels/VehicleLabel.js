import { getVehicleParams } from "../../../actions/vehicleActions"
import { setVehicleDiscountLabel } from "../../../actions/adminActions"
import React, { useEffect, useRef, useState } from "react";
import { Grid, TextField, Button, FilledInput, Fab, CircularProgress, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import message, { backendNames, operationNames } from "../../../properties/messagesForUser";
import SaveIcon from '@material-ui/icons/Save';
import CheckIcon from '@material-ui/icons/Check';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        minWidth: 220,
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

}));

export default function VehicleLabel(props) {
    const classes = useStyles();
    const [param, setParam] = useState({
        key: 1,
        name: "",
        type: "numerical"
    });
    const [params, setParams] = useState([]);
    const [vehicleCategories] = useState([
        {
            key: 1,
            category: message.vehicleCategoriesNames.IA
        },
        {
            key: 2,
            category: message.vehicleCategoriesNames.I
        },
        {
            key: 3,
            category: message.vehicleCategoriesNames.II
        },
        {
            key: 4,
            category: message.vehicleCategoriesNames.III
        },
        {
            key: 5,
            category: message.vehicleCategoriesNames.IV
        },

    ]);
    const [vehicleCategory, setVehicleCategory] = useState({
        key: 1,
        category: message.vehicleCategoriesNames.IA
    })
    const [numericalOperations] = useState([
        operationNames.MORE, operationNames.LESS, operationNames.EQUALS
    ])
    const [currentOperation, setCurrentOperation] = useState(operationNames.MORE)
    const [value, setValue] = useState("")
    const [labelName, setLabelName] = useState("")
    const [success, setSuccess] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });
    const timer = useRef();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!buttonLoading) {
            setSuccess(false);
            setButtonLoading(true);
            console.log(param)
            const dto = {
                name: labelName,
                vehicleCategory: vehicleCategory.category,
                paramType: backendNames[param.name],
                operation: (param.type === "numerical") ? operationNames[currentOperation] : "NONE",
                value: value,
            }
            console.log(dto)
            const response = await setVehicleDiscountLabel(dto)

            if (response === "OK") {
                setSuccess(true);
                setButtonLoading(false);
                const lab = props.labels;
                dto['key'] = Math.round(Math.random() * 1000000);
                console.log(dto['key']);
                lab.push(dto)
                props.setLabels([...lab]);
            } else {
                console.log("IMAMO PROBLEM" + response);
            }

            timer.current = window.setTimeout(() => {
                setSuccess(false);
                setLabelName("");
            }, 2000);
        }
    }

    useEffect(() => {
        async function fetch() {
            var tmp = await getVehicleParams();
            setParams(tmp);
            setParam(tmp[0]);
        }
        fetch();
    }, [])

    const selectParam = (e) => {
        setParam(params.filter(l => l.name === e.target.value)[0]);
    }

    const handleLabelName = (e) => {
        setLabelName(e.target.value)
    }

    const selectVehicleCategory = (event) => {
        const tmp = vehicleCategories.filter(e => e.category === event.target.value)[0];
        setVehicleCategory(tmp);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="name"
                            name="vehicle-label"
                            variant="outlined"
                            required
                            fullWidth
                            id="vehicle-label-name"
                            label="Naziv oznake"
                            onChange={handleLabelName}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="select-vehicle-number-type">{message.vehicleParams}</InputLabel>
                            <Select
                                labelId="select-type"
                                id="select-type"
                                value={param.name}
                                onChange={selectParam}
                            >
                                {
                                    params.map(
                                        e => <MenuItem value={e.name} key={e.key}>{e.name}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="select-vehicle-number-type">{message.vehicleCategory}</InputLabel>
                            <Select
                                labelId="select-type"
                                id="select-type"
                                value={vehicleCategory.category}
                                onChange={selectVehicleCategory}
                            >
                                {
                                    vehicleCategories.map(
                                        e => <MenuItem value={e.category} key={e.key}>{e.category}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    {
                        param.type === "numerical" ?
                            <Grid item xs={6}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="operation-on-numerical-types">{message.operation}</InputLabel>
                                    <Select
                                        labelId="operation-on-numerical-types"
                                        id="operation-on-numerical-types"
                                        value={currentOperation}
                                        onChange={(e) => setCurrentOperation(e.target.value)}
                                    >
                                        {
                                            numericalOperations.map(
                                                e => <MenuItem value={e} key={e}>{e}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            : null
                    }
                    {param.type === "numerical" ?
                        <Grid item xs={6}>
                            <FormControl fullWidth className={classes.margin} variant="filled">
                                <InputLabel htmlFor="parameter-unit">{message.paramUnit}</InputLabel>
                                <FilledInput
                                    id="param-unit"
                                    value={value}
                                    type="number"
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            </FormControl>

                        </Grid>
                        : null
                    }
                    <Grid item xs={12}>
                        <div className={classes.fabButtonRoot}>
                            <div className={classes.wrapper}>
                                <Fab
                                    aria-label="save"
                                    color="primary"
                                    className={buttonClassname}
                                    onClick={handleSubmit}
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
                                    onClick={handleSubmit}
                                >
                                    {message.save}
                                </Button>
                                {buttonLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div >
    )
}