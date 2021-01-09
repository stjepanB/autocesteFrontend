import url from "../properties/constants"
import axios from "axios"


export async function getVehicles() {
  var token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.get(url.vehicles, config)

  return response.data
}


export async function registerVehicle(vehicle) {

  var token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token
    }
  }

  try {
    const response = await axios.post(url.vehicleRegister, vehicle, config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}


export function getVehicleParams() {
  return [
    {
      key: 1,
      name: "Težina s teretom",
      type: "numerical"
    },
    {
      key: 2,
      name: "Visina vozila",
      type: "numerical"
    },
    {
      key: 2,
      name: "Zeleni certifikat",
      type: "text",
    }
  ]
}