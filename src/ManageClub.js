import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const USERS_URL = process.env.REACT_APP_SERVER_API_URL;
const SERVER_API_URL = `${USERS_URL}`;

const ManageClubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchMyClubs = async () => {
      try {
        const response = await axios.get(`${SERVER_API_URL}/my-clubs`, { withCredentials: true });
        setClubs(response.data.myClubs);
      } catch (error) {
        console.error('Failed to fetch clubs.');
      }
    };

    fetchMyClubs();
  }, []);

  return (
    <div>
      <h1>My Clubs</h1>
      <ul>
        {clubs.map(club => (
          <li key={club._id}>
            <Link to={`/club/${club._id}`}>{club.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageClubs;
