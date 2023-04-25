import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EditPost = ({
  posts,
  handleEdit,
  editBody,
  setEditBody,
  editTitle,
  setEditTitle,
}) => {
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
