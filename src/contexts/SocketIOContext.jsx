import { createContext, useState, useContext, useEffect } from 'react'
import { io } from 'socket.io-client'
import PropTypes from 'prop-types'
import { useAuth } from './AuthContext.jsx'
import { jwtDecode } from 'jwt-decode'

export const SocketIOContext = createContext({
  socket: null,
  status: 'waiting',
  error: null,
})
// export const SocketIOContext = createContext({
//   socket: null,
//   error: null,
// })

export const SocketIOContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [status, setStatus] = useState('waiting')
  const [error, setError] = useState(null)
  const [token] = useAuth()

  useEffect(() => {
    // if token exists, attempt to connect to the backend
    if (token) {
      const { sub } = token ? jwtDecode(token) : { sub: '' } // decode to get the payload if logged in

      const socket = io(import.meta.env.VITE_SOCKET_HOST, {
        query: window.location.search.substring(1),
        auth: { token },
      })
      socket.on('connect', () => {
        setStatus('connected')
        setError(null)
        console.log(`user ${sub} connected`)
      })
      socket.on('connect_error', (err) => {
        setStatus('error')
        setError(err)
      })
      socket.on('disconnect', () => {
        console.log('disconnected')
      })
      // socket.on('recipe.notif', (notification) => {
      //   console.log(`Received a notification: ${JSON.stringify(notification)}`)
      // })

      setSocket(socket)
    }
  }, [token, setSocket, setStatus, setError])
  // }, [token, setSocket, setError])
  return (
    <SocketIOContext.Provider value={{ socket, status, error }}>
      {children}
    </SocketIOContext.Provider>
    // <SocketIOContext.Provider value={{ socket, error }}>
    //   {children}
    // </SocketIOContext.Provider>
  )
}

SocketIOContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
}
export function useSocket() {
  return useContext(SocketIOContext)
}
