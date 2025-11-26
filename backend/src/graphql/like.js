import { getUserInfoById } from '../services/users.js'

export const likeSchema = `#graphql
  type Like {
    likeId: ID!  
    recipe: String!
    user: String!
    createdAt: Float
    updatedAt: Float
  }
`

export const likeResolver = {
  Like: {
    user: async (like) => {
      return await getUserInfoById(like.user)
    },
  },
}
