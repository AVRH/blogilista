import React,{useState} from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [showAll, setShowAll] = useState(false)
  
  return(
  <div className='blogItem'>
  {showAll ? 
  <div onClick={() => setShowAll(false)} className='blog'>
    <p className='title'>{blog.title}</p>
    <p>Author: {blog.author}</p>
    <p>Url: {blog.url}</p>
    <p>Likes: {blog.likes}</p>
  <button className='likeButton' onClick ={handleLike}>Like</button>
  <button className='deleteButton' onClick={handleDelete}>Delete</button>
  </div>
  :
  <div onClick={() => setShowAll(true)} className='blog'>
    <p>{blog.title} </p>
  </div>
  }
  </div>
  )
}

export default Blog