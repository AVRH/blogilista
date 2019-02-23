import Blog from './Blog'
import React from 'react'
import { render, fireEvent, testHook, cleanup } from 'react-testing-library'
const blog = {
  title: 'test',
  author: 'John Doe',
  url: 'www.blog.fi',
  likes: 1,
  user: {
    username: 'tester',
    name: 'Jane Doe',
    id: 1
  }
}
const user = {
  username: 'tester',
  name: 'Jane Doe',
  id: '1'
}
const onClick = () => {
  console.log('test function')
}
const onClick2 = () => {
  console.log('test function2')
}
let component

beforeEach(() => {
  component = render(
    <Blog
      blog={blog}
      handleLike={onClick}
      handleDelete={onClick2}
      user={user} />
  )
})
afterEach(cleanup)

describe('Blog component', () => {
  test('Only title is shown at first', () => {
    component.container.querySelector('.blogTitle')
  })
  test('After div is clicked, all information is shown', () => {
    const div = component.container.querySelector('.blogTitle')
    fireEvent.click(div)
    component.container.querySelector('.blogFull')
  })
})