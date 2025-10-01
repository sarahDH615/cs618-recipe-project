import { Recipe } from '../db/models/recipe.js'
import { User } from '../db/models/user.js'

export async function createRecipe(userId, { title, ingredients, image }) {
  const recipe = new Recipe({ title, author: userId, ingredients, image })
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
export async function listRecipesByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listRecipes({ author: user._id }, options)
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
// update a recipe
export async function updateRecipe(
  userId,
  recipeId,
  { title, ingredients, image },
) {
  return await Recipe.findOneAndUpdate(
    { _id: recipeId, author: userId },
    { $set: { title, ingredients, image } },
    { new: true },
  )
}
// delete a recipe
export async function deleteRecipe(userId, recipeId) {
  return await Recipe.deleteOne({ _id: recipeId, author: userId })
}
