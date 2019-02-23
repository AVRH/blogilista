import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, testHook, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('Author, title and likes are rendered', () => {
  const blog = {
    title: 'Test title',
    author: 'Jane Doe',
    likes: 100
  }
  const onClick = () => {
    console.log('test function')
  }
  const component = render(
    <SimpleBlog blog={blog} onClick={onClick} />
  )
  const titleNAuthor = component.container.querySelector('.title')
  expect(titleNAuthor).toHaveTextContent(
    'Test title Jane Doe'
  )
  const likes = component.container.querySelector('.likes')
  expect(likes).toHaveTextContent(
    'blog has 100 likes'
  )
})

test('Clicking button twice calls handler function twice', () => {
  const blog = {
    title: 'Test title',
    author: 'Jane Doe',
    likes: 100
  }
  const handler = jest.fn()
  const { getByText }= render(
    <SimpleBlog blog={blog} onClick={handler} />
  )
  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(handler.mock.calls.length).toBe(2)
})