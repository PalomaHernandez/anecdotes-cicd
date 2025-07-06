import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogDetails = ({ user, showNotification }) => {
  const { id } = useParams()
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))

  if (!blog) return <div>Blog not found</div>

  return <Blog blog={blog} user={user} showNotification={showNotification} />
}

export default BlogDetails
