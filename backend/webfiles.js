import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'

// createServer is async, requires a callback
// ignoring res for now, returning a static response
const server = createServer((req, res) => {
  res.statusCode = 200 // success code
  res.setHeader('Content-Type', 'application/json')
  res.end(readFileSync('backend/users.json'))
})
// listening on host and port
const host = 'localhost'
const port = 3000
// server.listen is also async
server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`)
})
