import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();
  const [joinedClubs, setJoinedClubs] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/current-user', { withCredentials: true });
        setUser(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
  
        const clubsResponse = await axios.get('http://localhost:5000/user-clubs', { withCredentials: true });
        setJoinedClubs(clubsResponse.data.joinedClubs);

        
      } catch (error) {
        console.error('Failed to fetch user.');
      }
    };
  
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/login'); 
    } catch (error) {
      console.error('Failed to log out.');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.post('http://localhost:5000/update-user', { firstName, lastName }, { withCredentials: true });
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
          await axios.delete('http://localhost:5000/delete-account', { withCredentials: true });
          navigate('/login');
      } catch (error) {
          console.error('Failed to delete account.');
      }
  }
};


  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="ml-auto">
          {user && (
            <>
            <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
            <Button variant="danger" onClick={handleDeleteAccount}>Delete Account</Button>
            </>
          )}
        </Nav>
      </Navbar>
      {user ? (
        <div>
          <h1>Welcome, {user.firstName} {user.lastName}!</h1>
          <p>Your type is: {user.type}</p>
          <div>
            
            {user.type === 'regular' && (
              <div>
                <h2>Clubs you've joined:</h2>
                <ul>
                  {joinedClubs.map((club) => (
                    <li key={club._id}>
                      <a href={`/club1/${club._id}`}>{club.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            
          </div>

          {editing ? (
            <Form>
              <FormGroup>
                <FormControl type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
              </FormGroup>
              <FormGroup>
                <FormControl type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
              </FormGroup>
              <Button variant="primary" onClick={handleUpdate}>Update</Button>
              <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
            </Form>
          ) : (
            <Button variant="primary" onClick={() => setEditing(true)}>Edit Profile</Button>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
