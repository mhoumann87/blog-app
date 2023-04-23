import { useParams, Link } from 'react-router-dom';

const PostPage = ({ posts, handelDelete }) => {
  const { id } = useParams();

  const post = posts.find(post => post.id.toString() === id);

  return (
    <main className='single-post'>
      <article className='post'>
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className='small'>Posted at: {post.datetime}</p>
            <p>{post.body}</p>
            <button onClick={() => handelDelete(post.id)}>Delete Post</button>
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
