import axios from "axios"
import url from "../properties/constants";


export async function getSectionsPrices(){
        const tmp =  [{
                key: 1,
                section : 'Šibenik - Split',

                IA : {
                        infrastructure: 23.50,
                        outside: 1.10
                },
                I : {
                        infrastructure: 23.50,
                        outside: 1.10
                },
                II : {
                        infrastructure: 23.50,
                        outside: 1.10
                },
                III : {
                        infrastructure: 23.50,
                        outside: 1.10
                },
                IV : {
                        infrastructure: 23.50,
                        outside: 1.10
                }
                
            },
            {
                key: 2,
                section:'Zagreb - Jastrebarsko',
                IA : {
                        infrastructure: 23.50,
                        outside: 1.10
                },
                I : {
                        infrastructure: 23.50,
                        outside: 1.10
                },
                II : {
                        infrastructure: 23.50,
                        outside: 1.10
                },
                III : {
                        infrastructure: 23.50,
                        outside: 1.10
                },
                IV : {
                        infrastructure: 23.50,
                        outside: 1.10
                }
                
            }
        ]
        return tmp;
}