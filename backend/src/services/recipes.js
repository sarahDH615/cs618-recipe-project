import { Recipe } from '../db/models/recipe.js'

export async function createRecipe({ title, ingredients, image }) {
  const recipe = new Recipe({ title, ingredients, image })
  return await recipe.save()
}

// list recipes according on query passed in with sorting
async function listRecipes(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Recipe.find(query).sort({ [sortBy]: sortOrder })
}
// list all recipes by calling listRecipes() with empty query
export async function listAllRecipes(options) {
  return await listRecipes({}, options)
}
// list posts by title by passing in title as query to listRecipes()
export async function listRecipesByTitle(title, options) {
  return await listRecipes({ title }, options)
}
// list recipes by ingredient by passing in ingredients as query to listRecipes()
export async function listRecipesByIngredient(ingredients, options) {
  return await listRecipes({ ingredients }, options)
}
// get recipes using id
export async function getRecipeById(recipeId) {
  return await Recipe.findById(recipeId)
}
// update a post
export async function updateRecipe(recipeId, { title, ingredients, image }) {
  return await Recipe.findOneAndUpdate(
    { _id: recipeId },
    { $set: { title, ingredients, image } },
    { new: true },
  )
}
// delete a post
export async function deleteRecipe(recipeId) {
  return await Recipe.deleteOne({ _id: recipeId })
}
