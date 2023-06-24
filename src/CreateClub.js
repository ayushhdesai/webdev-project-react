import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const CreateClub = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/create-club', formData, { withCredentials: true });
      alert('Club created successfully!');
    } catch (error) {
      alert('Failed to create club.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Club Name</Form.Label>
          <Form.Control type="text" name="name" onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" name="description" onChange={handleChange} />
        </Form.Group>

        <Button type="submit">Create Club</Button>
      </Form>
    </Container>
  );
};

export default CreateClub;
