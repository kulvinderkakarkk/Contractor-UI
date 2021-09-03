module.exports.validateContractorInput= (firstName, lastName, email, phoneNumber) => {
    const errors={}
    if(firstName.trim()==="") {
        errors.firstName="First Name field should not be empty"
    }
    if(lastName.trim()==="") {
        errors.lastName="Last Name field cannot be empty"
    }
    if(phoneNumber.trim()==="") {
        errors.phoneNumber ="Phone Number cannot be empty"
    } 
    if(!phoneNumber.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
        errors.phoneNUmber = "Invalid Phone number"
    }
    if(email.trim()==="") {
        errors.email="Email field should not be empty"
    } else {        
        if(!email.match(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/)) {
            errors.email="Email is not valid"
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length<1
    }
    
}
