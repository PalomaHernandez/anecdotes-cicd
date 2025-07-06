import { screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
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

describe('<Blog />', () => {
  test('shows blog', () => {
    const blog = {
      title: 'Blog prueba',
      author: 'Prueba',
      url: 'prueba.com',
      likes: 0,
      user: { name: 'Hola', username: 'Holi', id: '123' },
      comments: [],
    }

    const dummyShowNotification = vi.fn()

    renderWithRedux(
      <Blog
        blog={blog}
        user={{ name: 'Hola', username: 'Holi', id: '123' }}
        showNotification={dummyShowNotification}
      />,
    )

    const blogItem = screen.getByTestId('blog-item')
    expect(within(blogItem).getByText(/Blog prueba/)).toBeInTheDocument()
    expect(within(blogItem).getByText(/Prueba/)).toBeInTheDocument()
    const url = screen.getByText('prueba.com')
    expect(url).toBeVisible()
    const likes = screen.getByText('likes:', { exact: false })
    expect(likes).toBeVisible()
  })

  test('clicking like button twice calls event handler twice', async () => {
    const blog = {
      title: 'Blog prueba',
      author: 'Prueba',
      url: 'prueba.com',
      likes: 0,
      user: { name: 'Hola', username: 'Holi', id: '123' },
      comments: [],
    }

    const dummyShowNotification = vi.fn()

    const dispatchMock = vi.fn()
    useDispatch.mockReturnValue(dispatchMock)

    renderWithRedux(
      <Blog
        blog={blog}
        user={{ name: 'Hola', username: 'Holi', id: '123' }}
        showNotification={dummyShowNotification}
      />,
    )
    const user = userEvent.setup()
    const button = screen.getByText('Like')
    await user.click(button)
    await user.click(button)

    expect(dispatchMock).toHaveBeenCalledTimes(2)
  })
})
