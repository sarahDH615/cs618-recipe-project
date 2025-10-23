import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { User } from './User.jsx'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { EditRecipe } from './EditRecipe.jsx'
import { DeleteRecipe } from './DeleteRecipe.jsx'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import slug from 'slug'

// export function Recipe({ title, ingredients, image, author, id, authorId, fullRecipe = false }) {
export function Recipe({
  title,
  ingredients,
  image,
  author,
  _id,
  fullRecipe = false,
}) {
  const [token] = useAuth()
  const [statusIsEdit, setStatusIsEdit] = useState(false)
  const [statusIsDelete, setStatusIsDelete] = useState(false)
  const { sub } = token ? jwtDecode(token) : { sub: '' } // decode to get the payload if logged in
  // const authorIsUser = sub == authorId
  const authorIsUser = sub == author
  // need to add in like counts
  // need to store whether the user has liked this post -- store on user or on post? probably user
  // like count should be stored on post, or a separate table

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
    </article>
  )
}

Recipe.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  author: PropTypes.string,
  fullRecipe: PropTypes.bool,
}
