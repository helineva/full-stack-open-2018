import React from 'react'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
import Notification from './components/notification'
import blogService from './services/blogs'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      notificationMsg: null,
      notificationClass: null
    }
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.state.user = user
      blogService.setToken(user.token)
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs => {
      this.setState({ blogs: blogs.sort(this.compareBlogs) })
    })
  }

  setUser = (user) => {
    window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
    this.setState({ user })
    blogService.setToken(user.token)
  }

  logout = (event) => {
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    this.setState({ user: null })
  }

  addBlog = (blog) => {
    this.setState({
      blogs: this.state.blogs.concat(blog).sort(this.compareBlogs)
    })
    const msg = `a new blog '${blog.title}' by ${blog.author} added`
    this.setNotification(msg, 'note')
  }

  updateBlog = (blog) => {
    const blogs = this.state.blogs.map(b => {
      return b._id === blog._id ? blog : b
    })
    blogs.sort(this.compareBlogs)
    this.setState({ blogs })
  }

  deleteBlog = (blog) => {
    const blogs = this.state.blogs.filter(
      b => b._id !== blog._id)
    blogs.sort(this.compareBlogs)
    this.setState({ blogs })
  }

  setNotification = (notificationMsg, notificationClass) => {
    this.setState({ notificationMsg, notificationClass })
    setTimeout(() => {
      this.setState({
        notificationMsg: null,
        notificationClass: null
      })
    }, 5000)
  }

  compareBlogs = (blog1, blog2) => {
    if (blog2.likes !== blog1.likes) {
      return blog2.likes - blog1.likes
    }
    return blog1.title > blog2.title
  }

  render() {
    return (
      <Router>
        <div>
          <h1>Bloglist</h1>
          {this.state.user !== null &&
            <Menu user={this.state.user}
              logout={this.logout} />
          }
          <Notification
            className={this.state.notificationClass}
            msg={this.state.notificationMsg} />
          {this.state.user === null
            ? <Switch>
                <Route path='/login' render={() =>
                  <LoginForm
                    setUser={this.setUser}
                    setNotification={this.setNotification} />
                  }
                />
                <Redirect from='/' to='/login' />
              </Switch>
            : <Switch>
                <Redirect from='/login' to='/blogs' />
                <Redirect exact from='/' to='/blogs' />
                <Route exact path='/blogs' render={() =>
                  <BlogsForm
                    blogs={this.state.blogs}
                    addBlog={this.addBlog} />
                } />
                <Route exact path='/blogs/:id' render={({ match, history }) =>
                  <Blog
                    blogId={match.params.id}
                    history={history}
                    user={this.state.user}
                    updateBlog={this.updateBlog}
                    deleteBlog={this.deleteBlog}
                    setNotification={this.setNotification} />
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

export default App;
