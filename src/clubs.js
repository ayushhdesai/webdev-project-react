import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup, Button } from 'react-bootstrap';
const USERS_URL = process.env.REACT_APP_SERVER_API_URL;
const SERVER_API_URL = `${USERS_URL}`;

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [userClubs, setUserClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/clubs`);
        setClubs(response.data);
      } catch (error) {
        console.error('Failed to fetch clubs.');
      }
    };

    const fetchUserClubs = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/user-clubs`, { withCredentials: true });
        setUserClubs(response.data.joinedClubs.map(club => club._id));
      } catch (error) {
        console.error('Failed to fetch user clubs.');
      }
    };


    fetchClubs();
    fetchUserClubs();
  }, []);

  const handleJoin = async (clubId) => {
    try {
      await axios.post(`${SERVER_API_URL}/join-club`, { clubId }, { withCredentials: true });
      alert('Joined the club successfully');
      setUserClubs([...userClubs, clubId]);
    } catch (error) {
      alert('Failed to join the club.');
    }
  };

  return (
    <Container>
      <h1>Clubs</h1>
      <ListGroup>
        {clubs.map((club) => (
          <ListGroup.Item key={club._id}>
            {club.name} - {club.description}{' '}
            {!userClubs.includes(club._id) && (
              <Button onClick={() => handleJoin(club._id)} variant="primary">
                Join
              </Button>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Clubs;