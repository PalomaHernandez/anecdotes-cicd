import Button from 'react-bootstrap/Button'

const BlogActions = ({ onLike, onEdit, onDelete, showOwnerButtons }) => (
  <>
    <Button className="mx-2" onClick={onLike}>
      Like
    </Button>
    {showOwnerButtons && (
      <>
        <Button variant="danger" onClick={onDelete}>
          Remove
        </Button>
        <Button className="mx-2" variant="secondary" onClick={onEdit}>
          Edit
        </Button>
      </>
    )}
  </>
)

export default BlogActions
