import './style.css';

export const Input = (props) => {
  
  const { searchValue, handleChange, textPlaceHolder } = props

  return(
    <input 
      type='search'
      onChange={ handleChange }
      value={ searchValue }
      placeholder={ textPlaceHolder }
    />
  )

}