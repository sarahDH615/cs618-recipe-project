import express from 'express'

const app = express() // create express instance
// return message for when people call the root path from the api
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})
export { app }
