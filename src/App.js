import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [writer, setWriter] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setError] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('bloglistUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
        const user = await loginService.login({ username, password})
        setUser(user)
        blogService.setToken(user.token)
        window.localStorage.setItem('bloglistUser', JSON.stringify(user))
        setUserName('')
        setPassword('')
    } catch(exception){
      console.log(exception)
      setError('Log in was unsuccessfull. Invalid password or username')
      setTimeout(() => {
        setError(null)
      },5000)
      setPassword('')
      setUserName('')
    }
  }
  const handleAddBlog = async (event) => {
    event.preventDefault()
    
    const newBlog = {
      title, 
      author: writer,
      url,
    }
    try{
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      setError('New blog succesfully added!')
      setTimeout(() => {
        setError(null)
      },5000)
      setTitle('')
      setWriter('')
      setUrl('')
    } catch(exception){

      console.log(exception)
      setError('Error: Unable to add new blog')
      setTimeout(() => {
        setError(null)
      },5000)
    }

  }
  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('bloglistUser')
  }
  const blogForm = () => (
    <Togglable buttonLabel = 'Add New'>
        <BlogForm
          handleAddBlog={handleAddBlog}
          titleChange={({target}) => setTitle(target.value)}
          authorChange={({target}) => setWriter(target.value)}
          urlChange={({target}) => setUrl(target.value)}
          title={title}
          author={writer}
          url={url}
        />
      </Togglable>
  )


  if(user === null){
    return (
      <div id='App'>
        <h1>BlogList</h1>
        <p id='error'>{errorMessage}</p>
        <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <div className='input'>
          <input
            type='text'
            value={username}
            placeholder='Username'
            name='Username'
            onChange={({ target }) => setUserName(target.value)}
           >
          </input>
        </div>
        <div className='input'>
          <input
            type='password'
            value={password}
            placeholder='Password'
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          >
          </input>
        </div>
        <button type="submit">Log In</button>
      </form>
      </div>
    )
  }
  return (
    <div id='App'>
      <h1>blogs</h1>
      <h3>Welcome {user.name}!</h3>
      <button onClick={logout}>Log out</button>
      <p id='error'>{errorMessage}</p>
      {blogForm()}
      {blogs.map(blog =>
      <Blog key={blog.id} blog={blog}/>)}
    </div>
  )
  
}


export default App