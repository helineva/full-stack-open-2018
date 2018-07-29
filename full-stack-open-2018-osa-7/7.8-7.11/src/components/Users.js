import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Users extends React.Component {
  render() {
    if (this.props.users) {
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
                {this.props.users.map(user => {
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
    return null
  }
}

const mapStateToProps = (state) => {
  return { users: state.users }
}

export default connect(mapStateToProps)(Users)
