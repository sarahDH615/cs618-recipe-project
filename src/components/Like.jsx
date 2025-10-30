// import { useQuery } from '@tanstack/react-query'
// import PropTypes from 'prop-types'
// import { getLikes, checkIfLiked } from '../api/likes.js'

// export function Like({ postId, userId }) {
//   const totalLikesQuery = useQuery({
//     // calls the db
//     queryKey: ['like', postId],
//     queryFn: () => getLikes(postId),
//   })

//   const isLikedByUserQuery = useQuery({
//     // calls the db
//     queryKey: ['like', { postId, userId }],
//     queryFn: () => checkIfLiked(postId, userId),
//   })
//   const userInfo = userInfoQuery.data ?? {}
//   return <strong>{userInfo?.username ?? id}</strong> // returns the username if possible, else id
// }
// User.propTypes = {
//   id: PropTypes.string.isRequired,
// }
