import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { User } from './User.jsx'

export function Header() {
  const [token, setToken] = useAuth()
  if (token) {
    const { sub } = jwtDecode(token) // decode to get the payload
    return (
      <div>
        <p>
          Logged in as <User id={sub} />
        </p>
        <button onClick={() => setToken(null)}>Log Out</button>
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
