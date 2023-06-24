import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
      await axios.post('http://localhost:5000/register', formData);
      alert('Registration successful!');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      alert('Registration failed.');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="username" onChange={handleChange} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" onChange={handleChange} />
      </Form.Group>

      <Form.Group>
        <Form.Label>User Type</Form.Label>
        <Form.Control as="select" name="type" onChange={handleChange}>
          <option value="regular">Book Geek</option>
          <option value="author">Author</option>
          <option value="clubOrganizer">Club Organizer</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" name="firstName" onChange={handleChange} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" name="lastName" onChange={handleChange} />
      </Form.Group>
      <Link to="/login" className="btn btn-link">Already have an account? Login</Link>
      <Button type="submit">Register</Button>
      
        </Form>
        
      </div>
    </Container>
  );
};

export default Register;
