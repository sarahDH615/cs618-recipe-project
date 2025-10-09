import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { User } from './User.jsx'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { EditRecipe } from './EditRecipe.jsx'
import { DeleteRecipe } from './DeleteRecipe.jsx'
import { useState } from 'react'

export function Recipe({ _id, title, ingredients, image, author: userId }) {
  const [token] = useAuth()
  const [statusIsEdit, setStatusIsEdit] = useState(false)
  const [statusIsDelete, setStatusIsDelete] = useState(false)
  const { sub } = token ? jwtDecode(token) : { sub: '' } // decode to get the payload if logged in

  const handleDeleteRequest = async () => {
    console.log(`Delete request for post id ${_id}`)
    setStatusIsDelete(true)
  }

  const handleDeleteSubmission = async () => {
    console.log(`After delete request for post id ${_id}`)
    setStatusIsDelete(false)
  }

  const handleEditRequest = () => {
    console.log(`Edit request for post id ${_id}`)
    setStatusIsEdit(true)
  }

  const handleEditSubmission = async () => {
    console.log(`After edit request for post id ${_id}`)
    setStatusIsEdit(false)
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
      {statusIsEdit && (
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
      {statusIsDelete && (
        <DeleteRecipe
          id={_id}
          token={token}
          handleCompleteSubmit={handleDeleteSubmission}
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
