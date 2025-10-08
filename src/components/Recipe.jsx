import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { User } from './User.jsx'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { deleteRecipe } from '../api/recipes.js'
import { EditRecipe } from './EditRecipe.jsx'
import { useState } from 'react'

export function Recipe({ _id, title, ingredients, image, author: userId }) {
  const [token] = useAuth()
  const [editStatus, setEditStatus] = useState(false)
  const { sub } = token ? jwtDecode(token) : { sub: '' } // decode to get the payload if logged in

  const handleDeleteRequest = () => {
    console.log(`Delete request for post id ${_id}`)
    deleteRecipe(token, _id)
  }

  const handleEditRequest = () => {
    console.log(`Edit request for post id ${_id}`)
    setEditStatus(true)
  }

  const handleEditSubmission = async () => {
    console.log(`After edit request for post id ${_id}`)
    setEditStatus(false)
  }

  return (
    <article>
      <h3>{title}</h3>
      <div className='ingredient-list'>
        <ul>
          {ingredients.map((i) => (
            <Fragment key={ingredients.indexOf(i)}>
              <li>{i}</li>
            </Fragment>
          ))}
        </ul>
      </div>
      {image && (
        <div>
          <img className='recipe-image' src={`${image}`} alt='recipe' />
        </div>
      )}
      {userId && (
        <em>
          <br />
          <br />
          Written by <User id={userId} />
        </em>
      )}
      {userId && userId === sub && (
        <>
          <br />
          <br />
          <button type='button' id='delete' onClick={handleDeleteRequest}>
            Delete
          </button>
          <button type='button' id='edit' onClick={handleEditRequest}>
            Edit
          </button>
        </>
      )}
      {editStatus && (
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
    </article>
  )
}

Recipe.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  author: PropTypes.string,
}
