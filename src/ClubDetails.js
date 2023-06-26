import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;

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
  
    useEffect(() => {
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
        <div>
          <h1>Club Details</h1>
          {club && (
            <div>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              <button onClick={handleUpdate}>Update</button>
            </div>
          )}
          <h2>Members</h2>
          <ul>
            {members.map(member => (
                member ? <li key={member._id}>{member.firstName} {member.lastName}</li> : null
            ))}
          </ul>
          <h2>Authors</h2>
          <ul>
            {authors.map(author => (
                author ? <li key={author._id}>{author.firstName} {author.lastName}</li> : null
            ))}
          </ul>
          <div>
                <h2>Add Books to Club</h2>
                <input
                    type="text"
                    placeholder="Search for books"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleBookSearch}>Search</button>
                <ul>
                    {searchResults.map(book => (
                        <li key={book.id}>
                            {book.volumeInfo.title} by {book.volumeInfo.authors.join(', ')}
                            <button onClick={() => handleAddBookToClub(book)}>Add to Club</button>
                        </li>
                    ))}
                </ul>
                <h3>Books:</h3>
                <ul>
                  {books.map((book) => (
                    <li key={book._id}>
                      <img src={book.thumbnail} alt={book.title} />
                      <span>{book.title} by {book.authors.join(', ')}</span>
                    </li>
                  ))}
                </ul>
            </div>
            
              
        </div>
      );      
};

export default ClubDetails;

   
