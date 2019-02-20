import React,{useState} from 'react'

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)
  
  return(
  <div>
  {showAll ? 
  <div onClick={() => setShowAll(false)} className='blog'>
    <p> <span className='title'>{blog.title}</span> {blog.author}</p>
    <p>{blog.url}</p>
    <p>{blog.likes}</p>
  <button className='likeButton'>Like</button>
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