export default function FieldGroup ({ id, label, inputType, value, setMethod = null }) {
  return (
    <div className="form__group">
      <label htmlFor={id}>
        {label}
      </label>
      <input type={inputType} name={id} className="form__input" value={value}
          onChange={e => setMethod(e.target.value)}/>
    </div>
  )
}
