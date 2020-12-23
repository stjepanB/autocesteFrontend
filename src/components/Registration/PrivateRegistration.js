import React, {useState, useEffect} from "react"
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
import {validateEmail,validateOib,validatePassword} from "../../validators/registrationValidators"
import {register} from "../../actions/userActions"
import message from "../../properties/messagesForUser";
import Snackbar from '@material-ui/core/Snackbar';


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

  export default function PrivateRegistration() {
    const classes = useStyles();
    const [errors,setErrors] = useState({
        oibError: false,
        passwordError: false,
        emailError: false
    });
    const [newUser,setNewUser] = useState({
        firstName:"",
        lastName: "",
        email:"",
        address:"",
        oib: 0,
        password:"",  
    })
    const [repeatePassword, setRepeatePassword] = useState("");
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState("")
    const handleLogin = function(e) {
      window.location.replace("/")
    }
    const handleSubmit = async function(e){
        e.preventDefault()  
        const response = await register(newUser)
        if(response !== null){
          response.data === "CONFLICT" ? setMsg(message.userExists) : setMsg(message.successfulRegistration);
          setOpen(true)
        }else {
          setMsg(message.systemError)
          setOpen(true)
        }
    }
  

    useEffect(()=>{
          let b = (Math.floor(Math.random() * 10000000000))         
          let a = 10;
          
          for (let i = 0; i < 10; i++) {
            a = a + parseInt(b.toString().substr(i, 1), 10);
            a = a % 10;
            if (a === 0) {
              a = 10;
            }
            a *= 2;
            a = a % 11;
          }
          let control = 11 - a;
          if (control === 10) {
            control = 0;
          }
          b*= 10
          b+= control
          console.log("Generirani oib " + b)
        
        }, [])
  
 return (

<Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={open}
            autoHideDuration={6000}
            message={msg}
            action={
              <React.Fragment>
                    <Button variant="contained" color="primary" onClick={handleLogin}>Prijavi se</Button>
              </React.Fragment>
            }
          />
          <Avatar className={classes.avatar}>
            <AirportShuttleOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registracija korisnika
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Ime"
                  onChange={(e)=>setNewUser({
                    ...newUser,  
                    firstName:  e.target.value
                  })}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Prezime"
                  name="lastName"
                  autoComplete="lname"
                  onChange={e=>setNewUser({
                    ...newUser, 
                    lastName: e.target.value}
                    )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="address"
                  label="Adresa"
                  name="address"
                  onChange={e=>{
                      setNewUser({
                          ...newUser,
                          address:e.target.value
                      })
                    }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
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
                  label="Password"
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