import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog.js'

describe('<Blog />', () => {
  const blog = {
    _id: "5b3ffba70c4a5a0b324cf400",
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      _id: "5b3eb72b6b70b2348976c57a",
      name: "Don Knuth",
      username: "dknuth"
    }
  }

  const mockUpdateBlog = jest.fn()
  const mockDeleteBlog = jest.fn()

  it('renders only title and author by default', () => {
    const BlogComponent = shallow(<Blog
      blog={blog}
      updateBlog={mockUpdateBlog}
      deleteBlog={mockDeleteBlog}
      showDeleteButton={false}
    />)

    const div = BlogComponent.find('.simpleInfo')
    expect(div.text()).toBe(`${blog.title} by ${blog.author}`)
  })

  it('after clicking full info is rendered', () => {
    const BlogComponent = shallow(<Blog
      blog={blog}
      updateBlog={mockUpdateBlog}
      deleteBlog={mockDeleteBlog}
      showDeleteButton={false}
    />)

    const div = BlogComponent.find('.simpleInfo')

    const mockEvent = { target: { tagName: 'DIV' } }
    div.simulate('click', mockEvent)

    const titleAndAuthorDiv = BlogComponent.find('.titleAndAuthor')
    const urlA = BlogComponent.find('a')
    const likesDiv = BlogComponent.find('.likes')
    const addedByDiv = BlogComponent.find('.addedBy')

    expect(titleAndAuthorDiv.text()).toBe(`${blog.title} by ${blog.author}`)
    expect(urlA.text()).toBe(blog.url)
    expect(likesDiv.text()).toContain(`${blog.likes} likes`)
    expect(addedByDiv.text()).toContain(`added by ${blog.user.name}`)
  })
})
