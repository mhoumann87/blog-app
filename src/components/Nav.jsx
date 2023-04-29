import { Link } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const Nav = () => {
  const { search, setSearch } = useContext(DataContext);
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
