import jwt from 'jsonwebtoken'
import { getUserInfoById } from './services/users.js'

export function handleSocket(io) {
  // middleware layer before requests are completed
  io.use((socket, next) => {
    // check whether a token was sent through the auth object
    if (!socket.handshake.auth?.token) {
      console.log('No token provided')
      return next()
      // return next(new Error('Authentication failed: no token provided'))
    }
    // otherwise call jwt.verify to check whether the token is valid
    jwt.verify(
      socket.handshake.auth.token,
      process.env.JWT_SECRET,
      // return error if the token is in valid
      async (err, decodedToken) => {
        if (err) {
          return next(new Error('Authentication failed: invalid token'))
        }
        // otherwise save the decoded token to socket.auth
        socket.auth = decodedToken
        // console.log(`socket auth: ${socket.auth}`)
        // fetch the user information from the database and store it in socket.user
        socket.user = await getUserInfoById(socket.auth.sub)
        return next()
      },
    )
  })
  // on connection...
  io.on('connection', (socket) => {
    // ... print a message
    // console.log('user connected:', socket.id)
    console.log('user connected:', socket.user.username)
    // ... attach a disconnection handler to print a message on disconnect
    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.user.username)
    })
    // ... attach a handler for recipe.notif
    socket.on('recipe.notif', (notification) => {
      // print the message sent by the client
      console.log(`${socket.user.username}: ${JSON.stringify(notification)}`)
      // broadcast a message to all clients
      // io.emit('recipe.notif', {
      //     username: socket.user.username,
      //     notification,
      // })
      // alt: send to all but the one who sent it
      socket.broadcast.emit('recipe.notif', {
        username: socket.user.username,
        notification,
      })
    })
    // handler for user.info request
    socket.on('user.info', async (socketId, callback) => {
      const sockets = await io.in(socketId).fetchSockets()
      if (sockets.length === 0) {
        return callback(null)
      }
      const socket = sockets[0]
      const userInfo = {
        socketId,
        rooms: Array.from(socket.rooms),
        // user: socket.user,
      }
      return callback(userInfo)
    })
  })
}
