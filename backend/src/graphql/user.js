import { listRecipesByAuthor } from '../services/recipes.js'

export const userSchema = `#graphql
  type User {
    userId: ID!
    username: String!
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
