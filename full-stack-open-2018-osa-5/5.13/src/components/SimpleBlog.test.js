import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog.js'

describe('<SimpleBlog />', () => {
  it('renders title, author and likes', () => {
    const blog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
    const div = simpleBlogComponent.find('.wrapper')

    expect(div.text()).toContain(blog.title)
    expect(div.text()).toContain(blog.author)
    expect(div.text()).toContain(blog.likes)
  })

  it('clicking the like button twice calls the event handler twice', () => {
    const blog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }

    const mockHandler = jest.fn()
    const simpleBlogComponent = shallow(<SimpleBlog
      blog={blog}
      onClick={mockHandler} />)

    const button = simpleBlogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
