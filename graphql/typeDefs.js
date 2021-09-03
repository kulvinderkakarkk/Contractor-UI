const { gql } = require('apollo-server');
module.exports= gql`  
    type Contractor {
        id: ID!
        firstName: String!
        lastName: String!
        phoneNumber: String!
        email: String!  
        image: String!
    }
    scalar Upload
    type File {
        id:ID!
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
        email: String!
    }
    type Mutation {
        insertContractor(contractorInput: ContractorInput, file: Upload!): Contractor!
        uploadFile(file: Upload!): File!
    }
`