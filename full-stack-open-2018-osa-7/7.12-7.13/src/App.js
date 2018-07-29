import React from 'react'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
import Notification from './components/Notification'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { notify } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { checkLocalStorage, logout } from './reducers/loginReducer'
import { connect } from 'react-redux'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.checkLocalStorage()
  }

  componentDidMount() {
    this.props.initializeBlogs()
    this.props.initializeUsers()
  }

  render() {
    if (!this.props.resolved) {
      return null
    }
    return (
      <Router>
        <div>
          <h1>Bloglist</h1>
          {this.props.user !== null &&
            <Menu user={this.props.user}
              logout={this.props.logout} />
          }
          <Notification />
          {this.props.user === null
            ? <Switch>
                <Route path='/login' render={() =>
                  <LoginForm />
                } />
                <Redirect from='/' to='/login' />
              </Switch>
            : <Switch>
                <Redirect from='/login' to='/blogs' />
                <Redirect exact from='/' to='/blogs' />
                <Route exact path='/blogs' render={() =>
                  <BlogsForm />
                } />
                <Route exact path='/blogs/:id' render={({ match, history }) =>
                  <Blog
                    blogId={match.params.id}
                    history={history} />
                } />
                <Route exact path='/users' render={() =>
                  <Users />}
                />
                <Route exact path='/users/:id' render={({ match }) =>
                  <User userId={match.params.id} />
                } />
              </Switch>
          }
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.login.user, resolved: state.login.resolved }
}

export default connect(
  mapStateToProps,
  { notify, initializeUsers, initializeBlogs, checkLocalStorage, logout })(App);
