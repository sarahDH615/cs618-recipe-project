import { app } from './app.js'
import dotenv from 'dotenv'
import { initDatabase } from './db/init.js'

dotenv.config() // allow env var access

const PORT = process.env.PORT // read port from the env vars

await initDatabase() // initialise the db
// listen on the port
app.listen(PORT)
console.info(`express server running on http://localhost:${PORT}`)
