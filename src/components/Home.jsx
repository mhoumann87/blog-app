import Feed from './Feed';
import { useStoreState } from 'easy-peasy';

const Home = ({ fetchError, isLoading }) => {
  const searchResults = useStoreState(state => state.searchResults);

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
