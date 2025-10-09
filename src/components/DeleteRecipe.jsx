import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteRecipe } from '../api/recipes.js'
import { Modal } from '../components/Modal.jsx'
import PropTypes from 'prop-types'

export function DeleteRecipe({ token, id, handleCompleteSubmit }) {
  const [modalDismissed, setModalDismissed] = useState(false)

  const queryClient = useQueryClient()
  const deleteRecipeMutation = useMutation({
    mutationFn: () => deleteRecipe(token, id),
    onSuccess: () => queryClient.invalidateQueries(['recipes']), // means only the recipes part of the page will update
  })

  const handleDeleteSubmit = async (e) => {
    e.preventDefault()
    console.log('in handle delete submit')
    deleteRecipeMutation.mutate()
    handleCompleteSubmit()
  }

  return (
    <form name='deleteRecipe' onSubmit={handleDeleteSubmit}>
      <button
        type='submit'
        id='confirm-delete'
        value={deleteRecipeMutation.isPending ? 'Deleting...' : 'Delete Recipe'}
        disabled={deleteRecipeMutation.isPending}
      >
        Confirm delete
      </button>

      {deleteRecipeMutation.isSuccess && !modalDismissed ? (
        <Modal onClose={() => setModalDismissed(false)}>
          <p>Recipe successfully deleted!</p>
        </Modal>
      ) : null}
    </form>
  )
}

DeleteRecipe.propTypes = {
  id: PropTypes.string.isRequired,
  token: PropTypes.string,
  handleCompleteSubmit: PropTypes.func,
}
