

const message = {
        loginFailed: "Neuspjela prijava. Provjerite ispravnost email adrese i lozinke!",
        successfulRegistration: "Uspješna registracija!",
        userExists: "Korisnik postoji u sustavu.",
        systemError: "Došlo je do pogreške u sustavu",
        vehicleRegistrationFailed: "Automobil već postoji u sustavu",
        vehicleCategories: [
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
                        category: "III",
                        desc: "a.)    Motorna vozila s dvije ili tri osovine, najveće dopuštene mase preko 3500 kg\nb.)    Motorna vozila s dvije ili tri osovine, najveće dopuštene mase preko 3500 kg, koja vuku priključno vozilo s jednom osovinom\nc.)    Motorna vozila iz II a) koja vuku priključno vozilo, neovisno o broju osovina"
                },
                {
                        category: "IV",
                        desc: "a.)	Motorna vozila s četiri ili više osovina mase preko 3500 kg\nb.)	Motorna vozila s dvije osovine , najveće dopuštene mase preko 3500 kg, koja vuku priključno vozilo s dvije ili više osovina\nc.)	Motorna vozila s tri osovine , najveće dopuštene mase preko  3500 kg, koja vuku priključno vozilo , neovisno o broju osovina priključnog vozila"
                }
        ],
        vehicleCategory: "Kategorija vozila",
        vehicleParams: "Podaci o vozilima",
        vehicleCategoriesNames: {
                IA: "IA",
                I: "I",
                II: "II",
                III: "III",
                IV: "IV"
        },
        pricesSetup: "Cijene dionica",
        infrastructureCost: "Infrastrukturna pristojba",
        outsideCost: "Vanjski troškovi",
        totalCost: "Ukupno",
        selectSection: "Dionica autoceste",
        unit: "kn/km",
        save: "Spremi",
        DiscountLabel: "Oznake za popuste",
        createDiscount: "Napravi popust",
        Discounts: "Popusti",
        paramUnit: "Vrijednost",
        hasGreenCertificate: "Automobil posjeduje zeleni certifikat.",
        categoryDescription: "OPIS KATEGORIJE",
        categoryLabel: "OZNAKA KATEGORIJE",
        has_green_certificate: "Zeleni certifikat",
        height: "Visina",
        max_weight_with_cargo: "Maksimalna težina",
        manufacturer: "Proizvođač",
        category: "Kategorija",
        color: "Boja",
        type: "Model",
        plate: "Tablice",
        discountEndDate: "Kraj popusta",
        discountStartDate: "Početak popusta",
        discountAmount: "Iznos popusta na infrastrukturnu pristojbu",
        choosenMarks: "Odabrane oznake",
}
export const backendNames = {
        "Zeleni certifikat": "has_green_certificate",
        "Visina": "height",
        "Maksimalna težina" : "max_weight_with_cargo",
        "Proizvođač": "manufacturer",
        "Kategorija": "category",
        "Boja": "color",
        "Model": "type",
        "Tablice": "plate"
}

export const operationNames = {
        MORE: "vise (>)",
        LESS: "manje (<)",
        EQUALS: "jednako (=)",
        PRESENT: "posjeduje/naziv",
        NONE: "None",
        "vise (>)" : "MORE",
        "manje (<)" : "LESS",
        "jednako (=)" : "EQUALS",
        "posjeduje/naziv" : "PRESENT",
        "None" : "NONE"
}


export default message;