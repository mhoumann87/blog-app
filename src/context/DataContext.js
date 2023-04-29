import { createContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from '../api/posts';
import useAxiosFetch from '../hooks/useAxiosFetch';

import { useNavigate } from 'react-router-dom';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  const navigate = useNavigate();

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
        search,
        setSearch,
        isLoading,
        fetchError,
        searchResults,
        posts,
        setPosts,
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
