import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blog: null
    }
  }

  componentDidMount() {
    blogService.getById(this.props.blogId).then(blog => {
      this.setState({ blog });
    });
  }

  like = async (event) => {
    const blog = {
      _id: this.state.blog._id,
      title: this.state.blog.title,
      author: this.state.blog.author,
      url: this.state.blog.url,
      likes: this.state.blog.likes + 1,
      user: this.state.blog.user._id
    }
    const updatedBlog = await blogService.update(blog)
    this.props.updateBlog(updatedBlog)
    this.setState({ blog: updatedBlog })
  }

  deleteBlog = async (event) => {
    if (window.confirm(
      `delete '${this.state.blog.title}' by ${this.state.blog.author}?`)) {
        try {
          await blogService.remove(this.state.blog._id)
          this.props.deleteBlog(this.state.blog)
          this.props.history.push('/blogs')
        } catch (exception) {
          console.log(exception)
        }
    }
  }

  render() {
    const deleteButtonStyle = {
      backgroundColor: 'blue',
      borderRadius: 8
    }

    if (this.state.blog) {
      return (
        <div>
          <h2>{this.state.blog.title} by {this.state.blog.author}</h2>
          <a href={this.state.blog.url}>{this.state.blog.url}</a>
          <div>{this.state.blog.likes} likes
            <button onClick={this.like}>like</button>
          </div>
          <div>added by {this.state.blog.user !== undefined
            ? this.state.blog.user.name : '<undefined>'}</div>
          {(this.state.blog.user === undefined || this.state.blog.user._id === this.props.user.id)
              && <button
                   onClick={this.deleteBlog}
                   style={deleteButtonStyle}>
                     delete
                </button>
          }
        </div>
      )
    }
    return null
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
