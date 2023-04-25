import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import EditPost from './components/EditPost';
import About from './components/About';
import Missing from './components/Missing';

import { format } from 'date-fns';
import api from './api/posts';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const filteredResults = posts.filter(
      post =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchPosts();
  }, []);

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

  const handleDelete = async id => {
    try {
      await api.delete(`/posts/${id}`);
      // Filter out the deleted post
      const postsList = posts.filter(post => post.id !== id);
      // update the posts list
      setPosts(postsList);
      //return to frontpage
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  return (
    <>
      <Header title={'Blog APP'} search={search} setSearch={setSearch} />

      <Routes>
        <Route path='/' element={<Home posts={searchResults} />} />

        <Route
          path='/post'
          element={
            <NewPost
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              handleSubmit={handleSubmit}
            />
          }
        />

        <Route
          path={'/edit/:id'}
          element={
            <EditPost
              posts={posts}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
              handleEdit={handleEdit}
            />
          }
        />

        <Route
          path='/post/:id'
          element={<PostPage posts={posts} handelDelete={handleDelete} />}
        />

        <Route path='/about' element={<About />} />

        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
