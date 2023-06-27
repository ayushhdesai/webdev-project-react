import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { FiUser, FiSearch, FiClipboard, FiPlus } from 'react-icons/fi';
import WebFont from 'webfontloader';

const SERVER_API_URL = 'https://webdev-project-node-dl4u.onrender.com';

const Announcement = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Cinzel:400,700', 'sans-serif'],
      },
    });
    fetchAnnouncements();
    fetchCurrentUser();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${SERVER_API_URL}/announcements`);
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements', error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`${SERVER_API_URL}/current-user`, { withCredentials: true });
      setUserId(response.data._id); // Assuming the user object has an _id field
    } catch (error) {
      console.error('Error fetching current user', error);
    }
  };

  const createAnnouncement = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${SERVER_API_URL}/announcements/create-announcement`, {
        title,
        content,
      }, { withCredentials: true });
      setTitle('');
      setContent('');
      fetchAnnouncements();
    } catch (error) {
      console.error('Error creating announcement', error);
    }
  };

  const deleteAnnouncement = async (id) => {
    try {
      await axios.delete(`${SERVER_API_URL}/announcements/${id}`, { withCredentials: true });
      fetchAnnouncements();
    } catch (error) {
      console.error('Error deleting announcement', error);
    }
  };
  

  return (
    <div style={{ fontFamily: 'Cinzel, sans-serif', padding: '20px' }}>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Navbar.Brand href="/" style={{ margin: 5, fontFamily: 'Cinzel, sans-serif' }}>TheNovelSociety</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/search"><FiSearch size={20} /> Search Books</Nav.Link>
            <Nav.Link href="/clubs"> Join Clubs</Nav.Link>
            <Nav.Link href="/announcements"><FiClipboard /> Announcements</Nav.Link>
            <Nav.Link href="/profile" className="ml-3">
              <FiUser size={20} /> Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-4">
        <h2>Create Announcement</h2>
        <Form onSubmit={createAnnouncement}>
          <Form.Group controlId="announcementTitle">
            <Form.Control type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          </Form.Group><br/>
          <Form.Group controlId="announcementContent">
            <Form.Control as="textarea" rows={3} placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required />
          </Form.Group><br/>
          <Button variant="primary" type="submit"><FiPlus />Create</Button>
        </Form>

        <h2 className="mt-5">Your Announcements</h2>
        <Row>
          {announcements.map(announcement => (
            announcement.authorId === userId && (
              <Col md={4} key={announcement._id} className="mb-3">
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>{announcement.title}</Card.Title>
                    <Card.Text>{announcement.content}</Card.Text>
                    <small className="text-muted">
                      Created at: {new Date(announcement.createdAt).toLocaleString()}
                    </small><br/>
                    <Button variant="danger" className="mt-2" onClick={() => deleteAnnouncement(announcement._id)}>Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Announcement;
