import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updated = action.payload
      return state.map((blog) => (blog.id !== updated.id ? blog : updated))
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, deleteBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const editBlog = (id, blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, blog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    const likedBlog = await blogService.like(id)
    dispatch(updateBlog(likedBlog))
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.comment(id, comment)
    dispatch(updateBlog(commentedBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer
