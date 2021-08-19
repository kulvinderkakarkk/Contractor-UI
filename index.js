const gql=require('graphql-tag')
const mongoose=require('mongoose')
const {ApolloServer} =require('apollo-server')
const {MONGODB} =require('./config')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const PORT = process.env.PORT || 5000
const server = new ApolloServer({typeDefs, resolvers, context:({req})=>({req})})

mongoose.connect(MONGODB, {useNewUrlParser:true, useUnifiedTopology:true})
        .then(()=>{
            server.listen({port:PORT})
        })
        .catch((err)=>{
            console.log("error connecting to MONGO server", err)
        })