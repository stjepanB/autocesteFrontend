import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import { getReports } from "../../actions/reportsActions"
import message from "../../properties/messagesForUser"

const useStyles = makeStyles({
    table: {
    },
});



export default function Reports() {

    const classes = useStyles();
    const [rows, setRows] = useState([])


    useEffect(() => {
        async function fetch() {

            const reports = await getReports()
            if (reports) {
                setRows(reports);
            }
        }
        fetch()
    }, [])


    return (
        rows.length === 0 ?
            <div className={classes.root}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="simple table">
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
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            :
            <div className={classes.root}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="simple table">
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
                </TableContainer>
            </div>
    )
}
