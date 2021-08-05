import Router from 'next/router'
import ReactMarkdown from 'react-markdown'

const Post = ({ post }) => {
  //const authorName = post.name ? post.name : 'Unknown App'
  return (
    <div onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
      <h2>{post.name}</h2>
      <ReactMarkdown source={post.url} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  )
}

export default Post