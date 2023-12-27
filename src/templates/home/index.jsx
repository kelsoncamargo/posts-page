import { useCallback, useEffect, useState } from 'react';

import './style.css';

import { loadPosts } from '../../utils/load-posts.js';
import { Posts } from '../../components/Posts/index.jsx';
import { Button } from '../../components/Button/index.jsx';
import { Input } from '../../components/Input/index.jsx';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [searchValue, setSearchValue] = useState('');


  const noMorePosts = page + postsPerPage >= allPosts.length

  const filteredPosts = !!searchValue ? 
  allPosts.filter(post => {
    return post.title
    .toLowerCase()
    .includes(searchValue.toLowerCase())
  })
  : 
  posts

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
      const postsAndPhotos = await loadPosts()
      setPosts(postsAndPhotos.slice(page, postsPerPage))
      setAllPosts(postsAndPhotos)
  }, []) 

  const loadMorePosts = async () => {
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

    posts.push(...nextPosts)

    setPosts(posts)
    setPage(nextPage)
  }

  const handleChange = e => {
    const {value} = e.target
    setSearchValue(value)
  }

  useEffect(() => {
    handleLoadPosts(0, postsPerPage)
  }, [postsPerPage])
  
  return(
    <main id="main-page">
      <Input 
        handleChange = {handleChange }
        searchValue = {searchValue}
        textPlaceHolder = {'Write your search'}
      />
      {
        filteredPosts.length > 0 ? 
          <Posts
          posts = {filteredPosts}
          />
        :
          <p>Não existe posts</p>

      }
      {!searchValue && (
        <Button
          text_button = "Load More Posts"
          onClick = {loadMorePosts}
          disabled = {noMorePosts}
        />
      )}
    </main>
  )

}