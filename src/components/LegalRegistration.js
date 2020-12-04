import React, {useState} from "react"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AirportShuttleOutlinedIcon from '@material-ui/icons/AirportShuttleOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {validateEmail,validateOib,validatePassword} from "../validators/registrationValidators"


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.linkedin.com/in/stjepan-bencic">
          Autor
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  export default function LegaleRegistration() {
    const classes = useStyles();
    const [errors,setErrors] = useState({
        oibError: false,
        passwordError: false,
        emailError: false
    });
    const [newUser,setNewUser] = useState({
        companyName:"",
        email:"",
        oib: 0,
        password:"",  
    })
    const [repeatePassword, setRepeatePassword] = useState("");

  
 return (

<Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AirportShuttleOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registracija organizacije
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="companyName"
                  variant="outlined"
                  required
                  fullWidth
                  id="companyName"
                  label="Naziv organizacije"
                  onChange={(e)=>setNewUser({
                    ...newUser,  
                    companyName:  e.target.value
                  })}
                  autoFocus
                />
              </Grid>
        
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email adresa"
                  name="email"
                  autoComplete="email"
                  error={errors.emailError}
                  onChange={e=>{
                      setErrors({
                          ...errors,
                          emailError:validateEmail(e.target.value)
                      })
                      setNewUser({
                          ...newUser,
                          email:e.target.value
                      })
                    }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Lozinka"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={e=>{
                      setErrors({
                          ...errors,
                          passwordError:validatePassword(e.target.value, repeatePassword)
                      })
                      setNewUser({
                          ...newUser,
                          password:e.target.value
                        })
                    }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                    variant="outlined"
                    required
                    fullWidth
                    name="testPassword"
                    label="Ponovi lozinku"
                    type="password"
                    id="testPassword"
                    autoComplete="repeated-password"
                    error={errors.passwordError}
                    onChange={e=>{
                        setRepeatePassword(e.target.value)
                        setErrors({
                            ...errors,
                            passwordError: validatePassword(e.target.value, newUser.password)
                        })
                    }}
                />
              
              </Grid>
              <Grid item xs={12}>
                <TextField 
                    variant="outlined"
                    type="number"
                    required
                    fullWidth
                    name="oib"
                    label="OIB"
                    id="oib"
                    autoComplete="off"
                    error={errors.oibError}
                    onChange={(e)=>{
                        setErrors({
                            ...errors,
                            oibError:validateOib(e.target.value)
                        })
                        setNewUser({
                            ...newUser,
                            oib:e.target.value
                        })}
                    }
                />

              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registriraj se
            </Button>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
)}