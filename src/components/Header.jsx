import { Link } from 'react-router-dom';

import Nav from './Nav';

const Header = ({ title, search, setSearch }) => {
  return (
    <header>
      <div className='container flex'>
        <Link to={'/'}>
          <h1>{title}</h1>
        </Link>
        <Nav search={search} setSearch={setSearch} />
      </div>
    </header>
  );
};
export default Header;
