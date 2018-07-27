import React from 'react'
import BlogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullInfoVisible: false
    }
  }

  toggle = (event) => {
    if (event.target.tagName === 'DIV') {
      this.setState( { fullInfoVisible: !this.state.fullInfoVisible })
    }
  }

  like = async (event) => {
    const blog = {
      _id: this.props.blog._id,
      title: this.props.blog.title,
      author: this.props.blog.author,
      url: this.props.blog.url,
      likes: this.props.blog.likes + 1,
      user: this.props.blog.user._id
    }
    const updatedBlog = await BlogService.update(blog)
    this.props.updateBlog(updatedBlog)
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    if (this.state.fullInfoVisible) {
      return (
        <div onClick={this.toggle} style={blogStyle}>
          <div>{this.props.blog.title} by {this.props.blog.author}</div>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
          <div>{this.props.blog.likes} likes
            <button onClick={this.like}>like</button>
          </div>
          <div>added by {this.props.blog.user.name}</div>
        </div>
      )
    }
    return (
      <div onClick={this.toggle} style={blogStyle}>
        {this.props.blog.title} by {this.props.blog.author}
      </div>
    )
  }
}

export default Blog
