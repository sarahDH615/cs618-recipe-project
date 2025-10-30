import { Like } from '../db/models/like.js'

// add a like to the likes table
export async function addLike(userId, postId) {
  const like = new Like({ user: userId, post: postId })
  return await like.save()
}

// delete a like from the likes table
export async function removeLike(userId, postId) {
  return await Like.findOneAndDelete({ post: postId, user: userId })
}

// get count of likes for a recipe
export async function countLikes(postId) {
  const likeCount = await Like.countDocuments({ post: postId })
  // console.log(`like count: ${likeCount}`)
  // return await Like.find({ post: postId }).count()
  // return await Like.countDocuments({ post: postId });
  return likeCount
}

// check whether a user has liked a post
export async function userHasLiked(userId, postId) {
  const potentialLike = await Like.findOne({ user: userId, post: postId })
  // console.log(`Potential like: ${potentialLike}`)
  if (potentialLike) {
    return true
  }
  return false
}
