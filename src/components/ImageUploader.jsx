import PropTypes from 'prop-types'

export function ImageUploader({
  file,
  isSelected,
  handleImageSelection,
  handleImageRemoval,
}) {
  // name attribute can be passed to multer
  return (
    <div>
      <label htmlFor='add-image'>Image URL: </label>
      <input
        type='file'
        name='image'
        id='file'
        accept='image/*'
        onChange={handleImageSelection}
      />
      {file && isSelected && (
        <section>
          <div>
            <p>Preview: </p>
            <img
              src={URL.createObjectURL(file)}
              alt='your-upload'
              height='60'
            />
          </div>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
          <button type='button' onClick={handleImageRemoval}>
            Remove image?
          </button>
        </section>
      )}
    </div>
  )
}

ImageUploader.propTypes = {
  file: PropTypes.object,
  isSelected: PropTypes.bool,
  handleImageSelection: PropTypes.func.isRequired,
  handleImageRemoval: PropTypes.func.isRequired,
}
