import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/current-user', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user.');
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/search">Search Books</Nav.Link>
            {user ? (
              <>
                  <Nav.Link href="/profile">My Profile</Nav.Link>
                  {user.type === 'regular' && (
                    <Nav.Link href="/clubs">Join Clubs</Nav.Link>
                  )}
                  
                  {user.type === 'clubOrganizer' && (
                    <Nav.Link href="/create-club">Create Club</Nav.Link>
                  )}
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Home;
