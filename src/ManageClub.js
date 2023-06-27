import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, ListGroup } from 'react-bootstrap';
import { FiUser, FiSearch,  FiPlus } from 'react-icons/fi';
import WebFont from 'webfontloader';

const SERVER_API_URL = 'https://webdev-project-node-dl4u.onrender.com';

const ManageClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Cinzel:400,700', 'sans-serif'],
      },
    });

    const fetchMyClubs = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/my-clubs`, { withCredentials: true });
        setClubs(response.data.myClubs);
      } catch (error) {
        console.error('Failed to fetch clubs.');
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/current-user`, { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user.');
      }
    };

    fetchMyClubs();
    fetchUser();
  }, []);

  return (
    <div style={{ fontFamily: 'Cinzel, sans-serif', padding: '20px' }}>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Navbar.Brand href="/" style={{ margin: 5, fontFamily: 'Cinzel, sans-serif' }}>TheNovelSociety</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/search"><FiSearch size={20} /> Search Books</Nav.Link>
            {user && (
              <>
                <Nav.Link href="/create-club"><FiPlus />Create Club</Nav.Link>
                <Nav.Link href="/manage-clubs">Manage Clubs</Nav.Link>
                <Nav.Link href="/profile" className="ml-3">
                  <FiUser size={20} /> Profile
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
        <h1>My Clubs</h1>
        <ListGroup>
          {clubs.map(club => (
            <ListGroup.Item key={club._id}>
              <Link to={`/club/${club._id}`}>{club.name}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default ManageClubs;
