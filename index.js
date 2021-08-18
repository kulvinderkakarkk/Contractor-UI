const gql=require('graphql-tag')
const mongoose=require('mongoose')
const {ApolloServer} =require('apollo-server')
const {MONGODB} =require('./config')

const typeDefs=gql`
    type Constructor {
        id: ID!,
        firstName: String!,
        lastName: String!,
        phoneNumber: Int!,
        email: String!
    }
    type Query {
        getConstructors:Constructor
    }
`
const resolvers= ()=>{console.log("hello world")}
const PORT = process.env.PORT || 5000
const server = new ApolloServer({typeDefs, resolvers, context:({req})=>({req})})

mongoose.connect(MONGODB, {useNewUrlParser:true, useUnifiedTopology:true})
        .then(()=>{
            server.listen({port:PORT})
        })
        .catch((err)=>{
            console.log("error connecting to MONGO server", err)
        })