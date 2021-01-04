import  {useState} from "react"
import { Paper,CircularProgress , Select, MenuItem, InputLabel, FormControl, Grid, FilledInput,InputAdornment } from "@material-ui/core";
import message from "../../properties/messagesForUser";
import Title from "../Home/Title";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    circular: {
        display: 'flex',
        '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    }
  }));

export default function Prices () {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [current,setCurrent] = useState({
        key: 2,
        section : 'Zagreb - Jastrebarsko',
        infrastructure:12.50,
        outside: 1.10
    })
    const [values, setValues] = useState([{
            key: 1,
            section : 'Šibenik - Split',
            infrastructure: 23.50,
            outside: 1.10
        },
        {
            key: 2,
            section:'Zagreb - Jastrebarsko',
            infrastructure:12.50,
            outside: 1.10
        }
    ]);
    
    const handleSubmit = async function(e) {
        e.preventDefault();
    }

    const handleOutside = function (e){
        var tmpCurrent = current;
        tmpCurrent.outside = e.target.value;
        setCurrent({
            ...current,
            outside: e.target.value
        })
        handle(tmpCurrent)
    }

    const handleInfrastructure = function (e){
        var tmpCurrent = current;
        tmpCurrent.infrastructure = e.target.value;
        setCurrent({
            ...current,
            infrastructure: e.target.value
        })
        handle(tmpCurrent)
    }
    const handle = function (curr) {
       
        const tmpValues = values.filter(e => e.section !== curr.section);
        tmpValues.push(curr);
        setValues(tmpValues)
    }

    const selectSection = function (event){
        const tmpCurrent = values.find(e=> event.target.value === e.section);
        setCurrent(tmpCurrent);
    }

    return (
        isLoading ?
        <div>
            <Paper className={classes.paper}>
                <CircularProgress size={160} thickness={5.6} />
            </Paper>
        </div>
        :
        <div>
            <Paper>
                <Title children={message.pricesSetup} />
                <form onSubmit={handleSubmit}>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={2}>
                        <FormControl fullWidth className={classes.margin} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">{message.infrastructureCost}</InputLabel>
                            <FilledInput
                                id="filled-adornment-amount"
                                value={current.infrastructure}
                                type="number"
                                onChange={handleInfrastructure}
                                endAdornment={<InputAdornment position="start">kn</InputAdornment>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth className={classes.margin} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">{message.outsideCost}</InputLabel>
                            <FilledInput
                                id="filled-adornment-amount"
                                value={current.outside}
                                type="number"
                                onChange={handleOutside}
                                endAdornment={<InputAdornment position="start">kn</InputAdornment>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={current.section}
                                onChange={selectSection}
                            >{
                                values.map(
                                    e => <MenuItem value={e.section} key={e.key}>{e.section}</MenuItem>
                                )
                             }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                </form>
            </Paper>
        </div>
    )
}