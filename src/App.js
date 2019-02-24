import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import  { useField } from './hooks'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [writer, setWriter] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setError] = useState(null)

  const uname = useField('text','username')
  const pw = useField('password','password')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs ))
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
    const username = uname.value
    const password = pw.value
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('bloglistUser', JSON.stringify(user))
    } catch(exception){
      console.log(exception)
      setError('Log in was unsuccessfull. Invalid password or username')
      setTimeout(() => {
        setError(null)
      },5000)
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
  const handleLike = async (blog) => {
    try{
      const response = await blogService.modify(blog)
      setBlogs(blogs.map(blog => blog.id !== response.id ? blog : response))
    }catch(exception){
      console.log(exception)
      setError('Error: like functionality failed')
      setTimeout(() => {
        setError(null)
      },5000)
    }
  }
  const handleDelete = async (id) => {
    if(window.confirm('Click ok to confirm deleting the blog')){
      try{
        const response = await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
      } catch (exception) {
        console.log(exception)
        setError('Deleting the blog was unsuccessfull. You can only delete blogs you have added yourself')
        setTimeout(() => {
          setError(null)
        },5000)
      }
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
        titleChange={( { target }) => setTitle(target.value)}
        authorChange={({ target }) => setWriter(target.value)}
        urlChange={({ target }) => setUrl(target.value)}
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
        <form onSubmit={handleLogin} className='login'>
          <h3>Login</h3>
          <div className='input'>
            <input {...uname}>
            </input>
          </div>
          <div className='input'>
            <input {...pw}>
            </input>
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    )
  }
  return (
    <div id='App' className='bloglist'>
      <div id='header'>
        <h1 id='headerItem'>blogs</h1>
        <h3 id='headerItem'>Welcome {user.name}!</h3>
        <button
          id='headerItem'
          className='logout'
          onClick={logout}>
          Log out
        </button>
      </div>
      <p id='error'>{errorMessage}</p>
      {blogForm()}
      {blogs.sort(function(a,b) {return a.likes < b.likes}).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLike(blog)}
          handleDelete={() => handleDelete(blog.id)}
          user = {user}
        />)}
    </div>
  )
}


export default App