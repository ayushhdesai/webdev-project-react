import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Navbar, Nav, Container, ListGroup, Button, Form, Card, Row, Col } from 'react-bootstrap';
import { FiUser, FiSearch, FiClipboard, FiPlus, FiRefreshCw  } from 'react-icons/fi';
import WebFont from 'webfontloader';

const SERVER_API_URL = 'https://webdev-project-node-dl4u.onrender.com';

const ClubDetails = () => {
    const [club, setClub] = useState(null);
    const [members, setMembers] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [books, setBooks] = useState([]);
  
    const { clubId } = useParams();
  
    const fetchBooks = async () => {
      try {
          const booksResponse = await axios.get(`${SERVER_API_URL}/club/${clubId}/books`);
          setBooks(booksResponse.data);
      } catch (error) {
          console.error('Error fetching club books');
      }
  }

  const handleRefreshBooks = () => {
      fetchBooks();
  };
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
          setName(response.data.name);
          setDescription(response.data.description);

          const booksResponse = await axios.get(`${SERVER_API_URL}/club/${clubId}/books`);
          setBooks(booksResponse.data);
        } catch (error) {
          console.error('Error fetching club details');
        }
      };
  
      const fetchClubMembers = async () => {
        try {
          const response = await axios.get(`${SERVER_API_URL}/club/${clubId}/members`);
          setMembers(response.data);
        } catch (error) {
          console.error('Error fetching club members');
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

      
      
      fetchClubDetails();
      fetchClubMembers();
      fetchClubAuthors();
    }, [clubId]);   

    

    const handleUpdate = async () => {
        try {
          const response = await axios.post(`${SERVER_API_URL}/update-club/${clubId}`, 
          {
            name,
            description
          });
          setClub(response.data);  // updated club
          alert('Club updated successfully');
        } catch (error) {
          console.error('Error updating club', error);
          alert('Failed to update club');
        }
      };

      const handleBookSearch = async () => {
        try {
            const response = await axios.get(`${SERVER_API_URL}/search-books?q=${searchQuery}`);
            setSearchResults(response.data.items || []);
        } catch (error) {
            console.error('Error searching for books', error);
        }
    };

    const handleAddBookToClub = async (book) => {
        try {
            await axios.post(`${SERVER_API_URL}/add-book-to-club`, {
                clubId,
                bookId: book.id,
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors,
                thumbnail: book.volumeInfo.imageLinks.thumbnail
            });
            alert('Book added to club successfully');
        } catch (error) {
            console.error('Error adding book to club', error);
            alert('Failed to add book to club');
        }
    };
      
      return (
    <div style={{ fontFamily: 'Cinzel, sans-serif', padding: '20px' }}>
      {/* Navbar */}
      <Navbar expand="lg" variant="dark" bg="dark" style={{ marginBottom: '30px' }}>
        <Navbar.Brand href="/" style={{ margin: 5, fontFamily: 'Cinzel, sans-serif' }}>TheNovelSociety</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/search"><FiSearch size={20} /> Search Books</Nav.Link>
            <Nav.Link href="/create-club"><FiPlus />Create Club</Nav.Link>
            <Nav.Link href="/manage-clubs"><FiClipboard />Manage Clubs</Nav.Link>
            <Nav.Link href="/profile" className="ml-3"><FiUser size={20} /> Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Club Details */}
      <Container style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
        <h1>Club Details</h1>
        {club && (
          <div>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
              </Form.Group><br/>
              <Button onClick={handleUpdate}>Update</Button>
            </Form>
          </div>
        )}<br/>
        <h2>Members</h2>
        <ListGroup>
          {members.map(member => (
            member ? <ListGroup.Item key={member._id}>{member.firstName} {member.lastName}</ListGroup.Item> : null
          ))}
        </ListGroup><br/>
        <h2>Authors</h2>
        <ListGroup>
          {authors.map(author => (
            author ? <ListGroup.Item key={author._id}>{author.firstName} {author.lastName}</ListGroup.Item> : null
          ))}
        </ListGroup><br/>
          <h2>Add Books to Club</h2>
          <Form inline>
            <Form.Control
              type="text"
              placeholder="Search for books"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={handleBookSearch} variant="outline-success"><FiSearch /> Search</Button>
          </Form>
          <ListGroup>
            {searchResults.map(book => (
              <ListGroup.Item key={book.id}>
                {book.volumeInfo.title} by {book.volumeInfo.authors.join(', ')}
                <Button variant="primary" onClick={() => handleAddBookToClub(book)} style={{marginLeft: '10px'}}><FiPlus /> Add to Club</Button>
              </ListGroup.Item>
            ))}
          </ListGroup><br/>
          <h3 style={{ marginTop: '40px', marginBottom: '20px' }}>Books: Books: <FiRefreshCw onClick={handleRefreshBooks} style={{ cursor: 'pointer' }}/></h3>
          <Row>
            {books.map((book) => (
              <Col md={4} key={book._id} style={{ marginBottom: '30px' }}>
                <Card style={{ minWidth: '18rem', maxWidth: '18rem' }}>
                  <Card.Img variant="top" src={book.thumbnail} alt={book.title} />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>
                      by {book.authors.join(', ')}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
    </div>
  );      
};

export default ClubDetails;

   
