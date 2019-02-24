const blogs = [
    {
      id: "5a451df7571c224a31b5c8ce",
      title: "HTML on helppoa",
      author: "John DOe",
      url: 'www.testblog.fi',
      likes: 1,
      user: {
        id: "5a437a9e514ab7f168ddf138",
        username: "testuser",
        name: "Linda Test"
      }
    },
    {
      id: "5a451e21e0b8b04a45638211",
      title: "Selain pystyy suorittamaan vain javascriptiä",
      author: "Jane Doe",
      url: 'www.test.com',
      likes: 2,
      user: {
        id: "5a437a9e514ab7f168ddf138",
        username: "tester",
        name: "John Test"
      }
    }
  ]

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}
  
export default { getAll, setToken }