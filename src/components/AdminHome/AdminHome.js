import React from "react"
import DiscountLabel from "./DiscountLabel"
import Prices from "./Prices"
import {Grid} from "@material-ui/core"



export default function AdminHome() {

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Prices />
                </Grid>
                <Grid item xs={4}>
                    <DiscountLabel />
                </Grid>
            </Grid>
        </div>
    )
}