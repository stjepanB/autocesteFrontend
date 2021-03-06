import axios from "axios"
import url from "../properties/constants";

const getConfig = () => {
        var token = localStorage.getItem("token");
        const config = {
                headers: {
                        Authorization: token
                }
        }
        return config;
}

export async function getSectionsPrices() {
        const response = await axios.get(url.sections, getConfig())
        return response.data
}

export async function setSectionsPrices(sectionsDto) {

        console.log("Saljem : ");
        console.log(sectionsDto)
        try {
                const response = await axios.post(url.sections, sectionsDto, getConfig())
                return response.data
        } catch (error) {
                console.log(error)
                return "FAILED"
        }
}

export async function setVehicleDiscountLabel(vehicleDiscountLabel) {
        try {
                const response = await axios.post(url.vehicleDiscountLabel, vehicleDiscountLabel, getConfig())
                return response.data
        } catch (error) {
                console.log(error)
                return "FAILED"
        }
}

export async function getVehicleDiscountLabels() {
        try {
                const response = await axios.get(url.discountLabel, getConfig())
                return response.data
        } catch (error) {
                console.log(error)
        }
}

export async function getOrganisationLabels() {
        return []
}

export async function getPrivateUserLabels() {
        return []
}

export async function setDiscount(dto) {
        try {
                const response = await axios.post(url.discount, dto, getConfig())
                return response.data
        } catch (error) {
                console.log(error)
                return "FAILED"
        }
}

export async function getDiscounts() {
        try {
                const response = await axios.get(url.discount, getConfig())
                return response.data
        } catch (error) {
                console.log(error)
        }
}