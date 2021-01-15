import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Chip, Container, FormGroup, Typography, Slider, Grid, FormControlLabel, Checkbox } from "@material-ui/core";
import Title from "../Home/Title";
import message from "../../properties/messagesForUser";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing(0.5),
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
    const [chipData, setChipData] = useState([]);
    const [index, setIndex] = useState(0)
    const [marks] = useState([
        {
            value: 0,
            label: '0%',
        },

        {
            value: 5,
            label: '5%',
        },
        {
            value: 10,
            label: '10%',
        },
        {
            value: 13,
            label: '13%',
        },
    ])

    const handleChange = (event) => {
        const tmpLabels = props.labels;
        tmpLabels.filter(l => l.name === event.target.name).forEach(l => {
            if (event.target.checked) {
                var d = l
                d["key"] = index;
                setIndex(index + 1);
                chipData.push(d)
                setChipData([...chipData])
            } else {
                const tmpChip = chipData.filter(e => e.name !== l.name);
                setChipData([...tmpChip]);

            }

            l.checked = event.target.checked
        }
        )
        props.setLabels([...tmpLabels])
    }

    const handleDelete = (chipToDelete) => () => {

        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
        const tmpLabels = props.labels;
        tmpLabels.filter(l => l.name === chipToDelete.name).forEach(l => l.checked = !l.checked);
        props.setLabels([...tmpLabels]);
    };

    function valuetext(value) {
        return `${value}%`;
    }




    useEffect(() => { }, [chipData]);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} variant="outlined">
                <Title children={message.Discount} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography id="available-marks" gutterBottom>
                                Oznake
                            </Typography>
                            <FormGroup row>
                                {
                                    props.labels.map(
                                        e => <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={e.checked}
                                                    onChange={handleChange}
                                                    name={e.name}
                                                    color="primary"
                                                />
                                            }
                                            label={e.name}
                                            key={e.key}
                                        />
                                    )
                                }
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography id="chips-choosen" gutterBottom>
                                Odabrane oznake
                            </Typography>
                            {
                                chipData.map(
                                    c => <Chip
                                        label={c.name}
                                        onDelete={handleDelete(c)}
                                        className={classes.chip}
                                    />
                                )
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Typography id="discrete-slider" gutterBottom>
                                Iznos popusta
                            </Typography>
                            <Slider
                                defaultValue={1}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={1}
                                marks={marks}
                                min={0}
                                max={13}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </div>
    )
}