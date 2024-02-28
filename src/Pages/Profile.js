import React, { useState, useEffect } from 'react';
import profImg from './prof.png';
import './profile.css';
import { Link, useParams } from 'react-router-dom';

function Profile() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData(username);
  }, [username]);
  
  const fetchUserData = async (username) => {
    try {
      const response = await fetch(`http://localhost:4000/profile/${username}`); // Updated endpoint
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  

  return (
    <div className='upc'>
      <div className='gradiant'></div>
      <div className='profile_down'>
        <img src={profImg} alt='Profile_image' />
        {userData && (
          <>
            <div className='profile_username'>Username: {userData.username}</div>
            <div className='profile_password'>Password: {userData.password}</div>
            <div className='profile_email'>Email: {userData.email}</div>
          </>
        )}
        <Link to={'/'}>
          <button className='btn profile_btn'>Go Back To Home Page</button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
