import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const USERS_URL = process.env.REACT_APP_SERVER_API_URL;
const SERVER_API_URL = `${USERS_URL}`;

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_API_URL}/login`, formData, { withCredentials: true });
      onLogin(response.data.user);
      navigate('/home'); // Redirect to home page
    } catch (error) {
      console.log(error);
      alert('Login failed.');
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
      <Link to="/register" className="btn btn-link">Don't have an account? Register</Link>
      <Button type="submit">Login</Button>
      
        </Form>
      </div>
    </Container>
  );
};

export default Login;
