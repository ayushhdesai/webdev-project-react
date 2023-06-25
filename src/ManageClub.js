import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ManageClubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchMyClubs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/my-clubs', { withCredentials: true });
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
