import axios from "axios"
import url from "../properties/constants";


export async function getSectionsPrices() {

        var token = localStorage.getItem("token");
        const config = {
                headers: {
                        Authorization: token
                }
        }
        const response = await axios.get(url.sections, config)
        return response.data
}

export async function setSectionsPrices(sectionsDto) {
        var token = localStorage.getItem("token");
        const config = {
                headers: {
                        Authorization: token
                }
        }
        
        console.log(sectionsDto)
        try {
                const response = await axios.post(url.sections, sectionsDto, config)
                return response.data
        } catch (error) {
                console.log(error)
                return "FAILED"
        }
}

export function getVehicleNumberTypes() {
        return [
                {
                        key :1,
                        name: "Težina s teretom"
                },
                {
                        key: 2,
                        name: "Visina vozila"
                }
        ]
}

/** HARDCODE DATA
 *
 *
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
 */