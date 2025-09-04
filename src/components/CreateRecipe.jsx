import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRecipe } from '../api/recipes.js'
import { AddIngredient } from './AddIngredient.jsx'
import { IngredientsList } from './IngredientsList.jsx'

let nextId = 0

export function CreateRecipe() {
  const [title, setTitle] = useState('') // default: ''
  const [ingredients, setIngredients] = useState([])
  const [image, setImage] = useState('')

  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () => createRecipe({ title, ingredients, image }),
    onSuccess: () => queryClient.invalidateQueries(['recipes']), // means only the recipes part of the page will update
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  function handleAddIngredient(ingredientName) {
    setIngredients([
      ...ingredients,
      {
        id: nextId++,
        name: ingredientName,
      },
    ])
  }

  function handleChangeIngredient(newIngredient) {
    setIngredients(
      ingredients.map((t) => {
        if (t.id === newIngredient.id) {
          return newIngredient
        } else {
          return t
        }
      }),
    )
  }

  function handleDeleteIngredient(ingredientToDelete) {
    setIngredients(ingredients.filter((t) => t.id !== ingredientToDelete))
  }

  //   e.preventDefault prevents page refresh when a form is submitted
  // prevent the submit button from clicking when there's no title or a post is pending
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <AddIngredient onAddIngredient={handleAddIngredient} />
      <IngredientsList
        ingredients={ingredients}
        onChangeIngredient={handleChangeIngredient}
        onDeleteIngredient={handleDeleteIngredient}
      />
      <br />
      <div>
        <label htmlFor='add-image'>Image URL: </label>
        <input
          type='url'
          name='add-image'
          id='add-image'
          placeholder='https://example.com'
          pattern='https://.*'
          size='30'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <br />
      <br />
      <input
        type='submit'
        value={createPostMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || createPostMutation.isPending}
      />

      {createPostMutation.isSuccess ? (
        <>
          <br />
          Post successfully created!
        </>
      ) : null}
    </form>
  )
}
