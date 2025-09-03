import PropTypes from 'prop-types'
import { Fragment } from 'react'

export function Recipe({ title, ingredients, image }) {
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
    </article>
  )
}

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
}
