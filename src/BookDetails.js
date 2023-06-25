import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // Import useParams hook
const USERS_URL = process.env.REACT_APP_SERVER_API_URL;
const SERVER_API_URL = `${USERS_URL}`;

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/search-books?q=${id}`);
        setBook(response.data.items[0]);
      } catch (error) {
        console.error('Failed to fetch book details.');
      }
    };

    fetchBook();
  }, [id]);

  return (
    <Container style={{ maxWidth: '600px' }}> {/* Add custom styles to the container */}
      {book && (
        <Card className="mx-auto" style={{ marginTop: '20px' }}> {/* Center the card */}
          <Card.Img variant="top" src={book.volumeInfo.imageLinks?.thumbnail} height={400} />
          <Card.Body>
            <Card.Title>{book.volumeInfo.title}</Card.Title>
            <p><strong>Authors:</strong> {book.volumeInfo.authors?.join(', ')}</p>
            <p><strong>Publisher:</strong> {book.volumeInfo.publisher}</p>
            <p><strong>Published Date:</strong> {book.volumeInfo.publishedDate}</p>
            <p><strong>Description:</strong> {book.volumeInfo.description}</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default BookDetails;
