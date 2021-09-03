const {model, Schema} = require('mongoose')

const ContractorSchema = new Schema({
    firstName: String,
    lastName:String,
    phoneNumber: String,
    email: String,
    image: String
})
module.exports=model('Contractor',ContractorSchema, 'contractor')
