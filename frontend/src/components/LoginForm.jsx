import { useState } from 'react'
import PropTypes from 'prop-types'
import Notification from './Notification'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    login({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row>
        <Col>
          <Card style={{ minWidth: '22rem' }} className="shadow-sm p-3">
            <Card.Body>
              <Card.Title className="mb-4 text-center">Log in</Card.Title>
              <Notification />
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    autoFocus
                    name="Username"
                    data-testid="username"
                    onChange={({ target }) => setUsername(target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    name="Password"
                    data-testid="password"
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Log in
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginForm
