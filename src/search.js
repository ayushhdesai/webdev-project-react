import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';
import { FiUser, FiSearch, FiClipboard, FiPlus } from 'react-icons/fi';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import WebFont from 'webfontloader';
const SERVER_API_URL = 'https://webdev-project-node-dl4u.onrender.com';

const Search = () => {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    WebFont.load({
      google: {
        families: ['Cinzel:400,700', 'sans-serif'],
      }
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

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${SERVER_API_URL}/search-books?q=${query}`);
      setBooks(response.data.items);
    } catch (error) {
      console.error('Failed to fetch books.');
    }
  };

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (

    
    <div style={{fontFamily: 'Cinzel, sans-serif', padding : '20px'}}>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Navbar.Brand href="/" style={{ margin : 5}}>TheNovelSociety</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/search"><FiSearch size={20}/> Search Books</Nav.Link>
            {user ? (
              <>
              {user.type === 'regular' && (
                  <>
                    <Nav.Link href="/clubs">Join Clubs</Nav.Link>
                    <Nav.Link href="/your-clubs"> Your Clubs</Nav.Link>
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
      <Button onClick={handleSearch} style={{ borderRadius: '20px', backgroundColor: 'white', color: 'black', borderColor: 'white' }}>
            <FiSearch />
          </Button>
       <Form inline style={{ maxWidth: '700px', width: '100%' }}>
        <Form.Control
            type="text"
            placeholder="Search for books"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: '100%', borderRadius: '20px' }}
          />
        </Form>
      </div>
      
      <Row>
        {books.map((book, index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-4">
            <Card onClick={() => handleBookClick(book.id)}> {/* Add onClick handler */}
              <Card.Img variant="top" src={book.volumeInfo.imageLinks?.thumbnail} height={300} />
              <Card.Body>
                <Card.Title>{book.volumeInfo.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Search;
