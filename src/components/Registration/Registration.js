import React, { useState } from 'react';
import PrivateRegistration from "./PrivateRegistration"
import LegalRegistration from "./LegalRegistration"
import { Radio, FormControl, FormControlLabel, RadioGroup } from '@material-ui/core';
import {Link} from "react-router-dom"


export default function Registration() {
    const [selectedItem, setSelectedItem] = useState("privateUser")
    return (
        <div>
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
                </RadioGroup>
            </FormControl>


            {selectedItem === "privateUser" ?
                <PrivateRegistration />
                : <LegalRegistration />
            }
        </div>

    );
}