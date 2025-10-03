import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRecipe } from '../api/recipes.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export function CreateRecipe() {
  const [title, setTitle] = useState('') // default: ''
  const [ingredients, setIngredients] = useState([])
  const [image, setImage] = useState('')
  const [token] = useAuth()

  const queryClient = useQueryClient()
  const createRecipeMutation = useMutation({
    mutationFn: () => createRecipe(token, { title, ingredients, image }),
    onSuccess: () => queryClient.invalidateQueries(['recipes']), // means only the recipes part of the page will update
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(ingredients)
    createRecipeMutation.mutate()
  }

  if (!token) return <div>Please log in to create new recipes.</div>

  //   e.preventDefault prevents page refresh when a form is submitted
  // prevent the submit button from clicking when there's no title or a post is pending
  return (
    <form name='recipe' onSubmit={handleSubmit}>
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
      <label htmlFor='add-ingredients'>Ingredients: </label>
      <br />
      <textarea
        name='add-ingredients'
        value={ingredients}
        placeholder={`eggs\nflour\nmilk`}
        rows='5'
        onChange={(e) => setIngredients(e.target.value)}
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
        value={createRecipeMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || createRecipeMutation.isPending}
      />

      {createRecipeMutation.isSuccess ? (
        <>
          <br />
          Post successfully created!
        </>
      ) : null}
    </form>
  )
}
