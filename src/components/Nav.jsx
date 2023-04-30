import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Nav = () => {
  const posts = useStoreState(state => state.posts);
  const search = useStoreState(state => state.search);
  const setSearch = useStoreActions(actions => actions.setSearch);
  const setSearchResults = useStoreActions(actions => actions.setSearchResults);
  console.log(posts.length);

  useEffect(() => {
    const filteredResults = posts.filter(
      post =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search, setSearchResults]);

  return (
    <nav>
      <div className='nav-box flex'>
        <div>
          <ul className='nav-list flex'>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/post'}>New Post</Link>
            </li>
            <li>
              <Link to={'/about'}>About</Link>
            </li>
          </ul>
        </div>
        <div>
          <form className='search-form' onAbort={e => e.preventDefault()}>
            <label htmlFor='search' className='sr-only'>
              search posts
            </label>
            <input
              type='text'
              id='search'
              name='search'
              placeholder='Search Posts'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </form>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
