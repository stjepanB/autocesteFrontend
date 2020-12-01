export const validatePassword = (password1, password2) => {
      
    if(password1 === password2) {
        return false
    }else {
       return true
    }
};

export  const validateOib = (oib) => {
    if (!oib) {
        return false;
      }
      if (oib.length !== 0 && oib.length !== 11) {
        return true;
      }
      let b = parseInt(oib, 10);
      if (isNaN(b)) {
        return true;
      }
      let a = 10;
      for (let i = 0; i < 10; i++) {
        a = a + parseInt(oib.substr(i, 1), 10);
        a = a % 10;
        if (a === 0) {
          a = 10;
        }
        a *= 2;
        a = a % 11;
      }
      let control = 11 - a;
      if (control === 10) {
        control = 0;
      }
      if(control !== parseInt(oib.substr(10, 1))){
          return true;
      }else{
         return false;
      }
    
};

export const validateEmail = (email)=> {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let pattern = new RegExp(mailformat)
    if(!pattern.test(email)){
        return true
    }
    return false
}