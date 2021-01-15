const root = "http://localhost:9000/api"
const discountLabel = "/discount/label"

const url = {
    register: root + "/register",
    login: root + "/login",
    vehicles: root + "/vehicles",
    vehicleRegister: root + "/vehicle",
    vehicleParams: root+ "/vehicle/params",
    profile: root + "/profile",
    isAdmin: root + '/admin',
    sections: root + "/sections",
    discountLabel: root + "/discount/label",
    discountLabels: root + "/discount/labels",
    vehicleDiscountLabel: root + discountLabel + '?type=vehicle',
    privateDiscountLabel: root + discountLabel + '?type=private',
    organisationDiscountLabel: root + discountLabel + '?type=organisation'
}


export const localUrl = {
    homepage: "/",
    vehicleRegister: "/vehicle"
}

export default url;