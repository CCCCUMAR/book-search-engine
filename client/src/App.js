import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

import {setContext} from '@apollo/client/link/context';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';

const link = createHttpLink ({ uri: '/graphql'})

const authLink = setContext ((_, {headers}) => {
  const token = localStorage.getItem('id_token');
  return{
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient ({
  link: authLink.concat(link),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client = {client}>
    <Router>
      <>
        <Navbar />
        <switch>
        
          <Route 
            path='/' 
            element={<SearchBooks />} 
          />
          <Route 
            path='/saved' 
            element={<SavedBooks />} 
          />
          <Route 
            path='*'
            element={<h1 className='display-2'>Wrong page!</h1>}
          />
        </switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
