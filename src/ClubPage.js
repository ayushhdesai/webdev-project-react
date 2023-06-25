import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ClubPage = () => {
  const [club, setClub] = useState(null);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const { clubId } = useParams();
  
  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/club/${clubId}`);
        setClub(response.data);

        const booksResponse = await axios.get(`http://localhost:5000/club/${clubId}/books`);
        setBooks(booksResponse.data);
      } catch (error) {
        console.error('Failed to fetch club details.');
      }
    };
    const fetchClubAuthors = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/club/${clubId}/authors`);
        setAuthors(response.data);
      } catch (error) {
        console.error('Error fetching club members');
      }
    };

    fetchClubAuthors();
    fetchClubDetails();
  }, [clubId]);

  return (
    <div>
      {club ? (
        <div>
          <h1>{club.name}</h1>
          <p>{club.description}</p>
          <h2>Authors</h2>
          <ul>
            {authors.map(author => (
                author ? <li key={author._id}>{author.firstName} {author.lastName}</li> : null
            ))}
          </ul>
          <h3>Books:</h3>
          <ul>
            {books.map((book) => (
              <li key={book._id}>
                <img src={book.thumbnail} alt={book.title} />
                <span>
                  <Link to={`/book/${book.bookId}`}>{book.title}</Link> by {book.authors.join(', ')}
                </span>
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

export default ClubPage;
