import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Form, Button, ListGroup, Card, Navbar, Nav, Col, Modal } from 'react-bootstrap';
import { FiThumbsUp, FiUser, FiSearch } from 'react-icons/fi';
import WebFont from 'webfontloader';

const SERVER_API_URL = 'https://webdev-project-node-dl4u.onrender.com';

const BookPage = () => {
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewContent, setReviewContent] = useState('');
  const [likeStatus, setLikeStatus] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { bookId } = useParams();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Cinzel:400,700', 'sans-serif'],
      },
    });
    
    const fetchBookDetailsAndReviews = async () => {
      try {
        const bookResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        setBook(bookResponse.data);

        const reviewsResponse = await axios.get(`${SERVER_API_URL}/book-reviews/${bookId}`);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Failed to fetch book details or reviews.');
      }
    };
    fetchBookDetailsAndReviews();
  }, [bookId]);

  const handlePostReview = async (event) => {
    event.preventDefault();
    try {
        await axios.post(`${SERVER_API_URL}/post-review`, { bookId, content: reviewContent }, { withCredentials: true });
        const reviewsResponse = await axios.get(`${SERVER_API_URL}/book-reviews/${bookId}`, { withCredentials: true });
        setReviews(reviewsResponse.data);
        setReviewContent('');
    } catch (error) {
        console.error('Failed to post review.');
        alert('Please login to post a review');
        window.location.href = '/login';
    }
};


  const handleToggleLike = async (reviewId) => {
    try {
      const response = await axios.post(
        `${SERVER_API_URL}/toggle-like`,
        { reviewId },
        { withCredentials: true }
      );
      setLikeStatus({ ...likeStatus, [reviewId]: response.data.likeStatus });
      setLikeCounts({ ...likeCounts, [reviewId]: response.data.likeCount });
    } catch (error) {
      console.error('Failed to toggle like.');
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <Container style={{ fontFamily: 'Cinzel, sans-serif', padding: '20px' }}>
      <Navbar expand="lg" variant="dark" bg="dark" style={{ fontFamily: 'Cinzel, sans-serif' }}>
        <Navbar.Brand href="/" style={{ margin: 5 }}>TheNovelSociety</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/search"><FiSearch size={20}/> Search Books</Nav.Link>
            <Nav.Link href="/your-clubs">Your Clubs</Nav.Link>
            <Nav.Link href="/profile" className="ml-3">
              <FiUser size={20} /> Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar><br/>
      {book ? (
        <>
          <Row>
            <Col>
              <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Book Title : {book.volumeInfo.title}</h1>
              <p style={{ textAlign: 'justify', fontSize: '18px' }}>Description : {book.volumeInfo.description}</p>
            </Col>
          </Row>
          <Row style={{ marginTop: '40px' }}>
            <Col>
              <Form onSubmit={handlePostReview}>
                <Form.Group>
                  <Form.Label>Write a review:</Form.Label>
                  <Form.Control as="textarea" value={reviewContent} onChange={(e) => setReviewContent(e.target.value)} />
                </Form.Group><br/>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
          <Row style={{ marginTop: '40px' }}>
            <Col>
              <h3>Reviews:</h3>
              <ListGroup>
                {reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <Card>
                      <Card.Body>
                        <Card.Text>{review.content}</Card.Text>
                        <Card.Subtitle
                          className="mb-2 text-muted"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleUserClick(review.userId)}
                        >
                          By: {review.userId ? review.userId.username : 'Unknown'}
                        </Card.Subtitle>
                        <Button variant="light" onClick={() => handleToggleLike(review._id)}>
                          <FiThumbsUp style={{ marginRight: '10px' }} />
                          {likeStatus[review._id] ? 'Unlike' : 'Like'} ({likeCounts[review._id] || 0})
                        </Button>
                      </Card.Body>
                    </Card>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '20px' }}>Loading...</p>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>First Name:</strong> {selectedUser.firstName}</p>
              <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default BookPage;
