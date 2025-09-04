import { useState } from 'react'
import PropTypes from 'prop-types'

export function Ingredient({ ingredient, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  let ingredientContent
  if (isEditing) {
    ingredientContent = (
      <>
        <input
          value={ingredient.name}
          onChange={(e) => {
            onChange({
              ...ingredient,
              name: e.target.value,
            })
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    )
  } else {
    ingredientContent = (
      <>
        {ingredient.name}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    )
  }
  return (
    <label>
      {ingredientContent}
      <button onClick={() => onDelete(ingredient.id)}>Delete</button>
    </label>
  )
}

Ingredient.propTypes = {
  ingredient: PropTypes.objectOf({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
}
