import React from "react"
import DiscountLabel from "./DiscountLabel"
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


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}))


export default function AdminHome() {
    const classes = useStyles();

    return (
        <div>
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
                            <DiscountLabel />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className={classes.heading}>{message.Discount}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Discount />
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </div>
    )
}