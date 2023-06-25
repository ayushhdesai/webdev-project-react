import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';

const Home = () => {
  const [user, setUser] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/current-user', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user.');
      }
    };

    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:5000/announcement');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Failed to fetch announcements.');
      }
    };

    fetchUser();
    fetchAnnouncements();
  }, []);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/search">Search Books</Nav.Link>
            {user ? (
              <>
                <Nav.Link href="/profile">My Profile</Nav.Link>
                {user.type === 'regular' && <Nav.Link href="/clubs">Join Clubs</Nav.Link>}
                {user.type === 'author' && (
                  <>
                    <Nav.Link href="/clubs">Join Clubs</Nav.Link>
                    <Nav.Link href="/announcements">Announcements</Nav.Link>
                  </>
                )}
                {user.type === 'clubOrganizer' && (
                  <>
                    <Nav.Link href="/create-club">Create Club</Nav.Link>
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Display Announcements */}
      <div className="container mt-4">
        <h2>Announcements</h2>
        {announcements.length === 0 ? (
          <p>No announcements available.</p>
        ) : (
          announcements.map((announcement) => (
            <div key={announcement._id} className="mb-3">
              <h4>{announcement.title}</h4>
              <p>{announcement.content}</p>
              <small className="text-muted">
                Posted by: {announcement.authorId ? `${announcement.authorId.firstName} ${announcement.authorId.lastName}` : 'Unknown'}
              </small>
              <p className="text-muted">Created at: {new Date(announcement.createdAt).toLocaleString()}</p>
            </div>

          ))
        )}
      </div>
    </div>
  );
};

export default Home;
