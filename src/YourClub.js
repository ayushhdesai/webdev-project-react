import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav, Card, Container } from 'react-bootstrap';
import { FiUser, FiSearch, FiClipboard, FiPlus } from 'react-icons/fi';
import WebFont from 'webfontloader';
const SERVER_API_URL = 'https://webdev-project-node-dl4u.onrender.com';

const YourClub = () => {
  const [user, setUser] = useState(null);
  const [joinedClubs, setJoinedClubs] = useState([]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Cinzel:400,700', 'sans-serif'],
      },
    });

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/current-user`, { withCredentials: true });
        setUser(response.data);
  
        const clubsResponse = await axios.get(`${SERVER_API_URL}/user-clubs`, { withCredentials: true });
        setJoinedClubs(clubsResponse.data.joinedClubs);

        
      } catch (error) {
        console.error('Failed to fetch user.');
      }
    };
  
    fetchUser();
  }, []);


return (
  <div style={{
    fontFamily: 'Cinzel, sans-serif',
    padding: '20px',
    backgroundImage: `url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh'
}}>
      <Navbar expand="lg" variant="dark" bg="dark">
          <Navbar.Brand href="/" style={{ margin: 5, fontFamily: 'Cinzel, sans-serif' }}>TheNovelSociety</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                  <Nav.Link href="/search"><FiSearch size={20} /> Search Books</Nav.Link>
                  {user ? (
                      <>
                          {user.type === 'regular' && (
                              <>
                                  <Nav.Link href="/clubs">Join Clubs</Nav.Link>
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
      </Navbar><br/>
      {user ? (
        <Container className="d-flex align-items-center justify-content-center" >
        <Card className="w-100" style={{ maxWidth: '400px', padding: '20px', borderRadius: '10px' }}>
        {user.type === 'regular' && (
                  <div>
                      <h2>Clubs you've joined:</h2>
                      <ul style={{ listStyleType: 'none', padding: 0 }}>
                          {joinedClubs.map((club) => (
                              <li key={club._id}>
                                  <a href={`/club1/${club._id}`}>{club.name}</a>
                              </li>
                          ))}
                      </ul>
                  </div>
              )}
          </Card>
          </Container>
      ) : (
          <p>Loading...</p>
      )}
      
  </div>
  
);

};

export default YourClub;
