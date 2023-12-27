import { Component } from 'react';

import './style.css';

import { loadPosts } from '../../utils/load-posts.js';
import { Posts } from '../../components/Posts/index.jsx';
import { Button } from '../../components/Button/index.jsx';
import { Input } from '../../components/Input/index.jsx';

class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 4,
    searchValue: ''
  }

  loadPosts = async () => {
    const {page, postsPerPage} = this.state
    const postsAndPhotos = await loadPosts()
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),  
      allPosts: postsAndPhotos,
    })    
  }

  loadMorePosts = async () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

    posts.push(...nextPosts)

    this.setState({posts, page: nextPage})
  }

  handleChange = e => {
    const {value} = e.target
    this.setState({ searchValue: value })
    console.log(value)
  }

  async componentDidMount(){
    await this.loadPosts()
  }

  render(){
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length
    
    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title
      .toLowerCase()
      .includes(searchValue.toLowerCase())
    })
    : 
    posts

    return(
      <main id="main-page">
        <Input 
          handleChange = { this.handleChange }
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
            onClick = {this.loadMorePosts}
            disabled = {noMorePosts}
          />
        )}
      </main>
    )
  }

}

export default Home;
