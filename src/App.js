import React from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Header from './Header';
import Layout from './Layout';
import Index from './Pages/Index';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import { UserContextProvider } from './userContext';
import CreatePost from './Pages/CreatePost';
import PostPage from './Pages/PostPage';
import Profile from './Pages/Profile';
import EditPost from './Pages/EditPost';

function App() {  
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>
      <Route index element={<Index />}/>
      <Route path={'/login'} element={<LoginPage />}/>
      <Route path={'/register'} element={<RegisterPage />}/>
      <Route path={'/create'} element={<CreatePost />}/>
      <Route path={'/profile'} element={<Profile />}/>
      <Route path={'/post/:id'} element={<PostPage />}/>
      <Route path={'/edit/:id'} element={<EditPost />}/>
      </Route>
    </Routes>
    </UserContextProvider>
    
  );
}

export default App;
