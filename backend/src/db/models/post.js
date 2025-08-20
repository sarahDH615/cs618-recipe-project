import mongoose, { Schema } from 'mongoose'
// create schema
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: String,
    contents: String,
    tags: [String],
  },
  { timestamps: true }, // add timestamps to each entry
)
// create mongoose model from the schema
// arg 0: the singular of the name of the collection
// arg 2: schema to build the model from
// export to allow use anywhere in the project
export const Post = mongoose.model('post', postSchema)
