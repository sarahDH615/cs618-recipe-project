import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { User } from './User.jsx'

export function Recipe({ title, ingredients, image, author: userId }) {
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
      <img src={`${image}`} alt='recipe' />
      {userId && (
        <em>
          <br />
          <br />
          Written by <User id={userId} />
        </em>
      )}
    </article>
  )
}

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  author: PropTypes.string,
}
