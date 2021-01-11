const root = "http://app:9000/api"

const url = {
    register : root + "/register",
    login :root + "/login",
    vehicles: root + "/vehicles",    
    vehicleRegister : root + "/vehicle",
    profile: root + "/profile",
    isAdmin: root + '/admin',
    sections: root + "/sections",
}

export const localUrl = {
    homepage: "/",
    vehicleRegister : "/vehicle"
}

export default url;