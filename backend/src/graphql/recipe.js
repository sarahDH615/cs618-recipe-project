import { getUserInfoById } from '../services/users.js'
import { countLikes } from '../services/likes.js'

export const recipeSchema = `#graphql
  type Recipe {
    id: ID!
    title: String!
    author: User
    image: String
    ingredients: [String!]
    likeCount: Int
    createdAt: Float
    updatedAt: Float
  }
`

export const recipeResolver = {
  Recipe: {
    author: async (recipe) => {
      return await getUserInfoById(recipe.author)
    },
    likeCount: async (recipe) => {
      return await countLikes(recipe.id)
    },
  },
}
