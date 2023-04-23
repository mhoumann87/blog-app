import Feed from './Feed';

const Home = ({ posts }) => {
  return (
    <main className='home'>
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <h2>There are no posts at this moment</h2>
      )}
    </main>
  );
};
export default Home;
