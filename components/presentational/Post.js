import PropTypes from 'prop-types'

function Post ({ postData, index }) {
  return (
    <li key={index}>
      <article className="post">
        <header className="post__header">
          <h2 className="post__title">{postData.title}</h2>
        </header>
        <div className="post__message">{postData.message}</div>
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
            )}
            by {postData.author.name}
          </p>
        </footer>
      </article>
    </li>
  )
}

Post.proptypes = {
  postData: PropTypes.array.isRequired
}

export default Post
