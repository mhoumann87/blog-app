import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const PostPage = () => {
  const { posts, handleDelete } = useContext(DataContext);

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
              <div className='flex'>
                <Link to={`/edit/${post.id}`}>
                  <button className='edit-but shadow'>Edit Post</button>
                </Link>
                <button
                  className='del-but shadow'
                  onClick={() => handleDelete(post.id)}>
                  Delete Post
                </button>
              </div>
            </div>
          </>
        )}
        {!post && (
          <>
            <div className='header-box flex'>
              <h3>The post in nowhere to find</h3>
            </div>
            <div className='post-body'>
              <p>
                That is truly embarrassing, and I will go to my corner and think
                about what I have done{' '}
              </p>
              <Link to={'/'} className='home-link'>
                Instead you can visit our frontpage
              </Link>
            </div>
          </>
        )}
      </article>
    </main>
  );
};
export default PostPage;
