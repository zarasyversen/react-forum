import PropTypes from 'prop-types'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

function Post ({ postData, canEdit, index }) {
  const [showEdit, setShowEdit] = useState(false)

  useEffect(() => {

    /// if its from index postlist, it passes the user so need to check if its an object, dont have anything else available
    /// from profile page, it is passing canEdit from the data which is a bool
    if (typeof(canEdit) === 'object') {
      if(canEdit.id === postData.author.id || canEdit.isAdmin) {
        setShowEdit(true);
      }
    } else {
      setShowEdit(canEdit);
    }
  }, [canEdit])
  
  return (
    <li key={index}>
      <article className="post">
        <header className="post__header">
          <h2 className="post__title">{postData.title}</h2>
        </header>
        <div className="post__message">
          <ReactMarkdown>{postData.message}</ReactMarkdown>
        </div>
        <footer className="post__footer">
          <p className="post__details">
            {postData.updatedDate && (
              <>
                Updated <time dateTime={postData.updatedDate}>{postData.updatedDate}</time>
              </>
            )}
            {!postData.updatedDate && (
              <>
                Posted <time dateTime={postData.createdDate}>{postData.createdDate}</time>
              </>
            )} by <Link href={`/profile/${postData.author.name}`}><a>{postData.author.name}</a></Link>. 
            {showEdit && (
             <Link href={`/post/${postData.postId}/edit/`}><a>Edit</a></Link>
            )} 
          </p>
        </footer>
      </article>
    </li>
  )
}

Post.propTypes = {
  postData: PropTypes.object.isRequired,
  canEdit: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  index: PropTypes.number
}

export default Post
