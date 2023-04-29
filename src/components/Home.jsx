import Feed from './Feed';
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const Home = () => {
  const { searchResults, fetchError, isLoading } = useContext(DataContext);

  return (
    <main className='home'>
      {isLoading && (
        <div className='spinner-box grid'>
          <div className='spinner'></div>
        </div>
      )}

      {fetchError && <h3 className='error'>Error: {fetchError}</h3>}

      {!isLoading && !fetchError && searchResults.length ? (
        <div className='blog-posts grid'>
          <Feed className='post' posts={searchResults} />
        </div>
      ) : (
        <h3>No Posts To Show</h3>
      )}
    </main>
  );
};
export default Home;
