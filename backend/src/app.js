import express from 'express'
import { postsRoutes } from './routes/posts.js'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express() // create express instance
app.use(cors())
app.use(bodyParser.json()) // intercepts the requests and converts them to json
postsRoutes(app) // call postRoutes with express instance as param

// default route
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})
export { app }
