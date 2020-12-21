import url from "../properties/constants"
import axios from "axios"
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
  }
  
  const rows = [
    createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
    createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
    createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
  ];

export async function getVehicles(token){
  const config = {
    headers: {
       Authorization: token
    }
  }
    console.log(rows.length)
    //const response = await axios.get(url.vehicles, config)
    return rows
}


export async function registerVehicle(vehicle,token){
  const config = {
    headers: {
       Authorization: token
    }
  }
  console.log(url.vehicleRegister)
  console.log("Saljem " + vehicle)
  console.log(token)

  try{
    const response = await axios.post(url.vehicleRegister,vehicle, config)
    console.log(response)
  }catch(error){
    console.log(error)
  }
}