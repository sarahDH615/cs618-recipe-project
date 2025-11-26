import { GraphQLError } from 'graphql'
import { createUser, loginUser } from '../services/users.js'
import { createRecipe } from '../services/recipes.js'
import { addLike, removeLike } from '../services/likes.js'

export const mutationSchema = `#graphql
    type Mutation {
        signupUser(username: String!, password: String!): User
        loginUser(username: String!, password: String!): String
        createRecipe(title: String!, ingredients: [String], image: String): Recipe
        addLike(recipeId: ID!): Like
        removeLike(recipeId: ID!): Like
    }
`

export const mutationResolver = {
  Mutation: {
    signupUser: async (parent, { username, password }) => {
      return await createUser({ username, password })
    },
    loginUser: async (parent, { username, password }) => {
      return await loginUser({ username, password })
    },
    createRecipe: async (parent, { title, ingredients, image }, { auth }) => {
      if (!auth) {
        throw new GraphQLError(
          'You need to be authenticated to perform this action.',
          {
            extensions: {
              code: 'UNAUTHORISED',
            },
          },
        )
      }
      return await createRecipe(auth.sub, { title, ingredients, image })
    },
    addLike: async (parent, { recipeId }, { auth }) => {
      if (!auth) {
        throw new GraphQLError(
          'You need to be authenticated to perform this action.',
          {
            extensions: {
              code: 'UNAUTHORISED',
            },
          },
        )
      }
      return await addLike(auth.sub, recipeId)
    },
    removeLike: async (parent, { recipeId }, { auth }) => {
      if (!auth) {
        throw new GraphQLError(
          'You need to be authenticated to perform this action.',
          {
            extensions: {
              code: 'UNAUTHORISED',
            },
          },
        )
      }
      return await removeLike(auth.sub, recipeId)
    },
  },
}
