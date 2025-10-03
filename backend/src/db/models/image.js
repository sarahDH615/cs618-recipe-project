import mongoose, { Schema } from 'mongoose'

const imageSchema = new Schema({
  filename: { type: String, required: true },
  filecontents: { type: File, required: true },
})
export const Image = mongoose.model('image', imageSchema)
