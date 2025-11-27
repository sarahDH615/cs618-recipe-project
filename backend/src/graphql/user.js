import { listRecipesByAuthor } from '../services/recipes.js'

export const userSchema = `#graphql
  type User {
    username: String!
    userId: String!
    recipes: [Recipe!]!
  }
`

export const userResolver = {
  User: {
    recipes: async (user) => {
      return await listRecipesByAuthor(user.username)
    },
  },
}
