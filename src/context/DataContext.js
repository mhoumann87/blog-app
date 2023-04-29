import { createContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from '../api/posts';
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';

import { Route, Routes, useNavigate } from 'react-router-dom';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  const navigate = useNavigate();

  const { width } = useWindowSize();

  const { data, fetchError, isLoading } = useAxiosFetch(
    'http://localhost:3500/posts'
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(
      post =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

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
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        isLoading,
        fetchError,
        searchResults,
        posts,
        postBody,
        setPostBody,
        postTitle,
        setPostTitle,
        handleSubmit,
        handleEdit,
        editBody,
        editTitle,
        setEditBody,
        setEditTitle,
        handleDelete,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
