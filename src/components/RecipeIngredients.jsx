import PropTypes from 'prop-types'

export function RecipeIngredients({ ingredients, handleIngredientsChange }) {
  return (
    <div>
      <label htmlFor='add-ingredients'>Ingredients: </label>
      <br />
      <textarea
        name='add-ingredients'
        value={ingredients}
        placeholder={`eggs\nflour\nmilk`}
        rows='5'
        form='recipe'
        onChange={handleIngredientsChange}
      />
    </div>
  )
}

RecipeIngredients.propTypes = {
  ingredients: PropTypes.string.isRequired,
  handleIngredientsChange: PropTypes.func,
}
