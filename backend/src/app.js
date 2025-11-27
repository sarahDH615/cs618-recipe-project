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
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { handleSocket } from './socket.js'

// apollo server for interaction with the database through graphql
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

const app = express() // create express instance
// middleware - these must be added before calling the routes, else they will not work correctly
app.use(cors())
app.use(bodyParser.json()) // intercepts the requests and converts them to json

// start the apollo server with optional authentication
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

// io server for event functionality
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})
handleSocket(io)

// default route
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})
// export { app }
export { server as app }
