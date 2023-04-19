import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import Missing from './components/Missing';

import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  return (
    <>
      <Header />

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route exact path='/post'>
          <PostPage />
        </Route>

        <Route path='/post:id'>
          <NewPost />
        </Route>

        <Route path='/about' component={About} />

        <Route path='*' component={Missing} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
