import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { User } from './User.jsx'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../api/users.js'

export function Header() {
  const [token, setToken] = useAuth()
  const { sub } = token ? jwtDecode(token) : {}
  const userInfoQuery = useQuery({
    queryKey: ['users', sub],
    queryFn: () => getUserInfo(sub),
    enabled: Boolean(sub),
  })
  const userInfo = userInfoQuery.data

  if (token && userInfo) {
    return (
      <div>
        <span>
          Logged in as <User {...userInfo} />
        </span>
        <button id='logout' onClick={() => setToken(null)}>
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
