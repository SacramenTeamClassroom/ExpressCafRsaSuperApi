import mongoose, { Schema } from 'mongoose'

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

const model = mongoose.model('BasRevenue', basRevenueSchema)

export const schema = model.schema
export default model
