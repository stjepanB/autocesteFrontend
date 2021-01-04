

const message = {
        loginFailed : "Neuspjela prijava. Provjerite ispravnost email adrese i lozinke!",
        successfulRegistration: "Uspješna registracija!",
        userExists: "Korisnik postoji u sustavu.",
        systemError: "Došlo je do pogreške u sustavu",
        vehicleRegistrationFailed : "Automobil već postoji u sustavu",
        vehicleCategories : [
                { 
                        category: "IA",
                        desc: "Motocikli, motorni tricikli, četverocikli"
                },
                {
                        category: "I",
                        desc: "Motorna vozila s dvije osovine, visine do 1.9 m"
                },
                {
                        category: "II",
                        desc: "a.)   Motorna vozila s dvije osovine, čija visina prelazi 1.9m, a najveća dopuštena masa ne prelazi 3500 kg\nb.)   Motorna vozila s dvije osovine, visine ispod 1.9 m, koja vuku priključno vozilo, neovisno o broju osovina i visini priključnog vozila"
                },
                {
                        category:"III",
                        desc: "a.)    Motorna vozila s dvije ili tri osovine, najveće dopuštene mase preko 3500 kg\nb.)    Motorna vozila s dvije ili tri osovine, najveće dopuštene mase preko 3500 kg, koja vuku priključno vozilo s jednom osovinom\nc.)    Motorna vozila iz II a) koja vuku priključno vozilo, neovisno o broju osovina"
                },
                {
                        category:"IV",
                        desc: "a.)	Motorna vozila s četiri ili više osovina mase preko 3500 kg\nb.)	Motorna vozila s dvije osovine , najveće dopuštene mase preko 3500 kg, koja vuku priključno vozilo s dvije ili više osovina\nc.)	Motorna vozila s tri osovine , najveće dopuštene mase preko  3500 kg, koja vuku priključno vozilo , neovisno o broju osovina priključnog vozila"
                }
        ],
        pricesSetup : "Cijene dionica",
        infrastructureCost: "Infrastrukturna pristojba",
        outsideCost: "Vanjski troškovi"
}


export default message;