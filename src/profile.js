import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav, Button, Form, FormGroup, FormControl, Card, Container } from 'react-bootstrap';
import { FiUser, FiSearch, FiClipboard, FiPlus, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import WebFont from 'webfontloader';
const SERVER_API_URL = 'https://webdev-project-node-dl4u.onrender.com';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();
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
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
  
        const clubsResponse = await axios.get(`${SERVER_API_URL}/user-clubs`, { withCredentials: true });
        setJoinedClubs(clubsResponse.data.joinedClubs);

        
      } catch (error) {
        console.error('Failed to fetch user.');
      }
    };
  
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${SERVER_API_URL}/logout`, {}, { withCredentials: true });
      setUser(null);
      navigate('/login'); 
    } catch (error) {
      console.error('Failed to log out.');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.post(`${SERVER_API_URL}/update-user`, { firstName, lastName }, { withCredentials: true });
      setUser({ ...user, firstName, lastName });
      setEditing(false);
    } catch (error) {
      console.error('Failed to update user.');
    }
  };

  // Add this function inside Profile component
const handleDeleteAccount = async () => {
  if (window.confirm('Are you sure you want to delete your account?')) {
      try {
          await axios.delete(`${SERVER_API_URL}/delete-account`, { withCredentials: true });
          navigate('/login');
      } catch (error) {
          console.error('Failed to delete account.');
      }
  }
};


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
          <div style={{ textAlign: 'center' }}>
            
              <h1>Welcome, {user.firstName} {user.lastName}!</h1>
              <p>Your user type is: {user.type}</p>
              <div>
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

              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
                  <Button variant="outline-primary" onClick={handleLogout} style={{ marginBottom: '10px', backgroundColor: '#4CAF50', borderColor: '#4CAF50', color: 'white' }}>Logout</Button>
                  <Button variant="danger" onClick={handleDeleteAccount} style={{ marginBottom: '10px', backgroundColor: '#f44336', borderColor: '#f44336', color: 'white' }}><FiX />Delete Account</Button>
              </div>
              {editing ? (
                  <Form>
                      <FormGroup>
                          <FormControl type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
                      </FormGroup>
                      <FormGroup>
                          <FormControl type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                      </FormGroup>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px' }}>
                          <Button variant="primary" onClick={handleUpdate} style={{ marginBottom: '10px', backgroundColor: '#008CBA', borderColor: '#008CBA', color: 'white' }}>Update</Button>
                          <Button variant="secondary" onClick={() => setEditing(false)} style={{ marginBottom: '10px' }}>Cancel</Button>
                      </div>
                  </Form>
              ) : (
                  <Button variant="primary" onClick={() => setEditing(true)} style={{ marginBottom: '10px', backgroundColor: '#008CBA', borderColor: '#008CBA', color: 'white' }}>Edit Profile</Button>
              )}
              
          </div>
          </Card>
          </Container>
      ) : (
          <p>Loading...</p>
      )}
      
  </div>
  
);

};

export default Profile;
