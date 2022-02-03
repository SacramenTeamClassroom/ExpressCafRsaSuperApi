import mongoose, { Schema } from 'mongoose'

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

const model = mongoose.model('Rsa', rsaSchema)

export const schema = model.schema
export default model
