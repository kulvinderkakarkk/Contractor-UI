const {model, Schema} = require('mongoose')

const ConstructorSchema = new Schema({
    firstName: String,
    lastName:String,
    phoneNumber: Int,
    email: String,
    image: [{
        filename: String,
        mimetype: String,
        path: String
    }]
})
module.exports=model('Constructor',ConstructorSchema, 'constructor')
