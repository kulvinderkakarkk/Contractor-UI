const {model, Schema} = require('mongoose')

const ContractorSchema = new Schema({
    firstName: String,
    lastName:String,
    phoneNumber: String,
    email: String,
    file: {
        type: Schema.Types.ObjectId,
        ref:'contractor'
    }
})
module.exports=model('Contractor',ContractorSchema, 'contractor')
