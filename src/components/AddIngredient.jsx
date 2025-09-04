import { useState } from 'react'
import PropTypes from 'prop-types'

export function AddIngredient({ onAddIngredient }) {
  const [ingredientName, setIngredientName] = useState('')
  return (
    <div>
      <input
        placeholder='Add ingredient'
        value={ingredientName}
        onChange={(e) => setIngredientName(e.target.value)}
      />
      <button
        onClick={() => {
          setIngredientName('')
          onAddIngredient(ingredientName)
        }}
      >
        Add
      </button>
    </div>
  )
}

AddIngredient.propTypes = {
  onAddIngredient: PropTypes.func,
}
