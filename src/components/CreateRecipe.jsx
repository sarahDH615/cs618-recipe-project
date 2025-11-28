import { useState } from 'react'
import { uploadImage } from '../api/images.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { RecipeTitle } from './RecipeTitle.jsx'
import { RecipeIngredients } from './RecipeIngredients.jsx'
import { ImageUploader } from './ImageUploader.jsx'
import { Modal } from '../components/Modal.jsx'
import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
import {
  CREATE_RECIPE,
  GET_RECIPES,
  // GET_RECIPES_BY_AUTHOR,
} from '../api/graphql/recipes.js'
import { Link } from 'react-router-dom'
import slug from 'slug'
import { RecipeCreationNotification } from '../hooks/RecipeCreationNotification.jsx'

export function CreateRecipe() {
  const [title, setTitle] = useState('') // default: ''
  const [ingredients, setIngredients] = useState('')
  const [image, setImage] = useState('')
  const [file, setFile] = useState(new Object())
  const [isSelected, setIsSelected] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [token] = useAuth()
  const [imageUploaderKey, setImageUploaderKey] = useState(1)
  const [modalDismissed, setModalDismissed] = useState(false)
  const { sendNotification } = RecipeCreationNotification()

  const [createRecipe, { loading, data }] = useGraphQLMutation(CREATE_RECIPE, {
    variables: { title, ingredients: ingredients.split('\n'), image },
    context: { headers: { Authorization: `Bearer ${token}` } },
    // refetchQueries: [GET_RECIPES, GET_RECIPES_BY_AUTHOR],
    refetchQueries: [GET_RECIPES],
    onCompleted: async (data) => {
      // if mutation successfully completes (a recipe is added)
      // emit a message for all clients
      // console.log(`recipe created, id: ${data.createRecipe.id}`)
      const link = `/recipes/${data.createRecipe.id}/${slug(
        data.createRecipe.title,
      )}`
      await sendNotification({ link: link, title: data.createRecipe.title })
    },
  })

  const updateTitle = (e) => {
    setTitle(e.target.value)
  }

  const updateIngredients = (e) => {
    setIngredients(e.target.value)
  }

  const removeSelectedImage = () => {
    setFile(new Object())
    setImage('')
    setIsSelected(false)
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

  const resetStates = async () => {
    // reset vars
    setTitle('')
    setIngredients('')
    setImage('')
    setFile(new Object())
    setIsSelected(false)
    setIsConfirmed(false)
    setImageUploaderKey(Math.abs(imageUploaderKey - 1)) // re-render so that fields reset
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    createRecipe()
  }

  if (!token) return <div>Please log in to create new recipes.</div>

  //   e.preventDefault prevents page refresh when a form is submitted
  // prevent the submit button from clicking when there's no title or a recipe post is pending
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
        key={imageUploaderKey}
        file={file}
        isSelected={isSelected}
        handleImageSelection={updateFileSelection}
        handleImageRemoval={removeSelectedImage}
      />

      <input
        type='submit'
        value={loading ? 'Creating...' : 'Create'}
        disabled={!title || (!isConfirmed && isSelected) || loading}
      />

      {data?.createRecipe && !modalDismissed && title ? (
        <Modal onClose={() => setModalDismissed(true)}>
          <p>
            Recipe{' '}
            <Link
              to={`/recipes/${data.createRecipe.id}/${slug(
                data.createRecipe.title,
              )}`}
            >
              {data.createRecipe.title}
            </Link>{' '}
            successfully created!
          </p>
        </Modal>
      ) : null}
    </form>
  )
}
