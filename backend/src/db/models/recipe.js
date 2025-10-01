import mongoose, { Schema } from 'mongoose'
// create schema
const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    ingredients: [String],
    image: String,
  },
  { timestamps: true }, // add timestamps to each entry
)
// create mongoose model from the schema
// arg 0: the singular of the name of the collection
// arg 2: schema to build the model from
// export to allow use anywhere in the project
export const Recipe = mongoose.model('recipe', recipeSchema)
