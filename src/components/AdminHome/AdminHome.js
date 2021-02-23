import React, { useState, useEffect } from "react"
import DiscountLabel from "./DiscountLabels/DiscountLabel"
import { Grid } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Discount from "./Discount";
import DiscountsList from "./DiscountsList"
import { getVehicleDiscountLabels, getDiscounts, getPrivateUserLabels, getOrganisationLabels } from "../../actions/adminActions"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}))

export default function AdminHome() {
    const classes = useStyles();
    const [labels, setLabels] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const addDiscount = (discount) => setDiscounts(d => [...d, discount])
    


    useEffect(() => {
        var vehicleLabels = [];
        var privateUserLabels = [];
        var organisationLabels = [];
        var tmpDiscounts = [];
        let isMounted = true;
        if (isMounted) {
            const fetch = async () => {
                vehicleLabels = await getVehicleDiscountLabels();
                privateUserLabels = await getPrivateUserLabels();
                organisationLabels = await getOrganisationLabels();
                tmpDiscounts = await getDiscounts()
                let i = 0;
                vehicleLabels.forEach(e => e["guiLabelTyle"] = "vehicle")
                vehicleLabels.forEach(e => e["key"] = ++i);
                vehicleLabels.forEach(e => e["checked"] = false);
                privateUserLabels.forEach(e => e["guiLabelTyle"] = "privateUser")
                privateUserLabels.forEach(e => e["key"] = ++i);
                privateUserLabels.forEach(e => e["checked"] = false);
                organisationLabels.forEach(e => e["guiLabelTyle"] = "organisation");
                organisationLabels.forEach(e => e["key"] = ++i);
                organisationLabels.forEach(e => e["checked"] = false);

                console.log(tmpDiscounts)

                setLabels(vehicleLabels.concat(privateUserLabels, organisationLabels));
                setDiscounts([...tmpDiscounts])
            }

            fetch();
        }
        return () => { isMounted = false }
    }, [])

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>

                <Grid item xs={4} sm={3} md={8} lg={3}>
                    <DiscountLabel labels={labels} setLabels={setLabels} />
                </Grid>
                <Grid item xs={4} sm={3} md={8} lg={3}>
                    <Discount labels={labels}
                        setLabels={setLabels}
                        addDiscount={addDiscount}
                    />
                </Grid>
                <Grid item xs={4} sm={3} md={8} lg={3}>
                    <DiscountsList discounts={discounts} />
                </Grid>
            </Grid>
        </div>
    )
}