import { Link } from 'react-router-dom';

const Nav = ({ search, setSearch }) => {
  return (
    <nav>
      <div className='nav-box flex'>
        <ul className='flex'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='post'>New Post</Link>
          </li>
          <li>
            <Link to='about'>About</Link>
          </li>
        </ul>
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
    </nav>
  );
};
export default Nav;
