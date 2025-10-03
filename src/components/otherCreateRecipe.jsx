import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRecipe } from '../api/recipes.js'
import { useAuth } from '../contexts/AuthContext.jsx'
// import { useForm } from 'react-hook-form'
// import { ImageUploader } from './ImageUploader.jsx'
import { RecipeTitle } from './RecipeTitle.jsx'
import { RecipeIngredients } from './RecipeIngredients.jsx'

export function CreateRecipe() {
  const [title, setTitle] = useState('') // default: ''
  const [ingredients, setIngredients] = useState([])
  const [image, setImage] = useState('')
  const [file, setFile] = useState('')
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

  const updateFileSelection = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  }

  const setImageConfirmation = (e) => {
    alert('he')
    e.preventDefault()
    console.log(file)
    console.log(e.get('add-image'))
    setImage(file.name)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(title)
    console.log(ingredients)
    createRecipeMutation.mutate()
  }

  if (!token) return <div>Please log in to create new recipes.</div>

  //   e.preventDefault prevents page refresh when a form is submitted
  // prevent the submit button from clicking when there's no title or a post is pending
  return (
    <form name='recipe' onSubmit={handleSubmit}>
      <RecipeTitle title={title} handleTitleChange={updateTitle} />
      <RecipeIngredients
        ingredients={ingredients}
        handleIngredientsChange={updateIngredients}
      />
      {/* <ImageUploader
        image={image}
        file={file}
        handleImageSelection={updateFileSelection}
        handleConfirmFileChoice={setImageConfirmation}
      /> */}
      <div>
        <label htmlFor='add-image'>Image URL: </label>
        <input
          type='file'
          name='add-image'
          id='file'
          onChange={updateFileSelection}
        />
        {file && (
          <section>
            File details:
            <ul>
              <li>Name: {file.name}</li>
              <li>Type: {file.type}</li>
              <li>Size: {file.size} bytes</li>
            </ul>
          </section>
        )}
        {file && (
          <button formAction={setImageConfirmation}>
            Confirm image choice
          </button>
        )}
      </div>
      <input
        form='recipe'
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
