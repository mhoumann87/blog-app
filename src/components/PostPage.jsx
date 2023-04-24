import { useParams, Link } from 'react-router-dom';

const PostPage = ({ posts, handelDelete }) => {
  const { id } = useParams();

  const post = posts.find(post => post.id.toString() === id);

  return (
    <main className='single-post shadow'>
      <article>
        {post && (
          <>
            <div className='header-box flex'>
              <h2>{post.title}</h2>
              <p className='small'>Posted at: {post.datetime}</p>
            </div>
            <div className='post-body'>
              <p>{post.body}</p>
              <button className='shadow' onClick={() => handelDelete(post.id)}>
                Delete Post
              </button>
            </div>
          </>
        )}
        {!post && (
          <>
            <h3>The post in nowhere to find</h3>
            <p>
              That is truly embarrassing, and I will go to my corner and think
              about what I have done{' '}
            </p>
            <Link to={'/'}>Instead you can visit our frontpage</Link>
          </>
        )}
      </article>
    </main>
  );
};
export default PostPage;
