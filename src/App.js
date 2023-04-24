import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import Missing from './components/Missing';

import { format } from 'date-fns';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const filteredResults = posts.filter(
      post =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = e => {
    e.preventDefault();

    // Set and id based on the previous posts
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    // Find datetime
    const datetime = format(new Date(), 'MMMM dd yyyy pp');
    // create the new post
    const newPost = { id, title: postTitle, datetime, body: postBody };
    // create a new array with all posts
    const allPosts = [...posts, newPost];
    // update the post array
    setPosts(allPosts);
    // Clear the fields in the form
    setPostTitle('');
    setPostBody('');
    // Go back to the frontpage
    navigate('/');
  };

  const handleDelete = id => {
    const postsList = posts.filter(post => post.id !== id);

    setPosts(postsList);
    navigate('/');
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
