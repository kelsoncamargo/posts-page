import { render, screen } from "@testing-library/react"
import { Button } from '.'
import userEvent from "@testing-library/user-event"

describe('<Button />', () => {
  it('should render the button with the text', () => {
    render(<Button text_button="Load more" />)

    const button = screen.getByRole('button')
    expect(button.textContent.length).toBeGreaterThanOrEqual(4) 
  })

  it('should call function on button click', () => {
    const fn = jest.fn()
    render(<Button text_button="Load more" onClick={fn} />)

    const button = screen.getByRole('button')
    if(button.textContent.length < 4){
      throw new Error("Button text has less than 4 characters")
    }
    userEvent.click(button)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should be disable when disabled is true', () => {
    render(<Button text_button="Load more" disabled={true} />)

    const button = screen.getByRole('button')

    if(button.textContent.length < 4){
      throw new Error("Button text has less than 4 characters")
    }
    
    expect(button).toBeDisabled()

  })

  it('should be enable when disabled is false', () => {
    render(<Button text_button="Load more" disabled={false} />)

    const button = screen.getByRole('button')

    if(button.textContent.length < 4){
      throw new Error("Button text has less than 4 characters")
    }
    
    expect(button).toBeEnabled()

  })
})