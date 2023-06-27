import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav, Container, Card, Row, Col } from 'react-bootstrap';
import { FiUser, FiSearch, FiClipboard, FiPlus } from 'react-icons/fi';
import WebFont from 'webfontloader';


const SERVER_API_URL = 'https://webdev-project-node-dl4u.onrender.com';

const Home = () => {
  const [user, setUser] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);

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
  
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/announcement`);
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Failed to fetch announcements.');
      }
    };

    const fetchRandomBooks = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/random-books`);
        setFeaturedBooks(response.data.items);
      } catch (error) {
        console.error('Failed to fetch random books.');
      }
    };

    fetchRandomBooks();
    fetchUser();
    fetchAnnouncements();
  }, []);
  

  return (
    <div style={{
      fontFamily: 'Cinzel, sans-serif',
      padding: '20px',
      backgroundImage: `url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '100vh'
  }}>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Navbar.Brand href="/" style={{ margin : 5, fontFamily: 'Cinzel, sans-serif'}}>TheNovelSociety</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/search"><FiSearch size={20}/> Search Books</Nav.Link>
            {user ? (
              <>
                {user.type === 'regular' && (
                  <>
                    <Nav.Link href="/clubs">Join Clubs</Nav.Link>
                    <Nav.Link href="/your-clubs">Your Clubs</Nav.Link>
                  </>
                )}
                {user.type === 'author' && (
                  <>
                    <Nav.Link href="/clubs">Join Clubs</Nav.Link>
                    <Nav.Link href="/announcements"><FiClipboard /> Announcements</Nav.Link>
                  </>
                )}
                {user.type === 'clubOrganizer' && (
                  <>
                    <Nav.Link href="/create-club"><FiPlus />Create Club</Nav.Link>
                    <Nav.Link href="/manage-clubs">Manage Clubs</Nav.Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
            {user && (
              <Nav.Link href="/profile" className="ml-3">
                <FiUser size={20} /> Profile
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
              {/* Display Announcements */}
      <Container className="mt-4">
        <h2 style={{color: 'white'}}>Announcements</h2>
        {announcements.length === 0 ? (
          <p>No announcements available.</p>
        ) : (
          announcements.map((announcement) => (
            <Card key={announcement._id} className="mb-3">
              <Card.Body>
                <Card.Title>{announcement.title}</Card.Title>
                <Card.Text>{announcement.content}</Card.Text>
                <small className="text-muted">
                  Posted by: {announcement.authorId ? `${announcement.authorId.firstName} ${announcement.authorId.lastName}` : 'Unknown'}
                </small>
                <p className="text-muted">Created at: {new Date(announcement.createdAt).toLocaleString()}</p>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
      <Container className="mt-4">
  <h2 style={{color: 'white'}}>Featured Books</h2>
  <Row className="featured-books">
    {featuredBooks.map((book) => (
      <Col md={4} className="mb-3">
        <Card className="h-100">
          <Card.Img variant="top" src={book.volumeInfo.imageLinks?.thumbnail} />
          <Card.Body>
            <Card.Title>{book.volumeInfo.title}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>     

    </div>
  );
};

export default Home;
