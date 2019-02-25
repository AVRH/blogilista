import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  handleAddBlog,
  author,
  url,
  title
}) => {
  return(
    <form onSubmit={handleAddBlog}>
      <div>
        <input {...title}>
        </input>
      </div>
      <div>
        <input {...author}>
        </input>
      </div>
      <div>
        <input {...url}>
        </input>
      </div>
      <button type='submit'>
            Add
      </button>
    </form>
  )

}

BlogForm.propTypes = {
  handleAddBlog: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url:  PropTypes.object.isRequired
}

export default BlogForm