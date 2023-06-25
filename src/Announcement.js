import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Announcement = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
    fetchCurrentUser();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:5000/announcements');
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements', error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/current-user', { withCredentials: true });
      setUserId(response.data._id); // Assuming the user object has an _id field
    } catch (error) {
      console.error('Error fetching current user', error);
    }
  };

  const createAnnouncement = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/announcements/create-announcement', {
        title,
        content,
      }, { withCredentials: true });
      setTitle('');
      setContent('');
      fetchAnnouncements();
    } catch (error) {
      console.error('Error creating announcement', error);
    }
  };

  const deleteAnnouncement = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/announcements/${id}`, { withCredentials: true });
      fetchAnnouncements();
    } catch (error) {
      console.error('Error deleting announcement', error);
    }
  };
  

  return (
    <div>
      <h2>Create Announcement</h2>
      <form onSubmit={createAnnouncement}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required />
        <button type="submit">Create</button>
      </form>

      <h2>Your Announcements</h2>
      {announcements.map(announcement => (
        announcement.authorId === userId && (
          <div key={announcement._id}>
            <h3>{announcement.title}</h3>
            <p>{announcement.content}</p>
            <p>Created at: {new Date(announcement.createdAt).toLocaleString()}</p>
            <button onClick={() => deleteAnnouncement(announcement._id)}>Delete</button>
          </div>
        )
      ))}
    </div>
  );
};

export default Announcement;
