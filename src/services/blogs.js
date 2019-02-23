import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)  
  return response.data
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const modify = async changedBlog => {
  const blogObject = {
    title: changedBlog.title,
    author: changedBlog.author,
    url: changedBlog.url,
    likes: changedBlog.likes + 1,
    user: changedBlog.user.id
  }
  const response = await axios.put(`${baseUrl}/${changedBlog.id}`, blogObject)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log(response.data)
  return response.data
}
export default { getAll, setToken, create, modify, remove }