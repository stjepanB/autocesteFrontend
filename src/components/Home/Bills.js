import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getBills } from "../../actions/billsActions"
import Link from '@material-ui/core/Link';
import message from "../../properties/messagesForUser"



const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));



export default function Bills() {

  const [rows, setRows] = useState([])
  useEffect(() => {
    async function fetch() {

      const bills = await getBills()
      if (bills) {
        setRows(bills);
      }
    }
    fetch()
  }, [])
  const classes = useStyles();
  function preventDefault(event) {
    event.preventDefault();
  }


  return (

    rows.length === 0 ?
      <React.Fragment>
        <Title>Vaši računi</Title>
      </React.Fragment>
      :
      <React.Fragment>
        <Title>Vaši računi</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{message.plate}</TableCell>
              <TableCell>{message.entryTime}</TableCell>
              <TableCell>{message.entry}</TableCell>
              <TableCell>{message.exitTime}</TableCell>
              <TableCell>{message.exit}</TableCell>
              <TableCell align="right">{message.amount}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.plate}</TableCell>
                <TableCell>{row.entryTime}</TableCell>
                <TableCell>{row.entry}</TableCell>
                <TableCell>{row.exitTime}</TableCell>
                <TableCell>{row.exit}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            Vidi starije račune
                </Link>
        </div>
      </React.Fragment>


  )
}