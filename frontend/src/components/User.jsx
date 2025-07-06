import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

const User = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    if (users.length === 0) {
      dispatch(initializeUsers())
    }
  }, [dispatch, users.length])

  const user = users.find((u) => u.id === id)

  if (!user) return null

  return (
    <div className="p-3">
      <Card>
        <Card.Header className="fw-bold">{user.name}</Card.Header>
        {user.blogs.length > 0 ? (
          <Card.Body>
            Added blogs:
            <ListGroup variant="info">
              {user.blogs.map((blog) => (
                <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        ) : (
          <Card.Body>No blogs added</Card.Body>
        )}
      </Card>
    </div>
  )
}

export default User
