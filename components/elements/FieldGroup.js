export default function FieldGroup( {id, label, inputType, value}) {
  return (
    <div className="form__group">
      <label htmlFor={id}>
        {label}
      </label>
      <input type={inputType} name={id} className="form__input" />
    </div>
  )
}