import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;

const Search = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${SERVER_API_URL}/search-books?q=${query}`);
      setBooks(response.data.items);
    } catch (error) {
      console.error('Failed to fetch books.');
    }
  };

  const handleBookClick = (bookId) => {
    navigate(`/book1/${bookId}`); 
  };

  return (
    <Container>
      <Form inline>
        <Form.Control
          type="text"
          placeholder="Search for books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </Form>
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
    </Container>
  );
};

export default Search;
