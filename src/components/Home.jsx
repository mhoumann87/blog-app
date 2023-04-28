import Feed from './Feed';

const Home = ({ posts, fetchError, isLoading }) => {
  return (
    <main className='home'>
      {isLoading && (
        <div className='spinner-box grid'>
          <div className='spinner'></div>
        </div>
      )}

      {fetchError && <h3 className='error'>Error: {fetchError}</h3>}

      {!isLoading && !fetchError && posts.length ? (
        <div className='blog-posts grid'>
          <Feed className='post' posts={posts} />
        </div>
      ) : (
        <h3>No Posts To Show</h3>
      )}
    </main>
  );
};
export default Home;
