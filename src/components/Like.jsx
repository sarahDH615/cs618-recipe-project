import PropTypes from 'prop-types'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useEffect, useState } from 'react'
// import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useQuery, useMutation } from '@tanstack/react-query'
import { checkIfLiked, updateLike, getLikes } from '../api/likes.js'
import { getRecipeById } from '../api/recipes.js'

export function Like({ recipeId, fullRecipe }) {
  const [token] = useAuth()
  const recipeQuery = useQuery({
    queryKey: ['recipe', { recipeId }],
    queryFn: () => getRecipeById(recipeId),
  })
  const recipeInfo = recipeQuery.data ?? false
  const recipeTitle = recipeInfo ? recipeInfo.title : recipeId
  const { sub } = token ? jwtDecode(token) : { sub: '' } // decode to get the payload if logged in
  const userLikesRecipeQuery = useQuery({
    queryKey: ['like', { recipeId, sub }],
    queryFn: () => checkIfLiked(recipeId, sub),
  })
  const totalLikesQuery = useQuery({
    queryKey: ['likes', recipeId],
    queryFn: () => getLikes(recipeId),
  })
  const initialLikedStatus = userLikesRecipeQuery.data ?? false
  const initialTotalLikes = totalLikesQuery.data ?? 0
  const [likes, setLikes] = useState(initialTotalLikes)
  const [isLiked, setIsLiked] = useState(initialLikedStatus)

  // // // MOSTLY WORKS
  const queryClient = useQueryClient()
  const updateLikeMutation = useMutation({
    mutationFn: (action) => updateLike(recipeId, token, action),
    onSuccess: () => queryClient.invalidateQueries(['likes', recipeId]),
    // onSuccess: (data) => data,
  })
  // // // -- MOSTLY WORKS
  useEffect(() => {
    // -- SETUP FUNCTION
    // const setupLikesQuery = useQuery({
    //     queryKey: ['likes', recipeId],
    //     queryFn: () => getLikes(recipeId),
    // })
    const setupLikesCheck = totalLikesQuery.data ?? 0
    setLikes(likes)
    console.log(
      `Setup function: like count for ${recipeTitle} in ${
        fullRecipe ? 'full' : 'summary'
      } view is ${likes}. Likes check: ${setupLikesCheck}`,
    )
    // console.log(`Setup function: like count for ${recipeTitle} in ${fullRecipe ? 'full' : 'summary'} view is ${likes}. Likes check: ${setupLikesCheck}`)

    // --
    // CLEANUP FUNCTION : ie, when user leaves the page
    return () => {
      // const cleanupLikesQuery = useQuery({
      //     queryKey: ['likes', recipeId],
      //     queryFn: () => getLikes(recipeId),
      // })
      const cleanupLikesCheck = totalLikesQuery.data ?? 0
      setLikes(likes)
      console.log(
        `Cleanup function: like count for ${recipeTitle} in ${
          fullRecipe ? 'full' : 'summary'
        } view is ${likes}. Likes check: ${cleanupLikesCheck}`,
      )
      // console.log(`Cleanup function: like count for ${recipeTitle} in ${fullRecipe ? 'full' : 'summary'} view is ${likes}. Likes check: ${cleanupLikesCheck}`)
    }
    // --
  }, [likes, fullRecipe]) // dependencies: when like number or view changes

  const renderLikeCount = () => {
    console.log(
      `Rendering like count for recipe ${recipeTitle}: like count is ${likes}`,
    )
    if (likes > 999) {
      ;`${likes / 1000} K`
    }
    return likes
  }

  const handleLikeClick = () => {
    // saved to variable so that it can be used,
    // see https://react.dev/reference/react/useState#ive-updated-the-state-but-logging-gives-me-the-old-value
    let opposite = !isLiked
    console.log(`opposite of is liked: ${opposite}`)
    setIsLiked(opposite)
    let newLikeCount, action
    if (opposite) {
      // setLikes(likes + 1)
      // updateLikeMutation.mutate('add')
      newLikeCount = likes + 1
      action = 'add'
    } else {
      // setLikes(likes - 1)
      // updateLikeMutation.mutate('remove')
      newLikeCount = likes - 1
      action = 'remove'
    }
    console.log(
      `${action} action with new like count of ${newLikeCount} from ${likes}`,
    )
    setLikes(newLikeCount)
    updateLikeMutation.mutate(action)
    console.log(`Updated likes count: ${likes}`)
  }

  return (
    <div>
      <button
        type='button'
        className={
          isLiked
            ? 'like-btn liked'
            : fullRecipe && token
              ? 'like-btn enabled'
              : 'like-btn inactive'
        }
        disabled={!(fullRecipe && token)}
        onClick={handleLikeClick}
      >
        <i className='fas fa-thumbs-up'>
          <span className='like-btn-hover-text'>
            {`${token ? 'Click on recipe' : 'Log in'} to like/unlike`}
          </span>
        </i>
      </button>
      {/* <span>{likes > 999 ? `${likes / 1000} K` : likes}</span> */}
      <span>{renderLikeCount()}</span>
    </div>
  )
}

Like.propTypes = {
  recipeId: PropTypes.string.isRequired,
  fullRecipe: PropTypes.bool,
}
