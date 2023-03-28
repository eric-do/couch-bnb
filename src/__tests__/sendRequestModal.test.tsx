import { ReactElement } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SendRequestModal from '~/components/modals/sendRequest'
import '@testing-library/jest-dom'

function setup(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

describe('Send Request modal', () => {
  it('implements happy path', async () => {
    const onClose = () => {}
    const { user } = setup(<SendRequestModal onClose={onClose} />)

    const textbox = screen.getByRole('textbox');

    expect(textbox).toBeInTheDocument()

    await user.type(textbox, "Hello");
    expect(textbox).toHaveValue("Hello");

  })
})