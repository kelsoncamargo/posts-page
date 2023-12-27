import './style.css'

export const PostCard = (props) => {

  const { post } = props
  
  return(
    <div className="box-post_content">
      <div className='box-post_img'>
        <img src={post.cover} alt={post.title}/>
      </div>
      <div className="box-post_word">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    </div>
  )
}