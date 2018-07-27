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
})
