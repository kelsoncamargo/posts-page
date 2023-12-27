import './style.css'

export const Button = (props) => {
  const {text_button, onClick, disabled} = props

  return(
    <button 
    onClick={onClick}
    disabled={ disabled }
    >
      {text_button}
    </button>
  )
}