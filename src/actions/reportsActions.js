import url from "../properties/constants"
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

export async function getReports() {
    const response = await axios.get(url.reports, getConfig())
    return response.data

}