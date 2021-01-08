import { getVehicleNumberTypes } from "../../actions/adminActions"
import React, { useEffect, useState } from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import message from "../../properties/messagesForUser";

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },

}));

export default function VehicleLabel() {
    const classes = useStyles();
    const [type, setType] = useState({
        key : 1,
        name: "Težina s teretom"
    });
    const [types, setTypes] = useState([]);
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


    useEffect(() => {
        const tmp = getVehicleNumberTypes();
        setTypes(tmp); //change for async function
        setType(tmp[0]);
    }, [])

    const selectNumberType = (e) => {
        setType(types.filter(l => l.name === e.target.value)[0]);
    }

    const selectVehicleCategory = (event) => {
        const tmp = vehicleCategories.filter(e => e.category === event.target.value)[0];

        setVehicleCategory(tmp);
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-vehicle-number-type">{message.vehicleNumberTypes}</InputLabel>
                        <Select
                            labelId="select-type"
                            id="select-type"
                            value={type.name}
                            onChange={selectNumberType}
                        >{
                                types.map(
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
                        >{
                                vehicleCategories.map(
                                    e => <MenuItem value={e.category} key={e.key}>{e.category}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div >
    )
}