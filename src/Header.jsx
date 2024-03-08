import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './userContext';
import profImg from './prof.png';



function Header() {
  const{setUserInfo, userInfo} = useContext(UserContext)

  useEffect(() => {
    fetchUserProfile(); 
  }, []);

  const fetchUserProfile = () => {
    fetch('https://blogpage-63cf4afbb619.herokuapp.com/profile', {
      credentials: 'include',
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch user profile');
      }
    }) 
    .then(userInfo => {
      setUserInfo(userInfo);
    })
    .catch(error => {
      console.error('Error fetching user profile:', error);
    });
  };

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials:'include',
      method : 'POST'
    });
    setUserInfo({})
  }

  const username = userInfo?.username

  return (
    <div>
      <header>
        <Link to={'/'} className='logo'> WebInfo </Link>
        <nav>
          {username ? ( 
            <div className='nav_links'>
              <Link to="/create"> Create new Post</Link>
              <a style={{cursor:'pointer'}} onClick={logout}>Logout</a>
              <Link to={'/profile'}>
              <img className='logo_profile' src={profImg} alt='profile picture' />
              </Link>
            </div>
          ) : (
            <>
              <Link to='/login' > Login </Link>
              <Link to='/register'> Register </Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Header;
