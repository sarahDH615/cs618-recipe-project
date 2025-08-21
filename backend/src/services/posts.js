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
