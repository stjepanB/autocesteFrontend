import React, { useEffect, useState } from "react"
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {getVehicles} from "../../actions/vehicleActions"
import {Link} from "react-router-dom"
import {localUrl} from "../../properties/constants"



export default function Vehicles(){

    const [rows, setRows] = useState([])
    useEffect(() => {
        async function fetch(){
            setRows(await getVehicles())
        }
        fetch();
    }, [])


    return (

                rows.length === 0 ? 
                <React.Fragment>
                    <Title>Registrirana vozila</Title>
                    <Link to={localUrl.vehicleRegister}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                        > 
                            Dodaj
                        </Button>
                    </Link>
                    
                </React.Fragment>

                :  
                <React.Fragment>
                    <Title>Registrirana vozila</Title>
                    <Table size="small">
                        <TableHead>
                        <TableRow>
                            <TableCell>Registracija</TableCell>
                            <TableCell>Kategorija</TableCell>
                            <TableCell>Proizvođač</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell align="right">Težina s teretom (kg)</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        { 
                           rows.map((row) => (
                            <TableRow key={row.id}>
                            <TableCell>{row.plate}</TableCell>
                            <TableCell>{row.category}</TableCell>
                            <TableCell>{row.manufacturer}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell align="right">{row.maxWeightWithCargo}</TableCell>
                            </TableRow>
                            ))
                        }
                        </TableBody>
                </Table>
                <Link to={localUrl.vehicleRegister}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                    > 
                        Dodaj
                    </Button>
                </Link>
                </React.Fragment>
                

    )
}