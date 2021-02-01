import url from "../properties/constants";
import axios from "axios"

const getConfig = () => {
  var token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token
    }
  }
  return config;
}


export async function getBills() {
  const response = await axios.get(url.bills, getConfig())
  return response.data
}