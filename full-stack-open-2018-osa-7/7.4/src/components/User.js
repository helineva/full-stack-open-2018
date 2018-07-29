import React from 'react'
import userService from '../services/users.js'

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    userService.getById(this.props.userId).then(user => {
      this.setState({ user });
    });
  }

  render() {
    if (this.state.user) {
      return (
        <div>
          <h2>{this.state.user.name}</h2>
          <h3>Added blogs</h3>
          <ul>
            {this.state.user.blogs.map(blog => {
              return <li key={blog._id}>{blog.title} by {blog.author}</li>
            })}
          </ul>
        </div>
      )
    }
    return null
  }
}

export default User
