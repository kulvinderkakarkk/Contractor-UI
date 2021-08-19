const gql = require('graphql-tag')

module.exports= gql`
    scalar Upload
    type Contractor {
        id: ID!,
        firstName: String!,
        lastName: String!,
        phoneNumber: String!,
        email: String!,  
    }
    type File {
        id: ID!
        filename: String!
        mimetype: String!
        path: String!
      }
    
    type Query {
        getContractors:[Contractor]
        getContractor(id:ID!): Contractor
    }
    input ContractorInput {
        firstName: String!,
        lastName: String!,
        phoneNumber: String!,
        email: String!,
        image: Upload
    }
    type Mutation {
        insertContractor(contractorInput: ContractorInput, file:Upload): Contractor!
    }
`