import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { User } from './User.jsx'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../api/users.js'
import { useSocket } from '../contexts/SocketIOContext.jsx'

export function Header() {
  const [token, setToken] = useAuth()
  const { socket } = useSocket()
  const { sub } = token ? jwtDecode(token) : {}
  const userInfoQuery = useQuery({
    queryKey: ['users', sub],
    queryFn: () => getUserInfo(sub),
    enabled: Boolean(sub),
  })
  const userInfo = userInfoQuery.data

  // handle log out: disconnect fromm socket and set token to null
  const handleLogout = () => {
    socket.disconnect()
    setToken(null)
  }

  if (token && userInfo) {
    return (
      <div>
        <span>
          Logged in as <User {...userInfo} />
        </span>
        <button id='logout' onClick={handleLogout}>
          Log Out
        </button>
        <hr />
      </div>
    )
  }
  return (
    <div>
      <h1>Welcome to the recipe blog!</h1>
      <Link to='/signup'>Sign Up</Link> | <Link to='/login'>Log In</Link>
    </div>
  )
}
