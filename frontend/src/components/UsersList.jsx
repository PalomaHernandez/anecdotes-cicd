import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const UsersList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div className="p-3">
      <h3>Users</h3>
      <Table striped className="text-center">
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UsersList
