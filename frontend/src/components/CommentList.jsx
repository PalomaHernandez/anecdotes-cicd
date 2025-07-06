import ListGroup from 'react-bootstrap/ListGroup'

const CommentList = ({ comments }) => (
  <ListGroup variant="flush" className="mt-3">
    {comments.map((comment, index) => (
      <ListGroup.Item key={index} className="d-flex align-items-start gap-2">
        <div>
          <div className="fw-semibold">Anonymous</div>
          <div>{comment}</div>
        </div>
      </ListGroup.Item>
    ))}
  </ListGroup>
)

export default CommentList
