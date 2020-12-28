const root = "http://localhost:9000"

const url = {
    register : root + "/register",
    login :root + "/login",
    vehicles: root + "/vehicles",    
    vehicleRegister : root + "/vehicle",
    profile: root + "/profile",
    isAdmin: root + '/admin'
}

export const localUrl = {
    homepage: "/",
    vehicleRegister : "/vehicle"
}


export default url;