import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import EditPost from './components/EditPost';
import About from './components/About';
import Missing from './components/Missing';
import { DataProvider } from './context/DataContext';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Header title={'Blog APP'} />
      <DataProvider>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/post' element={<NewPost />} />

          <Route path={'/edit/:id'} element={<EditPost />} />

          <Route path='/post/:id' element={<PostPage />} />

          <Route path='/about' element={<About />} />

          <Route path='*' element={<Missing />} />
        </Routes>
      </DataProvider>
      <Footer />
    </>
  );
}

export default App;
