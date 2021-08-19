const {model, Schema} = require('mongoose')

const FileSchema = new Schema({
  filename: String,
  mimetype: String,
  path: String,
})
module.exports=model('File',FileSchema, 'files')
