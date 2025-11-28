import {
  getRecipeById,
  listRecipesByAuthor,
  listRecipesByIngredient,
  listAllRecipes,
} from '../services/recipes.js'
import { countLikes, userHasLiked } from '../services/likes.js'

// syntax for queries
export const querySchema = `#graphql
input RecipesOptions {
    sortBy: String
    sortOrder: String
  }  
type Query {
    recipes(options: RecipesOptions): [Recipe!]!
    recipesByAuthor(username: String!, options: RecipesOptions): [Recipe!]!
    recipesByIngredient(ingredient: String!, options: RecipesOptions): [Recipe!]!
    recipeById(id: ID!): Recipe
    userHasLikedRecipe(userId: ID!, recipeId: ID!): Boolean
    countLikes(id: ID!): Int
  }
`

// functions that underlie the queries
// parent as output of any previous queries
export const queryResolver = {
  Query: {
    recipes: async (parent, { options }) => {
      return await listAllRecipes(options)
    },
    recipesByAuthor: async (parent, { username, options }) => {
      return await listRecipesByAuthor(username, options)
    },
    recipesByIngredient: async (parent, { ingredient, options }) => {
      return await listRecipesByIngredient(ingredient, options)
    },
    recipeById: async (parent, { id }) => {
      return await getRecipeById(id)
    },
    userHasLikedRecipe: async (parent, { userId, recipeId }) => {
      return await userHasLiked(userId, recipeId)
    },
    countLikes: async (parent, { id }) => {
      return await countLikes(id)
    },
  },
}
