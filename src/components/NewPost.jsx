const NewPost = ({
  postTitle,
  setPostTitle,
  postBody,
  setPostBody,
  handleSubmit,
}) => {
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
