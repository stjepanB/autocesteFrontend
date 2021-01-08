import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from "@material-ui/core";
import Title from "../Home/Title";
import message from "../../properties/messagesForUser";

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


export default function Discount() {
    const classes = useStyles();
    return (

        <div className={classes.root}>
            <Paper className={classes.paper} variant="outlined">
                <Title children={message.Discount} />
            </Paper>
        </div>
    )
}