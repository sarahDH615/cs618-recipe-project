import PropTypes from 'prop-types'

export function Modal({ children, onClose }) {
  return (
    <div id='overlay'>
      <div id='modal'>
        {children}
        <button id='modal-close-button' onClick={onClose}>
          X
        </button>
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.element,
  onClose: PropTypes.func,
}
