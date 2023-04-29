import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../api/posts';
import DataContext from '../context/DataContext';

const NewPost = () => {
  const { posts, setPosts } = useContext(DataContext);

  const navigate = useNavigate();

  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    // Set and id based on the previous posts
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    // Find datetime
    const datetime = format(new Date(), 'MMMM dd yyyy pp');
    // create the new post
    const newPost = { id, title: postTitle, datetime, body: postBody };
    // Update the database
    try {
      const response = await api.post('/posts', newPost);
      // create a new array with all posts
      const allPosts = [...posts, response.data];
      // update the post array
      setPosts(allPosts);
      // Clear the fields in the form
      setPostTitle('');
      setPostBody('');
      // Go back to the frontpage
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err}`);
    }
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
