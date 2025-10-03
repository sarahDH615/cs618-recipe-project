import PropTypes from 'prop-types'

export function RecipeTitle({ title, handleTitleChange }) {
  return (
    <div>
      <label htmlFor='create-title'>Title: </label>
      <input
        type='text'
        name='create-title'
        id='create-title'
        form='recipe'
        value={title}
        onChange={handleTitleChange}
      />
    </div>
  )
}

RecipeTitle.propTypes = {
  title: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func,
}
