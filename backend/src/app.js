import express from 'express'
import { recipesRoutes } from './routes/recipes.js'
import { userRoutes } from './routes/users.js'
import { likesRoutes } from './routes/likes.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { typeDefs, resolvers } from './graphql/index.js'
import { optionalAuth } from './middleware/jwt.js'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

const app = express() // create express instance
// middleware - these must be added before calling the routes, else they will not work correctly
app.use(cors())
app.use(bodyParser.json()) // intercepts the requests and converts them to json

// apolloServer
//   .start()
//   .then(() => app.use('/graphql', expressMiddleware(apolloServer)))

// app.use(optionalAuth)

// apolloServer.start().then(() =>
//   app.use(
//     '/graphql',
//     cors(),
//     expressMiddleware(apolloServer, {
//       context: async ({ req }) => {
//         return { auth: req.auth }
//       },
//     }),
//   ),
// )

apolloServer.start().then(() =>
  app.use(
    '/graphql',
    optionalAuth,
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        return { auth: req.auth }
      },
    }),
  ),
)

recipesRoutes(app)
userRoutes(app)
likesRoutes(app)

// default route
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})
export { app }
