import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useStoreState, useStoreActions } from 'easy-peasy';

const NewPost = () => {
  const navigate = useNavigate();

  const posts = useStoreState(state => state.posts);
  const postTitle = useStoreState(state => state.postTitle);
  const postBody = useStoreState(state => state.postBody);

  const savePost = useStoreActions(actions => actions.savePost);
  const setPostTitle = useStoreActions(actions => actions.setPostTitle);
  const setPostBody = useStoreActions(actions => actions.setPostBody);

  const handleSubmit = async e => {
    e.preventDefault();
    // Set and id based on the previous posts
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    // Find datetime
    const datetime = format(new Date(), 'MMMM dd yyyy pp');
    // create the new post
    const newPost = { id, title: postTitle, datetime, body: postBody };
    // Save the post to the database
    savePost(newPost);
    // Send user back to the front page
    navigate('/');
  };

  return (
    <main className='new-post'>
      <h2>Add post</h2>

      <form className='new-post-form flex' onSubmit={handleSubmit}>
        <label className='small' htmlFor='post-title'>
          Post Title
        </label>
        <input
          name='post-title'
          id='post-title'
          type='text'
          value={postTitle}
          onChange={e => setPostTitle(e.target.value)}
          required
        />
        <label className='small' htmlFor='post-body'>
          Post:
        </label>
        <textarea
          id='post-body'
          name='post-body'
          required
          value={postBody}
          onChange={e => setPostBody(e.target.value)}
        />
        <button type='submit' className='shadow'>
          Submit
        </button>
      </form>
    </main>
  );
};
export default NewPost;
