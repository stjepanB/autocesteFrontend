import React, { useState, useRef, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { setDiscount } from "../../actions/adminActions"
import { Paper, Chip, TextField, CircularProgress, Fab, Button, Container, FormGroup, Typography, Slider, Grid, FormControlLabel, Checkbox } from "@material-ui/core";
import Title from "../Home/Title";
import message from "../../properties/messagesForUser";
import 'date-fns';
import compareAsc from 'date-fns/compareAsc'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SaveIcon from '@material-ui/icons/Save';
import CheckIcon from '@material-ui/icons/Check';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';
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
    fabButtonRoot: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
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
    const [percentage, setPercentage] = useState(1);
    const [discountName, setDiscountName] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [success, setSuccess] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });
    const timer = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!buttonLoading) {
            setSuccess(false);
            setButtonLoading(true);
            const labelNames = props.labels.filter(l => l.checked).map(e => e.name);
            const dto = {
                "labels": labelNames,
                "startDate": startDate,
                "endDate": endDate,
                "percentage": percentage,
                "name": discountName
            }

            const response = await setDiscount(dto)


            if (response === "OK") {
                setSuccess(true);
                setButtonLoading(false);
                setDiscountName("");
                window.location.reload(false);

            }

            timer.current = window.setTimeout(() => {
                setSuccess(false);
            }, 2000);
        }
    }

    const handleChange = (event) => {
        const tmpLabels = props.labels;
        tmpLabels.filter(l => l.name === event.target.name).forEach(l => {
            if (event.target.checked) {
                var d = l
                if (d.chipKey === undefined) {
                    d.chipKey = index;
                    setIndex(index + 1);
                }
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

    const handleName = (e) => {
        setDiscountName(e.target.value)
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

    const handleSliderChange = (event, newValue) => {
        setPercentage(newValue);
    };
    const handleStartDate = (date) => {
        //Compare the two dates and return 1 if the first date is after the second,
        // -1 if the first date is before the second or 0 if dates are equal.
        if (compareAsc(date, new Date) === -1) {
            return
        }
        if (compareAsc(date, endDate) === 1) {
            setEndDate(date);
        }
        setStartDate(date);
    }

    const handleEndDate = (date) => {
        if (compareAsc(date, new Date) === -1) {
            return
        }

        if (compareAsc(date, startDate) === -1) {
            setStartDate(date);
        }
        setEndDate(date);
    }



    useEffect(() => { }, [chipData]);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} variant="outlined">
                <Title children={message.createDiscount} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="vehicle-label"
                                variant="outlined"
                                required
                                fullWidth
                                id="discount-label-name"
                                label="Naziv popusta"
                                onChange={handleName}
                                autoFocus
                            />
                        </Grid>
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
                                {message.choosenMarks}
                            </Typography>
                            {
                                chipData.map(
                                    c => <Chip
                                        label={c.name}
                                        onDelete={handleDelete(c)}
                                        className={classes.chip}
                                        key={c.chipKey}
                                    />
                                )
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Typography id="discrete-slider" gutterBottom>
                                {message.discountAmount}
                            </Typography>
                            <Slider
                                defaultValue={1}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                onChange={handleSliderChange}
                                step={1}
                                marks={marks}
                                min={0}
                                max={13}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="discount-start-date-picker"
                                    format="dd/MM/yyyy"
                                    label={message.discountStartDate}
                                    value={startDate}
                                    onChange={handleStartDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="discount-end-date-picker"
                                    format="dd/MM/yyyy"
                                    label={message.discountEndDate}
                                    value={endDate}
                                    onChange={handleEndDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.fabButtonRoot}>
                                <div className={classes.wrapper}>
                                    <Fab
                                        aria-label="save"
                                        color="primary"
                                        className={buttonClassname}
                                        onClick={handleSubmit}
                                    >
                                        {success ? <CheckIcon /> : <SaveIcon />}
                                    </Fab>
                                    {buttonLoading && <CircularProgress size={68} className={classes.fabProgress} />}
                                </div>
                                <div className={classes.wrapper}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={buttonClassname}
                                        disabled={buttonLoading}
                                        onClick={handleSubmit}
                                    >
                                        {message.save}
                                    </Button>
                                    {buttonLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </div>
    )
}