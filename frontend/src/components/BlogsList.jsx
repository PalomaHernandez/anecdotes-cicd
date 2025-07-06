import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const BlogsList = ({ blogs }) => (
  <div className="p-3">
    <h3>Blogs</h3>
    <Table striped>
      <tbody>
        {blogs.map((blog) => (
          <tr data-testid="blog-row" key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

export default BlogsList
