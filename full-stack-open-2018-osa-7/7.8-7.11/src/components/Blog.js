import React from 'react'
import CommentsForm from './CommentsForm'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

class Blog extends React.Component {
  like = (event) => {
    this.props.likeBlog(this.props.blog)
  }

  delete = (event) => {
    if (window.confirm(
      `delete '${this.props.blog.title}' by ${this.props.blog.author}?`)) {
        try {
          this.props.deleteBlog()
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
    if (this.props.blog) {
      return (
        <div>
          <h2>{this.props.blog.title} by {this.props.blog.author}</h2>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
          <div>{this.props.blog.likes} likes
            <button onClick={this.like}>like</button>
          </div>
          <div>added by {this.props.blog.user !== undefined
            ? this.props.blog.user.name : '<undefined>'}</div>
          {(this.props.blog.user === undefined || this.props.blog.user._id === this.props.user.id)
              && <button
                   onClick={this.delete}
                   style={deleteButtonStyle}>
                     delete
                </button>
          }
          <CommentsForm blogId={this.props.blog._id} />
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = (state, props) => {
  if (!state.blogs) {
    return { blog: null, user: state.login.user }
  }
  const blog = state.blogs.filter(blog =>
    blog._id === props.blogId)[0]
  return { blog, user: state.login.user }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    likeBlog: (blog) => dispatch(likeBlog(blog)),
    deleteBlog: (id) => dispatch(deleteBlog(props.blogId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Blog)
