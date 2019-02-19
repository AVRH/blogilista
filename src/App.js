import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
    }
  }
  const handleAddBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title, 
      author,
      url,
    }
    try{
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch(exception){
      console.log(exception)
    }

  }
  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('bloglistUser')
  }

  if(user === null){
    return (
      <div>
        <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          Username 
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUserName(target.value)}
           >
          </input>
        </div>
        <div>
          Password 
          <input
            type='password'
            value={password}
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
    <div>
      <h2>blogs</h2>
      <h3>Welcome {user.name}!</h3>
      <button onClick={logout}>Log out</button>
      <h3>Add New</h3>
      <div>
        <form onSubmit={handleAddBlog}>
          <div>
          title: <input
            type='text'
            value={title}
            name='title'
            onChange={({target}) => setTitle(target.value)}
          >
          </input>
          </div>
          <div>
            author: <input
              type='text'
              value={author}
              name='author'
              onChange={({target}) => setAuthor(target.value)}
            ></input>
          </div>
          <div>
          url: <input
            type='text'
            value={url}
            name='url'
            onChange={({target}) => setUrl(target.value)}
          >
          </input>
          </div>
          <button >Add</button>
        </form>
      </div>
      {blogs.map(blog =>
      <Blog key={blog.id} blog={blog}/>)}
    </div>
  )
  
}


export default App