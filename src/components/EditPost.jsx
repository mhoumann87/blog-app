import { useEffect, useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../api/posts';
import DataContext from '../context/DataContext';

const EditPost = () => {
  const { posts, setPosts } = useContext(DataContext);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();

  // Get id from parameters
  const { id } = useParams();
  // Get the post to edit
  const post = posts.find(post => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  const handleEdit = async id => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const editedPost = { id, title: editTitle, datetime, body: editBody };

    try {
      const response = await api.put(`/posts/${id}`, editedPost);
      setPosts(
        posts.map(post => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  return (
    <main className='new-post'>
      {editTitle && (
        <>
          <h2>Edit post</h2>

          <form
            className='new-post-form flex'
            onSubmit={e => e.preventDefault()}>
            <label className='small' htmlFor='post-title'>
              Post Title
            </label>
            <input
              name='post-title'
              id='post-title'
              type='text'
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              required
            />
            <label className='small' htmlFor='post-body'>
              Post:
            </label>
            <textarea
              id='post-body'
              name='post-body'
              required
              value={editBody}
              onChange={e => setEditBody(e.target.value)}
            />
            <button
              type='submit'
              onClick={() => handleEdit(post.id)}
              className='shadow'>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <div className='no-edit grid'>
          <h3>I can't find the post you want to edit</h3>
          <p>
            That is not very nice of me, and I know someone are going to yell at
            be later. Don't you worry!
          </p>
          <p>
            In the mean time you can{' '}
            <Link to={'/'}>go back to the frontpage</Link>.
          </p>
        </div>
      )}
    </main>
  );
};
export default EditPost;
