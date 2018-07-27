import React from 'react'
import Blog from './components/Blog'
import CreateBlogForm from './components/createblogform'
import Notification from './components/notification'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      notificationMsg: null,
      notificationClass: null,
      loginFormVisible: false
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs: blogs.sort(this.compareBlogs) })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      this.setState({ user })
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        notificationMsg: 'invalid username or password',
        notificationClass: 'error',
      })
      this.setTimeoutForNotification()
    }
  }

  logout = (event) => {
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    this.setState({ user: null })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = (blog) => {
    const msg = `a new blog '${blog.title}' by ${blog.author} added`
    this.setState({
      notificationMsg: msg,
      notificationClass: 'note',
      blogs: this.state.blogs.concat(blog).sort(this.compareBlogs)
    })
    this.setTimeoutForNotification()
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

  setTimeoutForNotification = () => {
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
    const loginForm = () => {
      if (this.state.loginFormVisible) {
        return (
          <div>
            <h2>Log in to application</h2>
            <form onSubmit={this.login}>
              <div>
                username:
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleLoginFieldChange}
                />
              </div>
              <div>
                password:
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleLoginFieldChange}
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
        <div>
          <button onClick={e => this.setState({ loginFormVisible: true })}>
            login
          </button>
        </div>
      )
    }

    const blogsForm = () => {
      return (
        <div>
          <h2>blogs</h2>
            <p>
              {this.state.user.name} logged in
              <button onClick={this.logout}>logout</button>
            </p>
            {this.state.blogs.map(blog =>
              <Blog
                key={blog._id}
                blog={blog}
                updateBlog={this.updateBlog}
                deleteBlog={this.deleteBlog}
              />
            )}
            <CreateBlogForm addBlog={this.addBlog}/>
        </div>
      )
    }

    return (
      <div>
        <h1>Welcome to Bloglist!</h1>
        <Notification
          className={this.state.notificationClass}
          msg={this.state.notificationMsg} />
        {this.state.user === null
          ? loginForm()
          : blogsForm()}
      </div>
    )
  }
}

export default App;
