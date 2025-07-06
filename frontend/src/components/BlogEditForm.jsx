import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BlogEditForm = ({
  showNotification,
  initialBlog,
  onSubmit,
  onCancel,
}) => {
  const [newTitle, setTitle] = useState(initialBlog.title)
  const [newAuthor, setAuthor] = useState(initialBlog.author)
  const [newUrl, setUrl] = useState(initialBlog.url)

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!newTitle || !newAuthor || !newUrl) {
      showNotification('Please fill in all fields', 'error')
      return
    }
    const blogData = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    onSubmit(blogData)

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div className="p-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            value={newTitle}
            onChange={handleTitleChange}
            id="title-input"
            data-testid="title-input"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            value={newAuthor}
            onChange={handleAuthorChange}
            id="author-input"
            data-testid="author-input"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Url:</Form.Label>
          <Form.Control
            value={newUrl}
            onChange={handleUrlChange}
            id="url-input"
            data-testid="url-input"
          />
        </Form.Group>
        <div className="d-flex justify-content-end mt-3 gap-2">
          <Button variant="primary" type="submit">
            Save changes
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default BlogEditForm
