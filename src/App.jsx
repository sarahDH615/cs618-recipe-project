import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import PropTypes from 'prop-types'
import { HelmetProvider } from 'react-helmet-async'
import { ApolloProvider } from '@apollo/client/react/index.js'
import { ApolloClient, InMemoryCache } from '@apollo/client/core/index.js'
// import { io } from 'socket.io-client'
import { SocketIOContextProvider } from './contexts/SocketIOContext.jsx'

// // socket event comms
// const socket = io(import.meta.env.VITE_SOCKET_HOST)
// socket.on('connect', async () => {
//   console.log('connected to socket.io as', socket.id)
//   socket.emit('chat.message', 'hello from client')
//   // emitWithAck takes a message name, then args, the last of which is a callback
//   // no specific callback specified here, just an arg, the socket id
//   // so it just returns the results of the emitWithAck overall function
//   // returns a Promise that can be awaited
//   const userInfo = await socket.emitWithAck('user.info', socket.id)
//   console.log('user info:', userInfo)
// })
// socket.on('connect_error', (err) => {
//   // console.error('socket.io connect error:', err)
//   console.log('error')
// })
// // listener for messages from the server
// socket.on('chat.message', (msg) => {
//   console.log(`${msg.username}: ${msg.message}`)
// })

// client for graphql interaction
const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  cache: new InMemoryCache(),
})

// client to call the backend
const queryClient = new QueryClient()

export function App({ children }) {
  return (
    <HelmetProvider>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <SocketIOContextProvider>{children}</SocketIOContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </HelmetProvider>
  )
}
App.propTypes = {
  children: PropTypes.element.isRequired,
}
