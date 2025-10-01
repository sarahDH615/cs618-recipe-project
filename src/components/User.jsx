import { useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { getUserInfo } from '../api/users'

export function User({ id }) {
  const userInfoQuery = useQuery({
    // calls the db
    queryKey: ['users', id],
    queryFn: () => getUserInfo(id),
  })
  const userInfo = userInfoQuery.data ?? {}
  return <strong>{userInfo?.username ?? id}</strong> // returns the username if possible, else id
}
User.propTypes = {
  id: PropTypes.string.isRequired,
}
