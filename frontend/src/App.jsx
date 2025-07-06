import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, removeUser } from './reducers/userReducer'
import { Routes, Route } from 'react-router-dom'
import UsersList from './components/usersList'
import BlogsList from './components/BlogsList'
import BlogDetails from './components/BlogDetails'
import { Link } from 'react-router-dom'
import User from './components/User'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const login = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (exception) {
      showNotification('Wrong username or password', 'error')
    }
  }

  const showNotification = (message, type) => {
    dispatch(setNotification(message, type, 5))
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(removeUser())
  }

  if (user === null) {
    return <LoginForm login={login} />
  }

  return (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Blogs
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
              <Nav.Link as={Link} to="/create">
                Create Blog
              </Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Text className="me-2">{user.name} logged in</Navbar.Text>
              <Button variant="outline-light" onClick={logout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Notification />

      <Routes>
        <Route path="/" element={<BlogsList blogs={blogs} />} />
        <Route
          path="/blogs/:id"
          element={
            <BlogDetails user={user} showNotification={showNotification} />
          }
        />
        <Route
          path="/create"
          element={<BlogForm showNotification={showNotification} />}
        />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  )
}

export default App
