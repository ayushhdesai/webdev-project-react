import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Navbar, Nav } from 'react-bootstrap';
import { FiUser, FiSearch, FiPlus } from 'react-icons/fi';
import WebFont from 'webfontloader';

const SERVER_API_URL = 'https://webdev-project-node-dl4u.onrender.com';

const CreateClub = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Cinzel:400,700', 'sans-serif'],
      },
    });

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/current-user`, { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user.');
      }
    };

    fetchUser();
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${SERVER_API_URL}/create-club`, formData, { withCredentials: true });
      alert('Club created successfully!');
    } catch (error) {
      alert('Failed to create club.');
    }
  };

  return (
    <div style={{ fontFamily: 'Cinzel, sans-serif', padding: '20px'}}>
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
        <h2>Create Club</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Club Name</Form.Label>
            <Form.Control type="text" name="name" onChange={handleChange} />
          </Form.Group>
              <br/>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" onChange={handleChange} />
          </Form.Group>
          <br />
          <Button type="submit">Create Club</Button>
        </Form>
      </Container>
    </div>
  );
};

export default CreateClub;
