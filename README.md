# Contractor-UI
This application lets you add contractor information and see the contractor information in two views- List and Tiles view. Through this repository you learn to use latest hooks along with file upload feature in GraphQL.

| Application | Technologies used| 
| --- | --- |
| Front End   | ReactJS |
| Back End | NodeJS + GraphQL (MONGO) |

(Note: This application is run and tested on node version 12.0.0. Please use this version to run the application. This application won't run on node > v.14.)
## Steps to run the application

### Run GraphQL server
- Clone the repository
- cd into the repository
- Install node modules for node graphql server using `npm install`
- Run the graphql server using `npm start`


### Run React application
- cd into the repository and then cd into client directory.
- install react modules using `npm install`
- Run the web application using `npm start`

Access the website on http://localhost:5000/

## Description Of the GRAPHQL SERVER
The GraphQL server contains Query and Mutations for fetching and storing results in mongoose database.

| TYPE | NAME | ARGUMENTS | RETURN TYPE | DESCRIPTION | 
| --- | --- | --- | --- | --- | 
| QUERY | getContractors | - | [id, firstName, lastName, email, phoneNumber, image] | This query returns the array of all contractors in database |
| QUERY | getContractor | id (Type ID) | id, firstName, lastName, email, phoneNumber, image | This query searches for contractor by idand returns the information for that contractor |
| Mutation | insertContractor | ContractorInput(firstName, lastName, email, phoneNumber), file (Type upload) | id, firstName, lastName, email, phoneNumber, image | This mutation lets you insert contractor in database. Also email is used as unique key to determine uniqueness of contractors. You cannot add two contractors with same email |
| Mutation | uploadFile | file (Type upload) | id, fileName, mimetype, path | This mutation lets you add file to nodeJS server and store details in database. |

Access the GRAPHQL server on http://localhost:4000/graphql
