import Feed from './Feed';

const Home = ({ posts }) => {
  return (
    <main className='home'>
      <h2>Our Blog Posts</h2>
      <div className='blog-posts grid'>
        {posts.length ? (
          <Feed posts={posts} />
        ) : (
          <h2>There are no posts at this moment</h2>
        )}
      </div>
    </main>
  );
};
export default Home;
