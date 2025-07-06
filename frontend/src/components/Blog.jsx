import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import BlogEditForm from './BlogEditForm'
import {
  likeBlog,
  removeBlog,
  editBlog,
  commentBlog,
} from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import BlogInfo from './BlogInfo'
import BlogActions from './BlogActions'

const Blog = ({ blog, user, showNotification }) => {
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const showOwnerButtons = user && blog.user && blog.user.id === user.id

  const handleLike = async () => {
    try {
      dispatch(likeBlog(blog.id))
    } catch {
      showNotification('Something went wrong', 'error')
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(removeBlog(blog.id))
        navigate('/')
        showNotification('Blog deleted', 'success')
      } catch {
        showNotification('Blog could not be deleted', 'error')
      }
    }
  }

  const handleEdit = () => setIsEditing(true)

  const handleUpdate = async (updatedBlog) => {
    await updateBlog({ id: blog.id, blogObject: updatedBlog })
    setIsEditing(false)
  }

  const updateBlog = async ({ id, blogObject }) => {
    try {
      dispatch(editBlog(id, blogObject))
      showNotification('The blog was updated successfully', 'success')
    } catch {
      showNotification('Something went wrong', 'error')
    }
  }

  const handleCommentSubmit = async (comment) => {
    try {
      dispatch(commentBlog(blog.id, comment))
      showNotification('Comment added', 'success')
    } catch {
      showNotification('Could not add comment', 'error')
    }
  }

  return isEditing ? (
    <div className="p-3" data-testid="blog-edit">
      <BlogEditForm
        initialBlog={blog}
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
        showNotification={showNotification}
      />
    </div>
  ) : (
    <div className="p-3">
      <Card className="blog" data-testid="blog-item">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Added by {blog.user?.name ? blog.user?.name : 'Unknown'}
          </small>
        </Card.Header>
        <Card.Body>
          <BlogInfo blog={blog} />
          <BlogActions
            onLike={handleLike}
            onDelete={handleDelete}
            onEdit={handleEdit}
            showOwnerButtons={showOwnerButtons}
          />
        </Card.Body>
      </Card>

      <h5 className="mt-4">Comments</h5>
      <CommentForm onSubmit={handleCommentSubmit} />
      <CommentList comments={blog.comments} />
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  showNotification: PropTypes.func.isRequired,
}

export default Blog
