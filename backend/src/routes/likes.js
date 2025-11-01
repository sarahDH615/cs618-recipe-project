import {
  addLike,
  removeLike,
  countLikes,
  userHasLiked,
} from '../services/likes.js'

import { requireAuth } from '../middleware/jwt.js'
// import { useRevalidator } from 'react-router-dom'

export function likesRoutes(app) {
  // get count of likes for a recipe
  app.get('/api/v1/likes/:id', async (req, res) => {
    try {
      const likes = await countLikes(req.params.id)
      if (likes === null) {
        return res.status(404).end()
      }
      return res.json(likes)
    } catch (err) {
      console.error('error getting count of likes: ', err)
      return res.status(500).end()
    }
  })
  // check whether a user has liked a recipe
  app.get('/api/v1/likes/:id/:userid', async (req, res) => {
    const hasLiked = await userHasLiked(req.params.userid, req.params.id)
    return res.json(hasLiked)
  })
  // add a like
  app.post('/api/v1/likes/:id', requireAuth, async (req, res) => {
    try {
      const like = await addLike(req.auth.sub, req.params.id)
      return res.json(like)
    } catch (err) {
      console.error('error adding like: ', err)
      return res.status(500).end()
    }
  })
  // delete a like
  app.delete('/api/v1/likes/:id', requireAuth, async (req, res) => {
    try {
      const { deletedCount } = await removeLike(req.auth.sub, req.params.id)
      if (deletedCount === 0) {
        return res.sendStatus(404)
      }
      return res.status(204).end()
    } catch (err) {
      console.error('error deleting like: ', err)
      return res.status(500).end()
    }
  })
}
