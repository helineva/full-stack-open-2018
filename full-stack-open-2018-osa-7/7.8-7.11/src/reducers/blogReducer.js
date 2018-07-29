import blogService from '../services/blogs'
import { initializeUsers } from './userReducer'

const compareBlogs = (blog1, blog2) => {
  if (blog2.likes !== blog1.likes) {
    return blog2.likes - blog1.likes
  }
  return blog1.title > blog2.title
}

const blogReducer = (state = null, action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.blogs.sort(compareBlogs);
  case 'CREATE_BLOG':
    return state.concat(action.blog).sort(compareBlogs)
  case 'UPDATE_BLOG':
    return state.map(blog =>
      blog._id === action.blog._id ? action.blog : blog)
      .sort(compareBlogs)
  case 'DELETE_BLOG':
    return state.filter(blog =>
      blog._id !== action.id).sort(compareBlogs)
  default:
    return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      blogs
    })
  }
}

export const createBlog = (title, author, url) => {
  return async (dispatch) => {
    const blog = await blogService
      .create({ title, author, url })
    dispatch({
      type: 'CREATE_BLOG',
      blog
    })
    initializeUsers()(dispatch)
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = {
      _id: blog._id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user._id
    }
    const updatedBlog = await blogService.update(likedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      blog: updatedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      id
    })
    initializeUsers()(dispatch)
  }
}

export const addComment = (id, content) => {
  return async (dispatch) => {
    const comment = { content }
    const blog = await blogService
      .createComment(id, comment)
    dispatch({
      type: 'UPDATE_BLOG',
      blog
    })
  }
}

export default blogReducer;
