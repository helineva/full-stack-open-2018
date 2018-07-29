import React from 'react'
import { notify } from '../reducers/notificationReducer'
import { addComment } from '../reducers/blogReducer'
import { connect } from 'react-redux'

class CommentsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
  }

  add = (event) => {
    event.preventDefault();
    if (!this.state.content) {
      return
    }
    try {
      this.props.addComment(this.state.content)
      const msg = `comment '${this.state.content}' added`
      this.props.notify(msg, 'note', 5)
      this.setState({ content: '' })
    } catch (exception) {
      console.log(exception)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ content: event.target.value })
  }

  render() {
    if (this.props.blog) {
      return (
        <div>
          <h3>Comments</h3>
          <ul>
            {this.props.blog.comments.map((comment, index) =>
              <li key={index}>{comment}</li>
            )}
          </ul>
          <form onSubmit={this.add}>
            <input
              type="text"
              value={this.state.content}
              onChange={this.handleFieldChange}
            />
            <button type="submit">add comment</button>
          </form>
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = (state, props) => {
  if (!state.blogs) {
    return { blog: null }
  }
  const blog = state.blogs.filter(blog =>
    blog._id === props.blogId)[0]
  return { blog }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    notify: (msg, cl, time) => dispatch(notify(msg, cl, time)),
    addComment: (content) => dispatch(addComment(props.blogId, content))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(CommentsForm);
