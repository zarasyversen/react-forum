import PropTypes from 'prop-types'

function TextArea ({ id, label, value, setMethod }) {
  return (
    <div className="form__group">
      <label htmlFor={id}>
        {label}
      </label>
        <textarea
          id={id}
          name={id}
          className="form__input"
          placeholder="Please enter your message here..."
          onChange={e => setMethod(e.target.value)}
          value={value}
          rows="5"
          cols="33"
        ></textarea>
    </div>
  )
}

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setMethod: PropTypes.func.isRequired
}

export default TextArea
