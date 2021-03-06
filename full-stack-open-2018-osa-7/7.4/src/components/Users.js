import React from 'react'
import userService from '../services/users.js'
import { Link } from 'react-router-dom'

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    userService.getAll().then(users => {
      this.setState({ users });
    });
  }

  render() {
    return (
      <div>
        <h2>users</h2>
          <table>
            <thead>
              <tr>
                <th>user</th>
                <th>blogs added</th>
                <th>adult</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map(user => {
                return (
                  <tr key={user._id}>
                    <td><Link to={`/users/${user._id}`}>{user.name}</Link></td>
                    <td>{user.blogs.length}</td>
                    <td>{user.adult ? 'yes' : 'no'}</td>
                  </tr>
                )})
              }
            </tbody>
          </table>
      </div>
    )
  }
}

export default Users
