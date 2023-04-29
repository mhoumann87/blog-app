import { Link } from 'react-router-dom';
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import useWindowSize from '../hooks/useWindowSize';

import Nav from './Nav';

const Header = ({ title }) => {
  const { width } = useWindowSize();
  return (
    <header>
      <div className='container flex'>
        <div className='flex'>
          <Link to={'/'}>
            <h1>{title}</h1>
          </Link>
          {width < 768 ? (
            <FaMobileAlt className='icon' />
          ) : width < 992 ? (
            <FaTabletAlt className='icon' />
          ) : (
            <FaLaptop className='icon' />
          )}
        </div>

        <Nav />
      </div>
    </header>
  );
};
export default Header;
