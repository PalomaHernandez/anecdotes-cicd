import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const message = useSelector((state) => state.notification.message)
  const type = useSelector((state) => state.notification.type)

  if (!message) return null

  return (
    <Alert
      className="notification"
      variant={type === 'error' ? 'danger' : type}
    >
      {message}
    </Alert>
  )
}

export default Notification
