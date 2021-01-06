export default function Button ({ type, text, onClick = null }) {
  return (
    <button type={type} onClick={onClick} className="btn btn--primary">
      {text}
    </button>
  )
}
