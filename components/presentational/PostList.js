import PropTypes from 'prop-types'
import Post from './Post'

function PostList ({ postList, canEdit}) {
  if (!postList || postList.length < 1) {
    return (<p>Sorry, no posts available yet. </p>)
  }
    
  return (
    <ul>
      {
        postList.map(function (post, i) {
          return <Post postData={post} key={i} canEdit={canEdit}/>
        })
      }
    </ul>
  )
}

PostList.propTypes = {
  postList: PropTypes.array.isRequired
}

export default PostList
