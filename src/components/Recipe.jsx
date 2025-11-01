import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { User } from './User.jsx'
import { Like } from '../components/Like.jsx'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { EditRecipe } from './EditRecipe.jsx'
import { DeleteRecipe } from './DeleteRecipe.jsx'
// import { useEffect, useState } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import slug from 'slug'
// import { checkIfLiked, updateLike } from '../api/likes.js'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useQuery, useMutation } from '@tanstack/react-query'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { updateRecipe } from './api/recipes.js'

// export function Recipe({ title, ingredients, image, author, id, authorId, fullRecipe = false }) {
export function Recipe({
  title,
  ingredients,
  image,
  author,
  _id,
  likeCount,
  fullRecipe = false,
}) {
  // if(fullRecipe){
  //   console.log(`full recipe: RECIPE LIKE COUNT: ${likeCount}`)
  // }
  const [token] = useAuth()
  const [statusIsEdit, setStatusIsEdit] = useState(false)
  const [statusIsDelete, setStatusIsDelete] = useState(false)
  const { sub } = token ? jwtDecode(token) : { sub: '' } // decode to get the payload if logged in
  // const authorIsUser = sub == authorId
  const authorIsUser = sub == author
  // const userLikesRecipeQuery = useQuery({
  //   queryKey: ['like', { _id, sub }], // the endpoint it reads and the params it passes to it
  //   queryFn: () => checkIfLiked(_id, sub), // the function it calls to read the endpoint
  // })
  // const initialLikedStatus = userLikesRecipeQuery.data ?? false
  // const [likes, setLikes] = useState(likeCount)
  // const [isLiked, setIsLiked] = useState(initialLikedStatus)

  // const queryClient = useQueryClient()
  // if  likes have changed since last page re-load, update the recipe with the new title
  // and add/remove the like
  // const updateLikeMutation = useMutation({
  //   mutationFn: async (action) => updateLike( _id, token, action ),
  //   onSuccess: queryClient.invalidateQueries(['recipes']),
  // })
  // const updateLikeMutation = useMutation({
  //   mutationFn: async (action) => await updateLike( _id, token, action ),
  //   onSuccess: () => updateCountMutation.mutate(),
  // })
  // // // MOSTLY WORKS
  // const updateLikeMutation = useMutation({
  //   mutationFn: (action) => updateLike(_id, token, action),
  //   onSuccess: (data) => data,
  // })
  // // // -- MOSTLY WORKS
  // const updateLikeMutation = useMutation({
  //   mutationFn: () => (action) => updateLike(_id, token, action),
  //   onSuccess: queryClient.invalidateQueries(['recipes']),
  // })

  // const updateCountMutation = useMutation({
  //   mutationFn: () => updateRecipe(token, { title, ingredients, image, likeCount: likes }),
  //   onSuccess: queryClient.invalidateQueries(['recipes']),
  // })

  // useEffect(() => {
  //   // -- SETUP FUNCTION
  //   // set 1 second wait, after which the mutation function will run
  //   let timeout = setTimeout(() => {
  //     timeout = null
  //   }, 1000)
  //   // --
  //   // CLEANUP FUNCTION : ie, when user leaves the page
  //   return () => {
  //     if (timeout) {
  //       clearTimeout(timeout)
  //     } else {
  //       console.log(`updating recipe to show ${likes} likes`)
  //       updateCountMutation.mutate()
  //     }
  //   }
  //   // --
  // }, [likes]) // dependencies: when isLiked changes
  // const queryClient = useQueryClient()
  // const editLikeMutation = useMutation({
  //   mutationFn: () => createRecipe(token, { title, ingredients, image, likes }),
  //   onSuccess: () => queryClient.invalidateQueries(['recipes']), // means only the recipes part of the page will update
  // })
  // need to add in like counts
  // need to store whether the user has liked this recipe -- store on user or on recipe? probably user
  // like count should be stored on recipe, or a separate table

  const handleDeleteRequest = async () => {
    console.log(`Delete request for recipe id ${_id}`)
    setStatusIsDelete(true)
  }

  const handleDeleteSubmission = async () => {
    console.log(`After delete request for recipe id ${_id}`)
    setStatusIsDelete(false)
  }

  const handleEditRequest = () => {
    console.log(`Edit request for recipe id ${_id}`)
    setStatusIsEdit(true)
  }

  const handleEditSubmission = async () => {
    console.log(`After edit request for recipe id ${_id}`)
    setStatusIsEdit(false)
  }

  // const handleLikeClick = () => {
  //   // saved to variable so that it can be used,
  //   // see https://react.dev/reference/react/useState#ive-updated-the-state-but-logging-gives-me-the-old-value
  //   let opposite = !isLiked
  //   console.log(`opposite of is liked: ${opposite}`)
  //   setIsLiked(opposite)
  //   if (opposite) {
  //     setLikes(likes + 1)
  //     updateLikeMutation.mutate('add')
  //   } else {
  //     setLikes(likes - 1)
  //     updateLikeMutation.mutate('remove')
  //   }
  //   console.log(`Updated likes count: ${likes}`)
  // }

  return (
    <article>
      {fullRecipe ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/recipes/${_id}/${slug(title)}`}>
          <h3>{title}</h3>
        </Link>
      )}
      {fullRecipe && (
        <div className='ingredient-list'>
          <ul>
            {ingredients.map((i) => (
              <Fragment key={ingredients.indexOf(i)}>
                <li>{i}</li>
              </Fragment>
            ))}
          </ul>
        </div>
      )}
      {fullRecipe && image && (
        <div>
          <img className='recipe-image' src={`${image}`} alt='recipe' />
        </div>
      )}
      {author && (
        <em>
          {/* Written by <User {...author} /> */}
          Written by <User id={author} />
        </em>
      )}
      {/* userId == sub */}
      {fullRecipe && authorIsUser && (
        <>
          <br />
          <br />
          <button
            disabled={statusIsEdit || statusIsDelete}
            type='button'
            id='delete'
            onClick={handleDeleteRequest}
          >
            Delete
          </button>
          <button
            disabled={statusIsEdit || statusIsDelete}
            type='button'
            id='edit'
            onClick={handleEditRequest}
          >
            Edit
          </button>
        </>
      )}
      {fullRecipe && statusIsEdit && (
        <EditRecipe
          id={_id}
          title={title}
          ingredients={ingredients}
          image={image}
          token={token}
          handleEdit={handleEditRequest}
          handleCompleteSubmit={handleEditSubmission}
        />
      )}
      {fullRecipe && statusIsDelete && (
        <DeleteRecipe
          id={_id}
          token={token}
          handleCompleteSubmit={handleDeleteSubmission}
        />
      )}
      {/* <Like recipeId={_id} fullRecipe={fullRecipe} /> */}
      <Like
        recipe={{ title, ingredients, image, likeCount, recipeId: _id }}
        fullRecipe={fullRecipe}
      />
    </article>
  )
}

Recipe.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  author: PropTypes.string,
  likeCount: PropTypes.number,
  fullRecipe: PropTypes.bool,
}
