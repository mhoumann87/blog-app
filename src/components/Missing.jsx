import { Link } from 'react-router-dom';
import img404 from '../images/img404.png';

const Missing = () => {
  return (
    <main className='missing-page'>
      <img src={img404} alt="We couldn't find the page you were looking for." />
      <Link to={'/'}>Back to the Frontpage</Link>
    </main>
  );
};
export default Missing;
