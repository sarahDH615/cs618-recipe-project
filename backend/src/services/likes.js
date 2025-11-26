import { Like } from '../db/models/like.js'
import { updateRecipeLikes } from './recipes.js'

// add a like to the likes table
export async function addLike(userId, recipeId) {
  const like = new Like({ user: userId, recipe: recipeId })
  return await like.save()
}

// delete a like from the likes table
export async function removeLike(userId, recipeId) {
  return await Like.findOneAndDelete({ recipe: recipeId, user: userId })
}

// get count of likes for a recipe
export async function countLikes(recipeId) {
  const likeCount = await Like.countDocuments({ recipe: recipeId })
  // update the related recipe every time the like check occurs
  await updateRecipeLikes(recipeId, parseInt(likeCount))
  return likeCount
}

// check whether a user has liked a recipe
export async function userHasLiked(userId, recipeId) {
  const potentialLike = await Like.findOne({ user: userId, recipe: recipeId })
  if (potentialLike) {
    return true
  }
  return false
}
