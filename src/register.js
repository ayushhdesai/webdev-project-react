import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiUser, FiLock, FiUsers } from 'react-icons/fi';
import WebFont from 'webfontloader';
const SERVER_API_URL = 'https://webdev-project-node-dl4u.onrender.com';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    type: '',
    firstName: '',
    lastName: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${SERVER_API_URL}/register`, formData);
      alert('Registration successful!');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      alert('Registration failed.');
    }
  };

  // Set background image of the body
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Cinzel:400,700', 'sans-serif'],
      }
    });

    document.body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1526243741027-444d633d7365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80)';
    document.body.style.backgroundSize = 'cover';
    return () => {
      document.body.style.backgroundImage = null;
    };
  }, []);

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', fontFamily: 'Cinzel, sans-serif' }}>
      <Card className="w-100" style={{ maxWidth: '400px', padding: '20px', borderRadius: '10px' }}>
        <h3 className="text-center mb-4" ><FiBookOpen /> Registration</h3>
        <Form onSubmit={handleSubmit}>

          <Form.Group>
            <Form.Label><FiUser /> Username</Form.Label>
            <Form.Control type="text" name="username" onChange={handleChange} style={{ borderColor: '#915f31' }} />
          </Form.Group>

          <Form.Group>
            <Form.Label><FiLock /> Password</Form.Label>
            <Form.Control type="password" name="password" onChange={handleChange} style={{ borderColor: '#915f31' }} />
          </Form.Group>

          <Form.Group>
            <Form.Label>User Type</Form.Label>
            <Form.Control as="select" name="type" onChange={handleChange} style={{ borderColor: '#915f31' }}>
              <option value="regular">Book Geek</option>
              <option value="author">Author</option>
              <option value="clubOrganizer">Club Organizer</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="firstName" onChange={handleChange} style={{ borderColor: '#915f31' }} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastName" onChange={handleChange} style={{ borderColor: '#915f31' }} />
          </Form.Group>

          <Link to="/login" className="btn btn-link d-block mb-2" style={{ color: '#915f31' }}>Already have an account? Login</Link>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" style={{ backgroundColor: '#111111', borderColor: '#111111' }}>
              <FiUsers className="mr-2" /> Register
            </Button>
          </div>

        </Form>
      </Card>
    </Container>
  );
};

export default Register;