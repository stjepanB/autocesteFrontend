import { getVehicleParams } from "../../actions/vehicleActions"
import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, FilledInput, InputAdornment, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import message from "../../properties/messagesForUser";

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        minWidth: 220,
    }

}));

export default function VehicleLabel() {
    const classes = useStyles();
    const [param, setParam] = useState({
        key: 1,
        name: "Težina s teretom",
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
        "vise (>)", "manje (<)", "jednako (=)"
    ])
    const [currentOperation, setCurrentOperation] = useState("vise (>)")
    const [paramValue, setParamValue] = useState({})

    useEffect(() => {
        const tmp = getVehicleParams();
        setParams(tmp); //change for async function
        setParam(tmp[0]);
    }, [])

    const selectParam = (e) => {
        setParam(params.filter(l => l.name === e.target.value)[0]);
    }

    const handleLabelName = (e) => {

    }

    const selectVehicleCategory = (event) => {
        const tmp = vehicleCategories.filter(e => e.category === event.target.value)[0];

        setVehicleCategory(tmp);
    }

    return (
        <div>
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
                                value={paramValue}
                                type="number"
                                onChange={(e) => setParamValue(e.target.value)}
                                endAdornment={<InputAdornment position="start">{param.unit}</InputAdornment>}
                            />
                        </FormControl>

                    </Grid>
                    : null
                }
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {message.save}
                    </Button>
                </Grid>
            </Grid>
        </div >
    )
}