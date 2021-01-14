import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container, FormGroup, Grid, FormControlLabel, Checkbox } from "@material-ui/core";
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
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}))


export default function Discount(props) {
    const classes = useStyles();
    var state = {
        checkedB: false
    }

    useEffect(() => {
        console.log(props.labels)
        props.labels.map(e=> e['srbo']= "Zdeslav");
        console.log(props.labels)
    }, [props.labels])
    const handleChange = (e) => {

    }
    return (
        <div className={classes.root}>
            <Paper className={classes.paper} variant="outlined">
                <Title children={message.Discount} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9}>
                            <FormGroup row>
                                {
                                    props.labels.map(
                                        e => <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={state.checkedB}
                                                    onChange={handleChange}
                                                    name={e.name}
                                                    color="primary"
                                                />
                                            }
                                            label={e.name}
                                        />
                                    )
                                }
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </div>
    )
}