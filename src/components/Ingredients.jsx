import PropTypes from 'prop-types'
import { Ingredient } from './Ingredient.jsx'
import { useMutation } from '@tanstack/react-query'

let nextId = 0

export function Ingredients({ ingredients, setIngredients }) {
  // function handleAddIngredient(ingredientName) {
  //   setIngredients([
  //     ...ingredients,
  //     {
  //       id: nextId++,
  //       name: ingredientName,
  //     },
  //   ])
  // }

  // function handleChangeIngredient(newIngredient) {
  //   setIngredients(
  //     ingredients.map((t) => {
  //       if (t.id === newIngredient.id) {
  //         return newIngredient
  //       } else {
  //         return t
  //       }
  //     }),
  //   )
  // }

  // function handleDeleteIngredient(ingredientToDelete) {
  //   setIngredients(ingredients.filter((t) => t.id !== ingredientToDelete))
  // }
  const createPostMutation = useMutation({
    mutationFn: () => setIngredients(ingredients),
  })

  const handleIngredientsSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }
  function handleAddIngredient(ingredientName) {
    ingredients = [
      ...ingredients,
      {
        id: nextId++,
        name: ingredientName,
      },
    ]
  }

  function handleChangeIngredient(newIngredient) {
    ingredients.map((t) => {
      if (t.id === newIngredient.id) {
        return newIngredient
      } else {
        return t
      }
    })
  }

  function handleDeleteIngredient(ingredientToDelete) {
    ingredients = ingredients.filter((t) => t.id !== ingredientToDelete)
  }

  return (
    <div>
      <form
        name='ingredientsForm'
        id='ingredientsForm'
        onSubmit={handleIngredientsSubmit}
      >
        <label htmlFor='name'>Enter an ingredient: </label>
        <textarea
          name='ingredient'
          placeholder='Bananas'
          defaultValue=''
          form='ingredientsForm'
          onChange={(e) => e.target.value}
        />
        <button
          onClick={(e) => {
            handleAddIngredient(e.target.value)
          }}
        >
          Add
        </button>
      </form>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <Ingredient
              ingredient={ingredient}
              onChange={handleChangeIngredient}
              onDelete={handleDeleteIngredient}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
  setIngredients: PropTypes.func,
}
