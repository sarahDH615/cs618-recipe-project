import PropTypes from 'prop-types'

export function ImageUploader({
  file,
  handleImageSelection,
  handleConfirmFileChoice,
}) {
  return (
    <div>
      <label htmlFor='add-image'>Image URL: </label>
      <input
        type='file'
        name='add-image'
        id='file'
        onChange={handleImageSelection}
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
        <button type='button' onClick={handleConfirmFileChoice}>
          Confirm image choice
        </button>
      )}
    </div>
  )
}
ImageUploader.propTypes = {
  file: PropTypes.object,
  handleImageSelection: PropTypes.func.isRequired,
  handleConfirmFileChoice: PropTypes.func.isRequired,
}
