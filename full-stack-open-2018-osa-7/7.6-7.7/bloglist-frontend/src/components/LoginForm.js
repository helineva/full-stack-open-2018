import React from 'react';
import loginService from '../services/login'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginFormVisible: false
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      this.props.setUser(user)
    } catch (exception) {
      this.props.setNotification('invalid username or password', 'error')
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    if (this.state.loginFormVisible) {
      return (
        <div className='loginForm'>
          <h2>Log in to application</h2>
          <form onSubmit={this.login}>
            <div>
              username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleFieldChange}
              />
            </div>
            <div>
              password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleFieldChange}
              />
            </div>
            <button type="submit">login</button>
          </form>
          <button onClick={e => this.setState({ loginFormVisible: false })}>
            cancel
          </button>
        </div>
      )
    }
    return (
      <div className='loginForm'>
        <button onClick={e => this.setState({ loginFormVisible: true })}>
          login
        </button>
      </div>
    )
  }
}

export default LoginForm;
