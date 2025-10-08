import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { User } from './User.jsx'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { deleteRecipe } from '../api/recipes.js'

export function Recipe({ _id, title, ingredients, image, author: userId }) {
  const [token] = useAuth()
  const { sub } = token ? jwtDecode(token) : { sub: '' } // decode to get the payload if logged in

  const handleDeleteRequest = () => {
    console.log(`Delete request for post id ${_id}`)
    deleteRecipe(token, _id)
  }

  return (
    <article>
      <h3>{title}</h3>
      <ul>
        {ingredients.map((i) => (
          <Fragment key={ingredients.indexOf(i)}>
            <li>{i}</li>
          </Fragment>
        ))}
      </ul>
      <img src={`${image}`} alt='recipe' width='200' height='200' />
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
          <button type='button' id='edit'>
            Edit
          </button>
        </>
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
