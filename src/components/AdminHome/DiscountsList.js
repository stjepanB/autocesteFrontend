import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
    },
});



export default function DiscountsList(props) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Naziv popusta</TableCell>
                            <TableCell>Početak</TableCell>
                            <TableCell>Završetak</TableCell>
                            <TableCell align="right">Postotak</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.discounts.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.startDate}</TableCell>
                                <TableCell>{row.endDate}</TableCell>
                                <TableCell align="right">{row.percentage + " %"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
