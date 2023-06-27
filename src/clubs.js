import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav, Button, Card, Col, Container} from 'react-bootstrap';
import { FiUser, FiSearch, FiClipboard, FiPlus, FiBook } from 'react-icons/fi';
import WebFont from 'webfontloader';
const SERVER_API_URL = 'https://webdev-project-node-dl4u.onrender.com';

const Clubs = () => {
  const [user, setUser] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [userClubs, setUserClubs] = useState([]);

  useEffect(() => {

    WebFont.load({
      google: {
        families: ['Cinzel:400,700', 'sans-serif'],
      },
    });

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

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/current-user`, { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user.');
      }
    };

    fetchUser();
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
    <div style={{padding : '20px'}}>
      <Navbar expand="lg" variant="dark" bg="dark" style={{fontFamily: 'Cinzel, sans-serif'}}>
        <Navbar.Brand href="/" style={{ margin : 5}}>TheNovelSociety</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/search"><FiSearch size={20}/> Search Books</Nav.Link>
            {user ? (

              <>
              {user.type === 'regular' && (
                  <>
                    <Nav.Link href="/your-clubs">Your Clubs</Nav.Link>
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
      <div style={{ margin: '0 auto', padding: '50px' }}>
        <h2 style={{ marginBottom: '30px', textAlign: 'center' }}><FiBook /> Book Clubs</h2>
        <Container>
            {clubs.map((club) => (
              <Col key={club._id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{club.name}</Card.Title>
                    <Card.Text>{club.description}</Card.Text>
                    {userClubs.includes(club._id) ? (
                      <Button variant="success" disabled>
                        Joined
                      </Button>
                    ) : (
                      <Button onClick={() => handleJoin(club._id)} variant="primary">
                        Join
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Container>
      </div>

    </div>
  );
};

export default Clubs;