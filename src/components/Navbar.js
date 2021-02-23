import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import Button from '@material-ui/core/Button';
import Sidebar from "./Sidebar.js"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function Navbar(props) {
  const classes = useStyles();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin')
    window.location.reload();

  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        {props.isAdmin ?
          <Toolbar>
            <Sidebar />
            <Typography className={classes.title} variant="h6" >
              Autoceste
                </Typography>

            <Button color="inherit" onClick={handleLogout}>Odjava</Button>
          </Toolbar>
          :
          <Toolbar>
            <Typography className={classes.title} variant="h6" >
              Autoceste
              </Typography>

            <Button color="inherit" onClick={handleLogout}>Odjava</Button>
          </Toolbar>
        }
      </AppBar>

    </div >
  );
}


export default Navbar;