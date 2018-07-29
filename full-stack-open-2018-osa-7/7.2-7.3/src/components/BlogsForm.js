import React from 'react'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'

class BlogsForm extends React.Component {
  render() {
    return (
      <div className='blogsForm'>
        <h2>blogs</h2>
          {this.props.blogs.map(blog =>
            <Blog
              key={blog._id}
              className={blog}
              blog={blog}
              updateBlog={this.props.updateBlog}
              deleteBlog={this.props.deleteBlog}
              showDeleteButton={blog.user === undefined
                || blog.user._id === this.props.user.id }
            />
          )}
          <CreateBlogForm addBlog={this.props.addBlog}/>
      </div>
    )
  }
}

export default BlogsForm
