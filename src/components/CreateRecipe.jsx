import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRecipe } from '../api/recipes.js'
import { uploadImage } from '../api/images.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { RecipeTitle } from './RecipeTitle.jsx'
import { RecipeIngredients } from './RecipeIngredients.jsx'
import { ImageUploader } from './ImageUploader.jsx'

export function CreateRecipe() {
  const [title, setTitle] = useState('') // default: ''
  const [ingredients, setIngredients] = useState('')
  const [image, setImage] = useState('')
  const [file, setFile] = useState(new Object())
  const [isSelected, setIsSelected] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [token] = useAuth()

  const queryClient = useQueryClient()
  const createRecipeMutation = useMutation({
    mutationFn: () => createRecipe(token, { title, ingredients, image }),
    onSuccess: () => queryClient.invalidateQueries(['recipes']), // means only the recipes part of the page will update
  })

  const updateTitle = (e) => {
    setTitle(e.target.value)
  }

  const updateIngredients = (e) => {
    setIngredients(e.target.value)
  }

  const updateFileSelection = async (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
    setIsSelected(true)
    const result = await uploadImage(token, e.target.files[0])
    console.log('result back from uploadImage in CreateRecipe')
    console.log(`title: ${title}`)
    console.log(`ingredients: ${ingredients}`)
    console.log(`image: ${result.image_url}`)
    setImage(result.image_url)
    setIsConfirmed(true)
    console.log(`is confirmed?: ${isConfirmed}`)
  }

  const resetStates = () => {
    // reset vars
    setTitle('')
    setIngredients('')
    setImage('')
    setFile(new Object())
    setIsSelected(false)
    setIsConfirmed(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    createRecipeMutation.mutate()
  }

  if (!token) return <div>Please log in to create new recipes.</div>

  //   e.preventDefault prevents page refresh when a form is submitted
  // prevent the submit button from clicking when there's no title or a post is pending
  return (
    <form name='recipe' onSubmit={handleSubmit}>
      <button type='button' id='clear-fields' onClick={resetStates}>
        Clear fields
      </button>
      <RecipeTitle title={title} handleTitleChange={updateTitle} />
      <RecipeIngredients
        ingredients={ingredients}
        handleIngredientsChange={updateIngredients}
      />
      <ImageUploader
        file={file}
        isSelected={isSelected}
        handleImageSelection={updateFileSelection}
      />
      <input
        type='submit'
        value={createRecipeMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || !isConfirmed || createRecipeMutation.isPending}
      />

      {createRecipeMutation.isSuccess && title ? (
        <>
          <br />
          Post successfully created!
        </>
      ) : null}
    </form>
  )
}
