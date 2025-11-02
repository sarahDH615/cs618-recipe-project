import PropTypes from 'prop-types'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
// import { useEffect, useState } from 'react'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useQuery, useMutation } from '@tanstack/react-query'
import { checkIfLiked, updateLike, getLikes } from '../api/likes.js'
import { updateRecipe } from '../api/recipes.js'
// import { getRecipeById } from '../api/recipes.js'

// export function Like({ recipeId, fullRecipe }) {
export function Like({ recipe, fullRecipe }) {
  const [token] = useAuth()
  // const { recipeId, title, ingredients, image, likeCount } = { ...recipe }
  const { recipeId, title, ingredients, image } = { ...recipe }
  // console.log(`token check ${token} -- is null? : ${token === null}`)
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
  const updateCountMutation = useMutation({
    mutationFn: () => {
      updateRecipe(token, recipeId, {
        title: title,
        ingredients: ingredients,
        image: image,
        likeCount: likes,
      })
    },
    onSuccess: queryClient.invalidateQueries(['recipes']),
  })
  // const recipeQuery = useQuery({
  //   queryKey: ['recipe', recipeId], // the endpoint it reads and the params it passes to it
  //   queryFn: () => getRecipeById(recipeId), // the function it calls to read the endpoint
  // })

  // useEffect(() => {
  //   // -- SETUP FUNCTION
  //   setLikes(likes)
  //   if (likes !== likeCount) {
  //     console.log(
  //       `likes (${likes}) and like count (${likeCount}) do not match for ${title}`,
  //     )
  //     if (token) {
  //       console.log(`sending request to update the count`)
  //       updateCountMutation.mutate()
  //       if(recipeQuery.data){
  //         console.log(`refetched recipe: ${JSON.stringify(recipeQuery.data)}`)
  //       }
  //     }
  //   }
  //   // --
  //   // CLEANUP FUNCTION : ie, when user leaves the page
  //   return () => {
  //     setLikes(likes)
  //   }
  //   // --
  // }, [likes, fullRecipe]) // dependencies: when like number or view changes

  const renderLikeCount = () => {
    if (likes > 999) {
      ;`${likes / 1000} K`
    }
    return likes
  }

  // const likedButtonClass = () => {
  //   if(fullRecipe){
  //     if(token){
  //       // logged in on full recipe page
  //       if(isLiked){
  //         return 'like-btn liked'
  //       }
  //       else { return 'like-btn enabled' }
  //     }
  //   }
  //   // on summary page
  //   else{
  //     // logged in: show liked status and text popup
  //     if(token){
  //       if(isLiked){
  //         return 'like-btn liked-disabled'
  //       }
  //       else{
  //         return 'like-btn'
  //       }
  //     }
  //   }
  //   return 'like-btn inactive' // default
  // }

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
    updateLikeMutation.mutate(action) // update likes table
    if (token) {
      updateCountMutation.mutate() // update recipes table
    }
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

// Like.propTypes = {
//   recipeId: PropTypes.string.isRequired,
//   fullRecipe: PropTypes.bool,
// }
Like.propTypes = {
  recipe: PropTypes.object.isRequired,
  fullRecipe: PropTypes.bool,
}
