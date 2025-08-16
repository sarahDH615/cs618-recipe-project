import { createServer } from 'node:http'
import { MongoClient } from 'mongodb'

// db info
const url = 'mongodb://localhost:27017'
const dbName = 'mydb'
const client = new MongoClient(url)

// connect to db
try {
  await client.connect()
  console.log('Successfully connected to database.')
} catch (err) {
  console.error('Error connecting to database:', err)
}

// createServer is async, requires a callback
// ignoring res for now, returning a static response
const server = createServer(async (req, res) => {
  const db = client.db(dbName)
  const users = db.collection('users')
  const usersList = await users.find().toArray()

  res.statusCode = 200 // success code
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(usersList)) // will return this message
})
// listening on host and port
const host = 'localhost'
const port = 3000
// server.listen is also async
server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`)
})
