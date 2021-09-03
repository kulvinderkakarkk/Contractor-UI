import { GraphQLModule } from '@graphql-modules/core';
import gql from 'graphql-tag';
const path=require('path')
const express=require('express')
const mongoose=require('mongoose')
const {graphqlHTTP}=require('express-graphql')
const typeDefs = require('./graphql/typeDefs')
const {MONGODB} =require('./config')
const resolvers = require('./graphql/resolvers')
const app = express();
var cors = require('cors')
app.use(cors())
const {GraphQLUpload, graphqlUploadExpress} = require('graphql-upload');
const { schema } = new GraphQLModule({
    typeDefs: typeDefs,
  resolvers: resolvers
});
const PORT = process.env.PORT || 4000

app.use(
  '/graphql',
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHTTP({ schema, graphiql: true })
);

app.get('/images/:name',(req,res) => {
  
  var options = {
    root: path.join(__dirname, 'images'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  var fileName = req.params.name
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } 
  })
})
mongoose.connect(MONGODB, {useNewUrlParser:true, useUnifiedTopology:true})
        .then(()=>{
            app.listen(PORT);
            console.log("🚀 Server started on",PORT)
        })
        .catch((err)=>{
            console.log("error connecting to MONGO server", err)
        })
