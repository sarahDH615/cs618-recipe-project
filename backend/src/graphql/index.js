import { querySchema, queryResolver } from './query.js'
import { recipeSchema, recipeResolver } from './recipe.js'
import { userSchema, userResolver } from './user.js'
import { likeSchema, likeResolver } from './like.js'
import { mutationSchema, mutationResolver } from './mutation.js'

export const typeDefs = [
  querySchema,
  recipeSchema,
  userSchema,
  likeSchema,
  mutationSchema,
]
export const resolvers = [
  queryResolver,
  recipeResolver,
  userResolver,
  likeResolver,
  mutationResolver,
]
