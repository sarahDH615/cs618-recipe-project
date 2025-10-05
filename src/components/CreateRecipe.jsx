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
  // const [isConfirmed, setIsConfirmed] = useState(false)
  // const [file, setFile] = useState(false)
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
    // console.log(Object.keys(e.target.files[0]))
    setFile(e.target.files[0])
    setIsSelected(true)
    const result = await uploadImage(token, e.target.files[0])
    console.log('result back from uploadImage in CreateRecipe')
    // console.log(result)
    console.log(`title: ${title}`)
    console.log(`ingredients: ${ingredients}`)
    console.log(`image: ${result.image_url}`)
    // setIsSelected(false)
    // setIsConfirmed(true)
    setImage(result.image_url)
  }

  const setImageConfirmation = async () => {
    // e.preventDefault()
    // console.log('button clicked, waiting for response...')
    // const result = await uploadImage(token, file)
    // console.log('result back from uploadImage in CreateRecipe')
    // console.log(result)
    // // setIsSelected(false)
    // // setIsConfirmed(true)
    // setImage(result.image_url)
    console.log('click')
  }

  // const resetStates = () => {
  //   // reset vars
  //   setTitle('')
  //   setIngredients('')
  //   setImage('')
  //   setFile(new Object())
  //   setIsSelected(false)
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // setImage(result.image_url)
    createRecipeMutation.mutate()
    // resetStates()
  }

  if (!token) return <div>Please log in to create new recipes.</div>

  //   e.preventDefault prevents page refresh when a form is submitted
  // prevent the submit button from clicking when there's no title or a post is pending
  // <form
  //   method='POST'
  //   action='/image/upload'
  //   encType='multipart/form-data'
  //   onSubmit={handleSubmit}
  // >
  return (
    <form name='recipe' onSubmit={handleSubmit}>
      <RecipeTitle title={title} handleTitleChange={updateTitle} />
      <RecipeIngredients
        ingredients={ingredients}
        handleIngredientsChange={updateIngredients}
      />
      <ImageUploader
        file={file}
        isSelected={isSelected}
        handleImageSelection={updateFileSelection}
        handleConfirmFileChoice={setImageConfirmation}
      />
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
