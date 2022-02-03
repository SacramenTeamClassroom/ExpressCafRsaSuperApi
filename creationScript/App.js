/* eslint-disable */
import { readFile } from "fs/promises";
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/caf-rsa-super-api-dev');

const rsaSchema = new Schema({
    codeInsee: {
      type: String,
      unique: true,
      required: true,
      dropDups: true
    },
    commune: {
      type: String,
      unique: true,
      required: true,
      dropDups: true
    },
    nbAllocataires: {
      type: String,
      required: true
    }
  }, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => { delete ret._id }
    }
  })

rsaSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      codeInsee: this.codeInsee,
      commune: this.commune,
      nbAllocataires: this.nbAllocataires,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const modelRSA = mongoose.model('Rsa', rsaSchema)

const schemaRSA = modelRSA.schema;

const basRevenueSchema = new Schema({
    codeInsee: {
      type: String,
      unique: true,
      required: true,
      dropDups: true
    },
    AllocatairesRessortissants: {
      type: String,
      required: true
    },
    PersonnesBasRevenus: {
      type: String,
      required: true
    }
  }, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => { delete ret._id }
    }
  })
  
  basRevenueSchema.methods = {
    view (full) {
      const view = {
        // simple view
        id: this.id,
        codeInsee: this.codeInsee,
        AllocatairesRessortissants: this.AllocatairesRessortissants,
        PersonnesBasRevenus: this.PersonnesBasRevenus,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
  
      return full ? {
        ...view
        // add properties for a full view
      } : view
    }
  }
  
const modelBasRevenue = mongoose.model('BasRevenue', basRevenueSchema)
  
const schemaBasRevenue = modelBasRevenue.schema

async function main() {
    JSON.parse(await readFile('./data/rsa.json')).forEach(o=>modelRSA.create(o));
    JSON.parse(await readFile('./data/basrevenus.json')).forEach(o=>modelBasRevenue.create(o));


}main();

