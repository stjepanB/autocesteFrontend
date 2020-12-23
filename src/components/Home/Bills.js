import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {getBills} from "../../actions/billsActions"
import Link from '@material-ui/core/Link';



const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
  }));



export default function Bills(){

    const [rows, setRows] = useState([])
    useEffect(() => {
        setRows(getBills())
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
                            <TableCell>Date</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Ship To</TableCell>
                            <TableCell>Payment Method</TableCell>
                            <TableCell align="right">Sale Amount</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.shipTo}</TableCell>
                            <TableCell>{row.paymentMethod}</TableCell>
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