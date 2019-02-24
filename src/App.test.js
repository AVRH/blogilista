import App from './App'
import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')

afterEach(cleanup)

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
}

window.localStorage = localStorageMock

describe('App component', async () => {
  test('If user is not logged in, only login form is shown', async () => {
    const component = render(<App />)
    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.login')
    )
    component.debug()
  })
  test('When user is logged in, list of blogs is shown',async () => {
    const user = {
      username: 'test',
      token: '1231231214',
      name: 'John Doe'
    }
    localStorage.setItem('bloglistUser', JSON.stringify(user))
    const component = render(<App />)
    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.bloglist')
    )
    const blogs = component.container.querySelectorAll('.blogItem')
    expect(blogs.length).toBe(2)
    const title1 = component.getByText('HTML on helppoa')
    expect(title1).toBeDefined()
    const title2 = component.getByText('Selain pystyy suorittamaan vain javascriptiä')
    expect(title2).toBeDefined()
    component.debug()
  })
})