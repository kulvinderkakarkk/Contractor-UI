const {GraphQLUpload,graphqlUploadExpress} = require('graphql-upload');
const gql = require('graphql-tag')
const  shortid =require('shortid');
const { createWriteStream, mkdir } =require("fs");
const Contractor = require('../models/Contractor')
var mongoose = require('mongoose');
const File=require('../models/File')
const {UserInputError}= require('apollo-server')
const {validateContractorInput} = require('../util/validators')

const storeUpload = async ({ stream, filename, mimetype }) => {
    const id = shortid.generate();
    const path = `images/${id}-${filename}`;
  
    return new Promise((resolve, reject) =>
      stream
        .pipe(createWriteStream(path))
        .on("finish", () => resolve({ id, path, filename, mimetype }))
        .on("error", reject)
    );
  };
  
  const processUpload = async upload => {
    const { createReadStream, filename, mimetype } = await upload;
    const stream = createReadStream();
    const file = await storeUpload({ stream, filename, mimetype });
    return file;
  };
  

module.exports= {
    Query: {
        getContractors: async()=> {
            try {
                const contractors = Contractor.find();
                return contractors;
            } catch(err) {
                throw new Error(err);
            }
        },
        getContractor: async(_,{id})=> {
            try {
                const contractor = Contractor.findById(id);
                if(contractor) {
                    return contractor;
                } else {
                    throw new Error("contractor not found")
                }
            } catch(err) {
                throw new Error(err);
            }
        }

    },
    Upload: GraphQLUpload,
    Mutation: {
        insertContractor: async(_, {contractorInput:{firstName, lastName, phoneNumber, email},file })=> {
            const any_contractor = await Contractor.findOne({email:email})
            if(any_contractor) {
                throw new UserInputError("Errors",{
                    "general": "Contractor already exist"
                })
            }
            mkdir("images", { recursive: true }, (err) => {
                if (err) throw err;
              });
            //Resize files before storing
            

            const upload = await processUpload(file);
            await File.create(upload);
            const {errors, valid} = validateContractorInput(firstName, lastName, email, phoneNumber)
            if(!valid) {
                throw new UserInputError("Errors",{errors})
                
            }
            const newContractor= new Contractor({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                email: email,
                image: upload.path
            })
            const contractor= await newContractor.save()
            return contractor
        },
        uploadFile: async (_, { file }) => {
           mkdir("images", { recursive: true }, err => {
              if (err) throw err;
            });          
            const upload = await processUpload(file);
            await File.create(upload);
            return upload;
          },

    }
}
