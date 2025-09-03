import express from 'express'
import { recipesRoutes } from './routes/recipes.js'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express() // create express instance
// middleware - these must be added before calling the routes, else they will not work correctly
app.use(cors())
app.use(bodyParser.json()) // intercepts the requests and converts them to json
recipesRoutes(app) // call recipesRoutes with express instance as param

// default route
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})
export { app }
