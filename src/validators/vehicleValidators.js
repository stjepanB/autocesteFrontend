

export function validatePlateNumber(value) {
    value += ""
    console.log(value)
    if(isNaN(value)){
        return true
    }
    if(value.length > 4 || value.length < 3){
        return true
    }
    return false;
}

export function validatePlateLetters(value) {
        const tmp = value.split("");
        for(var i=0; i<tmp.length; i++){
            if(!isNaN(tmp[i])){
                return true;
            }
        }
        if(value.length < 3){
            return false
        }
        return true
}

export function validateWeight(value){
    if(!isNaN(value) && value > 0 && value < 50000){
        return false
    }
    return true
}

export function validateHeight(value){
    if(!isNaN(value) && value > 0 && value < 1000){
        return false
    }
    return true
}

export function validateAxles(value){
    if(!isNaN(value) && value > 0 && value < 30){
        return false
    }
    return true
}