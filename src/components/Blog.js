import React,{useState} from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [showAll, setShowAll] = useState(false)
  
  return(
  <div>
  {showAll ? 
  <div onClick={() => setShowAll(false)} className='blog'>
    <p> <span className='title'>{blog.title}</span> {blog.author}</p>
    <p>{blog.url}</p>
    <p>{blog.likes}</p>
  <button className='likeButton' onClick ={handleLike}>Like</button>
  <button className='deleteButton' onClick={handleDelete}>Delete</button>
  </div>
  :
  <div onClick={() => setShowAll(true)} className='blog'>
    <p>{blog.title} {blog.author}</p>
  </div>
  }
  </div>
  )
}

export default Blog