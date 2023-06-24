import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './register';
import Login from './login';
import Home from './home';
import Profile from './profile';
import Search from './search';
import CreateClub from './CreateClub';
import Clubs from './clubs';
import BookDetails from './BookDetails';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/" element={<Home user={user} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/create-club" element={<CreateClub />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
