import './style.css'

import { PostCard } from "../PostCard"

export const Posts = (props) => {
  const { posts } = props
  return(
    <section id="section-posts">
      {
        posts.map(
          post => (
            <PostCard
            key={post.id}
            post = { post } 
            />
          )
        )
      }
    </section>
  )
}