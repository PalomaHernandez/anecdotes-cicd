import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!comment.trim()) return
    onSubmit(comment)
    setComment('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button className="my-2" type="submit">
          Add comment
        </Button>
      </Form.Group>
    </Form>
  )
}

export default CommentForm
