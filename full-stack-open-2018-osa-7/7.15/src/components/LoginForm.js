import React from 'react';
import { notify } from '../reducers/notificationReducer';
import { login } from '../reducers/loginReducer';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginFormVisible: false
    };
  }

  login = (event) => {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    if (this.state.loginFormVisible) {
      return (
        <div>
          <h2>Log in to application</h2>
          <Form onSubmit={this.login}>
            <Form.Field>
              <label>username</label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleFieldChange}
              />
            </Form.Field>
            <Form.Field>
              <label>password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleFieldChange}
              />
            </Form.Field>
            <Button type="submit">login</Button>
            <Button
              type="submit"
              onClick={e => {
                e.preventDefault();
                this.setState({ loginFormVisible: false });}}>
              cancel
            </Button>
          </Form>
        </div>
      );
    }
    return (
      <div>
        <Button onClick={e => this.setState({ loginFormVisible: true })}>
          login
        </Button>
      </div>
    );
  }
}

export default connect(
  null,
  { notify, login })(LoginForm);
