import mongoose, { Schema } from 'mongoose'

const imageSchema = new Schema({
  image_id: { type: String, required: true },
  image_url: { type: String, required: true },
})
export const Image = mongoose.model('image', imageSchema)
