import mongoose, { Schema } from 'mongoose'
// create schema
const likeSchema = new Schema(
  {
    recipe: { type: Schema.Types.ObjectId, ref: 'recipe', required: true }, // id of the recipe
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  },
  { timestamps: true }, // add timestamps to each entry
)
// create mongoose model from the schema
// arg 0: the singular of the name of the collection
// arg 2: schema to build the model from
// export to allow use anywhere in the project
export const Like = mongoose.model('like', likeSchema)
