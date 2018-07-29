import React from 'react'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import { Link } from 'react-router-dom'

class BlogsForm extends React.Component {
  render() {
    const style = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    return (
      <div className='blogsForm'>
        <h2>blogs</h2>
          {this.props.blogs.map(blog =>
            <div key={blog._id} style={style}>
              <Link to={`/blogs/${blog._id}`}>{blog.title} by {blog.author}</Link>
            </div>
          )}
          <CreateBlogForm addBlog={this.props.addBlog}/>
      </div>
    )
  }
}

export default BlogsForm
