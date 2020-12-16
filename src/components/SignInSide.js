import React, {useState, useContext} from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel,
   Checkbox, Paper, Link as MaterialLin, Box, Grid, Typography , makeStyles} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import login from "../actions/userActions.js"
import {Link} from "react-router-dom"
import {TokenContext} from '../context/TokenContext.js';
import message from "../properties/messagesForUser";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {validateEmail} from "../validators/registrationValidators"


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MaterialLin color="inherit" href="https://www.linkedin.com/in/stjepan-bencic/">
        Autor
      </MaterialLin>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random?highway)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function SignInSide(props) {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useContext(TokenContext)
  const [open, setOpen] = useState(false)
  const [emailError, setEmailError] = useState(false)
  
  async function handleSubmit(event) {
    event.preventDefault();
    var userData = await login(username,password)
    if(userData === null) {
      setOpen(true)
      return
    }
    setToken(userData.token);
    localStorage.setItem('token', userData.token)
    if(userData.token !== "") {
      props.setIsLoggedIn(true)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message.loginFailed}
            action={
              <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Prijava korisnika
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="email"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
              onChange={(e)=>{
                setEmailError(validateEmail(e.target.value))
                setUsername(e.target.value)
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Lozinka"
              label="Lozinka"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={emailError}
            >
              Prijava
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register">Reigstracija korisnika</Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default SignInSide;