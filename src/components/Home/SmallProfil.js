import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {getProfile} from "../../actions/userActions"

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function SmallProfil() {
  const classes = useStyles();
  const [profile, setProfile] = useState({
      firstName: "",
      lastName: "",
      email: ""
  })

  useEffect(() => {
    async function fetch(){
        var tmp = await getProfile()
        setProfile({
          firstName: tmp.firstName,
          lastName: tmp.lastName,
          email: tmp.email
        })
    }
    fetch();
  }, [])

  return (
    <React.Fragment>
      <Title>Korisnik</Title>
      <Typography component="p" variant="h4">
        {profile.firstName + "  " + profile.lastName}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {profile.email}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Više
        </Link>
      </div>
    </React.Fragment>
  );
}