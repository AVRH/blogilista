import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  handleAddBlog,
  titleChange,
  authorChange,
  urlChange,
  title,
  author,
  url,
}) => {
  return(
    <form onSubmit={handleAddBlog}>
      <div>
        <input
          type='text'
          value={title}
          placeholder='Title'
          name='title'
          onChange={titleChange}
        >
        </input>
      </div>
      <div>
        <input
          type='text'
          value={author}
          placeholder='Author'
          name='author'
          onChange={authorChange}
        ></input>
      </div>
      <div>
        <input
          type='text'
          value={url}
          placeholder='Url'
          name='url'
          onChange={urlChange}
        >
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
  titleChange: PropTypes.func.isRequired,
  authorChange: PropTypes.func.isRequired,
  urlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url:  PropTypes.string.isRequired
}

export default BlogForm