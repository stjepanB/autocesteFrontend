import url from "../properties/constants"
import axios from "axios"
import message from "../properties/messagesForUser"


const getConfig = () => {
  var token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token
    }
  }
  return config
}

export async function getVehicles() {

  const response = await axios.get(url.vehicles, getConfig())

  return response.data
}


export async function registerVehicle(vehicle) {

  try {
    const response = await axios.post(url.vehicleRegister, vehicle, getConfig())
    return response.data
  } catch (error) {
    console.log(error)
  }
}


export async function getVehicleParams() {

  const response = await axios.get(url.vehicleParams, getConfig())
  mapNames(response.data);
  return response.data
}

const mapNames = (data) => {
  return data.forEach(element => {
    element['name'] = message[element['name']]
  });
}