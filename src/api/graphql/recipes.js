import { gql } from '@apollo/client/core/index.js'

export const RECIPE_FIELDS = gql`
  fragment RecipeFields on Recipe {
    id
    title
    author {
      userId
      username
    }
    ingredients
    image
    likeCount
    updatedAt
    createdAt
  }
`

export const GET_RECIPE_IDS = gql`
  query getRecipes($options: RecipesOptions) {
    recipes(options: $options) {
      id
    }
  }
`

export const GET_RECIPES = gql`
  ${RECIPE_FIELDS}
  query getRecipes($options: RecipesOptions) {
    recipes(options: $options) {
      ...RecipeFields
    }
  }
`

export const GET_RECIPES_BY_AUTHOR = gql`
  ${RECIPE_FIELDS}
  query getRecipesByAuthor($author: String!, $options: RecipesOptions) {
    recipesByAuthor(username: $author, options: $options) {
      ...RecipeFields
    }
  }
`

export const CREATE_RECIPE = gql`
  mutation createRecipe(
    $title: String!
    $image: String
    $ingredients: [String!]
  ) {
    createRecipe(title: $title, image: $image, ingredients: $ingredients) {
      id
      title
    }
  }
`
// export const REFRESH_LIKES = gql`
//   mutation refreshLikes($recipeId: ID!) {
//     refreshLikes(recipeId: $recipeId) {
//       id
//       title
//     }
//   }
// `
export const REFRESH_LIKES = gql`
  mutation refreshLikes($recipeId: ID!, $likeCount: Int) {
    refreshLikes(recipeId: $recipeId, likeCount: $likeCount) {
      id
      title
    }
  }
`
