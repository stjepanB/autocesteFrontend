import React, { useEffect, useState } from "react"
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {getVehicles} from "../actions/vehicleActions"



export default function Vehicles(){

    const [rows, setRows] = useState([])
    useEffect(() => {
        setRows(getVehicles())
    }, [])


    return (

                rows.length === 0 ? 
                <React.Fragment>
                    <Title>Registrirana vozila</Title>
                    <Button>Dodaj</Button>
                    
                </React.Fragment>

                :  
                <React.Fragment>
                    <Title>Registrirana vozila</Title>
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
                <Button>Dodaj</Button>
                </React.Fragment>
                

    )
}