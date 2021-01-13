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
    discountLabel: "/discount/label",
    vehicleDiscountLabel: root + discountLabel + "?id=vehicle",
    privateDiscountLabel: root + discountLabel + "?id=private",
    organisationDiscountLabel: root + discountLabel + "?id=organisation"
}


export const localUrl = {
    homepage: "/",
    vehicleRegister: "/vehicle"
}

export default url;