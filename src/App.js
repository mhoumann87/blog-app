import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import Missing from './components/Missing';

import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [search, setSearch] = useState('');
  return (
    <>
      <Header title={'Blog APP'} search={search} setSearch={setSearch} />

      <Routes>
        <Route path='/*' element={<Home />} />

        <Route path='/post' element={<NewPost />} />

        <Route path='/post:id' element={<PostPage />} />

        <Route path='/about' element={<About />} />

        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
