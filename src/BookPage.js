import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookPage = () => {
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewContent, setReviewContent] = useState('');
  const [likeStatus, setLikeStatus] = useState({});
  const [likeCounts, setLikeCounts] = useState({}); // Added likeCounts state
  const { bookId } = useParams();

  useEffect(() => {
    const fetchBookDetailsAndReviews = async () => {
      try {
        // Fetch book details
        const bookResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        setBook(bookResponse.data);

        // Fetch reviews
        const reviewsResponse = await axios.get(`http://localhost:5000/book-reviews/${bookId}`);
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
      await axios.post('http://localhost:5000/post-review', { bookId, content: reviewContent }, { withCredentials: true });
      // Refresh reviews to reflect the new review
      const reviewsResponse = await axios.get(`http://localhost:5000/book-reviews/${bookId}`, { withCredentials: true });
      setReviews(reviewsResponse.data);
      setReviewContent(''); // clear the input field
    } catch (error) {
      console.error('Failed to post review.');
    }
  };

  const handleToggleLike = async (reviewId) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/toggle-like',
        { reviewId },
        { withCredentials: true }
      );
      setLikeStatus({ ...likeStatus, [reviewId]: response.data.likeStatus });
      setLikeCounts({ ...likeCounts, [reviewId]: response.data.likeCount }); // Update like counts state
    } catch (error) {
      console.error('Failed to toggle like.');
    }
  };
  
  const handleUserClick = (userId) => {
    // Redirect to the user page, assuming it's in the path /user/:userId
    window.location.href = `/user/${userId}`;
  };
  

  return (
    <div>
      {book ? (
        <div>
          <h1>{book.volumeInfo.title}</h1>
          <p>{book.volumeInfo.description}</p>
          <form onSubmit={handlePostReview}>
            <label>
              Write a review:
              <textarea value={reviewContent} onChange={(e) => setReviewContent(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
          </form>
          <h3>Reviews:</h3>
          <ul>
            {reviews.map((review) => (
              <li key={review._id}>
                <p>{review.content}</p>
                <p onClick={() => handleUserClick(review.userId)}>By: {review.userId}</p>
                <button onClick={() => handleToggleLike(review._id)}>
                  {likeStatus[review._id] ? 'Unlike' : 'Like'} ({likeCounts[review._id] || 0})
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookPage;