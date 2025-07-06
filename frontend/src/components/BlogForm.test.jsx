import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import renderWithRedux from '../utils/renderWithRedux'
import { useDispatch } from 'react-redux'

// Mock de useDispatch
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useDispatch: vi.fn(),
  }
})

describe('<BlogForm />', () => {
  test('<BlogForm /> calls on submit', async () => {
    const addBlog = vi.fn()
    const user = userEvent.setup()

    const { container } = renderWithRedux(
      <BlogForm showNotification={() => {}} />,
    )

    const dispatchMock = vi.fn()
    useDispatch.mockReturnValue(dispatchMock)

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const sendButton = screen.getByText('save')

    await user.type(titleInput, 'title of blog')
    await user.type(authorInput, 'author name')
    await user.type(urlInput, 'url.com')
    await user.click(sendButton)

    expect(dispatchMock).toHaveBeenCalledTimes(1)
    expect(typeof dispatchMock.mock.calls[0][0]).toBe('function')
  })
})
