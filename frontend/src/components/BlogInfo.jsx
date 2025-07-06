import Card from 'react-bootstrap/Card'

const BlogInfo = ({ blog }) => (
  <>
    <Card.Title>
      {blog.title} {blog.author}
    </Card.Title>
    <Card.Link href={blog.url} target="_blank" rel="noopener noreferrer">
      {blog.url}
    </Card.Link>
    <Card.Text>likes: {blog.likes}</Card.Text>
  </>
)

export default BlogInfo
