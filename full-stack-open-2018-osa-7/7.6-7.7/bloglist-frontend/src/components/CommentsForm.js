import React from 'react'
import blogService from '../services/blogs'

class CommentsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
  }

  addComment = async (event) => {
    event.preventDefault();
    if (!this.state.content) {
      return
    }
    const comment = { content: this.state.content }
    try {
      const blog = await blogService
        .createComment(this.props.id, comment)
      this.props.setBlog(blog)
      const msg = `comment '${this.state.content}' added`
      this.props.setNotification(msg, 'note')
      this.setState({ content: '' })
    } catch (exception) {
      console.log(exception)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ content: event.target.value })
  }

  render() {
    return (
      <div>
        <h3>Comments</h3>
        <ul>
          {this.props.comments.map(comment =>
            <li key={comment}>{comment}</li>
          )}
        </ul>
        <form onSubmit={this.addComment}>
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
}

export default CommentsForm
