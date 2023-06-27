import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Card, Col, Container, Row } from 'react-bootstrap';
import { FiUser, FiSearch } from 'react-icons/fi';
import WebFont from 'webfontloader';

const SERVER_API_URL = 'https://webdev-project-node-dl4u.onrender.com';

const ClubPage = () => {
  const [club, setClub] = useState(null);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const { clubId } = useParams();
  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Cinzel:400,700', 'sans-serif'],
      },
    });
    
    const fetchClubDetails = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/club/${clubId}`);
        setClub(response.data);

        const booksResponse = await axios.get(`${SERVER_API_URL}/club/${clubId}/books`);
        setBooks(booksResponse.data);
      } catch (error) {
        console.error('Failed to fetch club details.');
      }
    };
    const fetchClubAuthors = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/club/${clubId}/authors`);
        setAuthors(response.data);
      } catch (error) {
        console.error('Error fetching club members');
      }
    };

    fetchClubAuthors();
    fetchClubDetails();
  }, [clubId]);

  return (
    <div style={{ fontFamily: 'Cinzel, sans-serif', padding: '20px' }}>
      {/* Navbar */}
      <Navbar expand="lg" variant="dark" bg="dark" style={{ fontFamily: 'Cinzel, sans-serif' }}>
        <Navbar.Brand href="/" style={{ margin: 5 }}>TheNovelSociety</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/search"><FiSearch size={20}/> Search Books</Nav.Link>'
            <Nav.Link href="/your-clubs">Your Clubs</Nav.Link>'
            <Nav.Link href="/profile" className="ml-3">
              <FiUser size={20} /> Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Club Page Content */}
      {club ? (
        <Container style={{ margin: '0 auto', padding: '50px' }}>
          <Row>
            <Col>
              <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>{club.name}</h1>
              <p style={{ textAlign: 'center', fontSize: '18px' }}>{club.description}</p>
            </Col>
          </Row>
          <Row style={{ marginTop: '40px' }}>
            <Col>
              <h2>Authors</h2>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {authors.map(author => (
                  author ? <li key={author._id}>{author.firstName} {author.lastName}</li> : null
                ))}
              </ul>
            </Col>
            <Col>
              <h3>Books:</h3>
              <Row>
  {books.map((book) => (
    <Col key={book._id} md={4} className="mb-2">
      <Card>
        <Card.Img variant="top" src={book.thumbnail} alt={book.title} />
        <Card.Body>
          <Card.Title>
            <Link to={`/book/${book.bookId}`}>{book.title}</Link>
          </Card.Title>
          <Card.Text>by {book.authors.join(', ')}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

            </Col>
          </Row>
        </Container>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '20px' }}>Loading...</p>
      )}
    </div>
  );
};

export default ClubPage;
