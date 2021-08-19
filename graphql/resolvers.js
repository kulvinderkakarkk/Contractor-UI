const {GraphQLUpload,graphqlUploadExpress} = require('graphql-upload');
const gql = require('graphql-tag')
const  {shortid} =require('shortid');
const { createWriteStream, mkdir } =require("fs");
const Contractor = require('../models/Contractor')
var mongoose = require('mongoose');
const File=require('../models/File')
const storeUpload = async ({ stream, filename, mimetype }) => {
    const id = shortid.generate();
    const path = `images/${id}-${filename}`;
    // (createWriteStream) writes our file to the images directory
    return new Promise((resolve, reject) =>
      stream
        .pipe(createWriteStream(path))
        .on("finish", () => resolve({ id, path, filename, mimetype }))
        .on("error", reject)
    );
  };
const processUpload = async (upload) => {
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
    Mutation: {
        insertContractor: async(_, {contractorInput:{firstName, lastName, phoneNumber, email}, file })=> {
            /*mkdir("images", { recursive: true }, (err) => {
                if (err) throw err;
              });
            const upload = await processUpload(file);
            console.log(upload)
            await File.create(upload);*/
            const newContractor= new Contractor({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                email: email
            })
            const contractor= await newContractor.save()
            return contractor
        }
    }
}
