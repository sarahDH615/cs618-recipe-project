import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadImage } from '../api/images.js'
import { RecipeTitle } from './RecipeTitle.jsx'
import { RecipeIngredients } from './RecipeIngredients.jsx'
import { ImageUploader } from './ImageUploader.jsx'
import { updateRecipe } from '../api/recipes.js'
import { Modal } from '../components/Modal.jsx'
import PropTypes from 'prop-types'

export function EditRecipe({
  id,
  title,
  ingredients,
  image,
  token,
  handleCompleteSubmit,
}) {
  const [newTitle, setNewTitle] = useState(title) // default: ''
  const [newIngredients, setNewIngredients] = useState(ingredients.join('\n'))
  const [newImage, setNewImage] = useState(image)
  const [newFile, setNewFile] = useState(new Object())
  const [newIsSelected, setNewIsSelected] = useState(false)
  const [newIsConfirmed, setNewIsConfirmed] = useState(false)
  const [, setModalOpen] = useState(false)

  const queryClient = useQueryClient()
  const editRecipeMutation = useMutation({
    mutationFn: () =>
      updateRecipe(token, {
        id: id,
        title: newTitle,
        ingredients: newIngredients,
        image: newImage,
      }),
    onSuccess: () => queryClient.invalidateQueries(['recipes']), // means only the recipes part of the page will update
  })

  const removeSelectedImage = () => {
    setNewFile(new Object())
    setNewImage('')
    setNewIsSelected(false)
  }

  const updateFileSelection = async (e) => {
    setNewFile(e.target.files[0])
    setNewIsSelected(true)
    const result = await uploadImage(token, e.target.files[0])
    setNewImage(result.image_url)
    setNewIsConfirmed(true)
    console.log(`is confirmed?: ${newIsConfirmed}`)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    editRecipeMutation.mutate()
    handleCompleteSubmit()
  }

  const resetStates = async () => {
    // reset vars
    setNewTitle(title) // default: ''
    setNewIngredients(ingredients)
    setNewImage(image)
    setNewFile(new Object())
    setNewIsSelected(false)
    setNewIsConfirmed(false)
  }
  return (
    <form name='editRecipe' onSubmit={handleEditSubmit}>
      <button type='button' id='clear-fields' onClick={resetStates}>
        Clear fields
      </button>
      <RecipeTitle
        title={newTitle}
        handleTitleChange={(e) => setNewTitle(e.target.value)}
      />
      <RecipeIngredients
        ingredients={newIngredients}
        handleIngredientsChange={(e) => setNewIngredients(e.target.value)}
      />
      <ImageUploader
        key={1}
        file={newFile}
        isSelected={newIsSelected}
        handleImageSelection={updateFileSelection}
        handleImageRemoval={removeSelectedImage}
      />
      <button
        type='submit'
        value={editRecipeMutation.isPending ? 'Updating...' : 'Update Recipe'}
        disabled={
          !newTitle ||
          (!newIsConfirmed && newIsSelected) ||
          editRecipeMutation.isPending
        }
      >
        Update Recipe
      </button>

      {editRecipeMutation.isSuccess && title ? (
        <Modal onClose={() => setModalOpen(false)}>
          <p>Recipe successfully updated!</p>
        </Modal>
      ) : null}
    </form>
  )
}

EditRecipe.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  token: PropTypes.string,
  handleCompleteSubmit: PropTypes.func,
}
