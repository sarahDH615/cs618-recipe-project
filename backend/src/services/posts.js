import { Post } from '../db/models/post.js'

export async function createPost({ title, author, contents, tags }) {
  const post = new Post({ title, author, contents, tags })
  return await post.save()
}

// list posts according on query passed in with sorting
async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}
// list all posts by calling listPosts() with empty query
export async function listAllPosts(options) {
  return await listPosts({}, options)
}
// list posts by author by passing in author as query to listPosts()
export async function listPostsByAuthor(author, options) {
  return await listPosts({ author }, options)
}
// list posts by tags by passing in tags as query to listPosts()
export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}
// get posts using id
export async function getPostById(postId) {
  return await Post.findById(postId)
}
// update a post
export async function updatePost(postId, { title, author, contents, tags }) {
  return await Post.findOneAndUpdate(
    { _id: postId },
    { $set: { title, author, contents, tags } },
    { new: true },
  )
}
// delete a post
export async function deletePost(postId) {
  return await Post.deleteOne({ _id: postId })
}
