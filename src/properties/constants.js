const root = "http://app:18080/api"
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
    organisationDiscountLabel: root + discountLabel + '?type=organisation',
    discount: root + "/discount",
    bills: root + "/bills",
    reports: root + "/reports"
}


export const localUrl = {
    homepage: "/",
    vehicleRegister: "/vehicle"
}

export default url;