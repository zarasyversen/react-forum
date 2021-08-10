import PropTypes from 'prop-types'

function FieldGroup ({ id, label, inputType, value, autocomplete, setMethod, placeHolder }) {
  return (
    <div className="form__group">
      <label htmlFor={id}>
        {label}
      </label>
      <input
        type={inputType}
        name={id}
        id={id}
        className="form__input"
        value={value}
        autoComplete={autocomplete}
        placeholder={placeHolder}
        onChange={e => setMethod(e.target.value)}
      />
    </div>
  )
}

FieldGroup.defaultProps = {
  setMethod: null
}

FieldGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  value: PropTypes.string,
  autocomplete: PropTypes.string,
  setMethod: PropTypes.func,
  placeHolder: PropTypes.string
}

export default FieldGroup
