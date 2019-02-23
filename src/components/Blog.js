import React,{ useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [showAll, setShowAll] = useState(false)
  return(
    <div className='blogItem'>
      {showAll ?
        <div onClick={() => setShowAll(false)} className='blogFull' id='blog'>
          <p className='title'>{blog.title}</p>
          <p>Author: {blog.author}</p>
          <p>Url: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
          <button className='likeButton' onClick ={handleLike}>Like</button>
          {blog.user.username === user.username ?
            <button className='deleteButton' onClick={handleDelete}>Delete</button> :
            <div></div>}
        </div>
        :
        <div onClick={() => setShowAll(true)} className='blogTitle' id='blog'>
          <p className='title'>{blog.title}</p>
        </div>
      }
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}


export default Blog