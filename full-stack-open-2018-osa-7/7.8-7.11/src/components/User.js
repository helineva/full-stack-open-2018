import React from 'react'
import { connect } from 'react-redux'

class User extends React.Component {
  render() {
    if (this.props.user) {
      return (
        <div>
          <h2>{this.props.user.name}</h2>
          <h3>Added blogs</h3>
          <ul>
            {this.props.user.blogs.map(blog =>
              <li key={blog._id}>{blog.title} by {blog.author}</li>
            )}
          </ul>
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = (state, props) => {
  if (!state.users) {
    return { user: null }
  }
  const user = state.users.filter(user =>
    user._id === props.userId)[0]
  return { user }
}

export default connect(mapStateToProps)(User)
