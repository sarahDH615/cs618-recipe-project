import express from 'express'
import { recipesRoutes } from './routes/recipes.js'
import { userRoutes } from './routes/users.js'
import { imageRoutes } from './routes/images.js'
import bodyParser from 'body-parser'
import cors from 'cors'
// import multer from 'multer'

const app = express() // create express instance
// const upload = multer()
// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })
// middleware - these must be added before calling the routes, else they will not work correctly
app.use(cors())
app.use(bodyParser.json()) // intercepts the requests and converts them to json
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(upload.array())
// app.use(upload.single('image'))
recipesRoutes(app) // call recipesRoutes with express instance as param
userRoutes(app)
imageRoutes(app)

// default route
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})
export { app }
