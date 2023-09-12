import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import {  BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Header from './components/header/Header';
import MainPage from './components/mainpage/MainPage';
import Footer from './components/footer/Footer';
import {Server} from './server/server';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserList from './components/users';
import { AuthProvider, AuthorizationContext } from "./ContextAPI";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './server/FireBase';
import ProtectedRoute from './components/ProtectedRoute';
import WebPage from './components/mainpage/WebPage';
import FriendRequestReceived from './components/FriendResuests/FriendRequestsReceived';
import FriendRequestSent from './components/FriendResuests/FriendRequestsSent';
import Followers from './components/Followers/Followers';
import Following from './components/Following/Following';
function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header></Header>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/SocialShare" element={<ProtectedRoute><WebPage /></ProtectedRoute>} />
            <Route path="/FriendRequestsReceived" element={<FriendRequestReceived />} />
            <Route path="/FriendRequestSent" element={<FriendRequestSent />} />
            <Route path="/Followers" element={<Followers />} />
            <Route path="/Following" element={<Following />} />
            <Route path="/users" element={<UserList />} />

          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
