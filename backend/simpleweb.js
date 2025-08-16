import { createServer } from 'node:http'
// createServer is async, requires a callback
// ignoring res for now, returning a static response
const server = createServer((req, res) => {
  res.statusCode = 200 // success code
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello HTTP world') // will return this message
})
// listening on host and port
const host = 'localhost'
const port = 3000
// server.listen is also async
server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`)
})
