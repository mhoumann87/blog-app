import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import EditPost from './components/EditPost';
import About from './components/About';
import Missing from './components/Missing';

import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';
import { Route, Routes } from 'react-router-dom';

function App() {
  const setPosts = useStoreActions(actions => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch(
    'http://localhost:3500/posts'
  );

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);

  return (
    <>
      <Header title={'Blog APP'} />
      <Routes>
        <Route
          path='/'
          element={<Home isLoading={isLoading} fetchError={fetchError} />}
        />

        <Route path='/post' element={<NewPost />} />

        <Route path={'/edit/:id'} element={<EditPost />} />

        <Route path='/post/:id' element={<PostPage />} />

        <Route path='/about' element={<About />} />

        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
