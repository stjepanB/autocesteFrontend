import React, { useState, useEffect } from "react"
import DiscountLabel from "./DiscountLabels/DiscountLabel"
import Prices from "./Prices"
import { Grid } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import message from "../../properties/messagesForUser";
import Discount from "./Discount";
import DiscountsList from "./DiscountsList"
import Reports from "./Reports"
import { getVehicleDiscountLabels,getDiscounts, getPrivateUserLabels, getOrganisationLabels } from "../../actions/adminActions"

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
                <Grid item xs={8}>
                    <Prices />
                </Grid>
                <Grid item xs={4}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>{message.DiscountLabel}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <DiscountLabel labels={labels} setLabels={setLabels} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className={classes.heading}>{message.createDiscount}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Discount labels={labels} 
                                      setLabels={setLabels} 
                                      setDiscounts={setDiscounts}
                                      discounts={discounts}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="discounts-header"
                        >
                            <Typography className={classes.heading}>{message.Discounts}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <DiscountsList discounts={discounts}/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="reports-header"
                        >
                            <Typography className={classes.heading}>{message.reports}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Reports />
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </div>
    )
}