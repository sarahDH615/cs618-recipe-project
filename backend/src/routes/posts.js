import {
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../services/posts.js'

export function postsRoutes(app) {
  // get all posts
  app.get('/api/v1/posts', async (req, res) => {
    const { sortBy, sortOrder, author, tag } = req.query
    const options = { sortBy, sortOrder }
    try {
      if (author && tag) {
        return res.status(400).json({
          error: 'query by either author or tag, not both',
        })
      } else if (author) {
        return res.json(await listPostsByAuthor(author, options))
      } else if (tag) {
        return res.json(await listPostsByTag(tag))
      } else {
        return res.json(await listAllPosts(options))
      }
    } catch (err) {
      console.error('error listing posts: ', err)
      return res.status(500).end()
    }
  })
  // get one post
  app.get('/api/v1/posts/:id', async (req, res) => {
    const { id } = req.params
    try {
      const post = await getPostById(id)
      if (post === null) {
        return res.status(404).end()
      }
      return res.json(post)
    } catch (err) {
      console.error('error getting post by id: ', err)
      return res.status(500).end()
    }
  })
  // create a post
  app.post('/api/v1/posts', async (req, res) => {
    try {
      const post = await createPost(req.body)
      return res.json(post)
    } catch (err) {
      console.error('error creating post: ', err)
      return res.status(500).end()
    }
  })
  // update a post
  app.patch('/api/v1/posts/:id', async (req, res) => {
    try {
      const post = await updatePost(req.params.id, req.body)
      return res.json(post)
    } catch (err) {
      console.error('error updating post: ', err)
      return res.status(500).end()
    }
  })
  // delete a post
  app.delete('/api/v1/posts/:id', async (req, res) => {
    try {
      const { deletedCount } = await deletePost(req.params.id)
      if (deletedCount === 0) {
        return res.sendStatus(404)
      }
      return res.status(204).end()
    } catch (err) {
      console.error('error deleting post: ', err)
      return res.status(500).end()
    }
  })
}
