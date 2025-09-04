import PropTypes from 'prop-types'
import { Ingredient } from './Ingredient.jsx'

export function IngredientsList({
  ingredients,
  onChangeIngredient,
  onDeleteIngredient,
}) {
  return (
    <ul>
      {ingredients.map((ingredient) => (
        <li key={ingredient.id}>
          <Ingredient
            ingredient={ingredient}
            onChange={onChangeIngredient}
            onDelete={onDeleteIngredient}
          />
        </li>
      ))}
    </ul>
  )
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
  onChangeIngredient: PropTypes.func,
  onDeleteIngredient: PropTypes.func,
}
