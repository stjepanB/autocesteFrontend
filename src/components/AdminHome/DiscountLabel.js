import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from "@material-ui/core";
import { Radio, FormControl, FormControlLabel, RadioGroup } from '@material-ui/core';
import VehicleLabel from "./VehicleLabel";
import OrganizationLabel from "./OrganizationLabel";
import PrivateUserLabel from "./PrivateUserLabel";
import message from "../../properties/messagesForUser";
import Title from "../Home/Title";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}))

export default function DiscountLabel() {
    const classes = useStyles()
    const [selectedItem, setSelectedItem] = useState("vehicle")


    return (
        <div className={classes.root}>
            <Paper className={classes.paper} variant="outlined">
                <Title children={message.DiscountLabel} />
                <FormControl component="fieldset" size="medium" fullWidth>
                    <RadioGroup row aria-label='position' name='position'>
                        <FormControlLabel
                            value="top"
                            control={<Radio
                                color="primary"
                                checked={selectedItem === 'privateUser'}
                                onChange={(e) => { setSelectedItem("privateUser") }}
                            />}
                            label="Privatni korisnici"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            value="top"
                            control={<Radio
                                color="primary"
                                checked={selectedItem === 'legalUser'}
                                onChange={(e) => { setSelectedItem("legalUser") }}
                            />}
                            label="Organizacije"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            value="top"
                            control={<Radio
                                color="primary"
                                checked={selectedItem === 'vehicle'}
                                onChange={(e) => { setSelectedItem("vehicle") }}
                            />}
                            label="Vozila"
                            labelPlacement="start"
                        />
                    </RadioGroup>
                </FormControl>

                
                {selectedItem === "privateUser" ?
                    <PrivateUserLabel /> :
                    selectedItem === "vehicle" ?
                        <VehicleLabel/> : <OrganizationLabel />
                }
            </Paper>
        </div>
    )
}