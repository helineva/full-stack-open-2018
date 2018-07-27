import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('before logging in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('only login form and no blogs are shown', () => {
      const loginFormComponent = app.find('.loginForm')
      const blogsFormComponent = app.find('.blogsForm')

      expect(loginFormComponent.length).toBe(1)
      expect(blogsFormComponent.length).toBe(0)
    })
  })

  describe('after logging in', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '123454321',
        name: 'Tess Tester'
      }
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      app = mount(<App />)
    })
    it('blogs are shown', () => {
      setTimeout(() => {
        const blogComponents = app.find('.blog')
        expect(blogComponents.length).toBe(blogService.blogs.length)
      })
    })
  })
})
