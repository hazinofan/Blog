import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../userContext';

function LoginPage() {
  const[username,setUsername] = useState('')
  const[password,setPassword] = useState('')
  const[redirect,setRedirect] = useState(false)
  const{setUserInfo} = useContext(UserContext);

  async function login(e){
    e.preventDefault();

    const response = await fetch("http://https://blogpage-63cf4afbb619.herokuapp.com/login", {
    method: 'POST',
    body: JSON.stringify({ username, password}),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  }); 
  console.log(response)
  if(response.ok){
    response.json().then(userInfo => {
      setUserInfo(userInfo)
      setRedirect(true);

    })
   
  } else {
    alert('wrong credentials')
  }
  }

  if(redirect){
    return <Navigate to={'/'}/> 
  }

  return (
  
  <form className='login' onSubmit={login}>
        <h1> Login </h1>
        <div className='form__group'>  
            <input className='form__field' 
            name='name' 
            required
            type='text' 
            placeholder='Username' 
            value={username} onChange={e => setUsername(e.target.value)
            }
            />
            <label htmlFor="name" className="form__label">Name</label>
        </div>

        <div className='form__group'>  
            <input className='form__field' 
            name='name'
            required
            type='password' 
            placeholder='Username' 
            value={password} onChange={e => setPassword(e.target.value)}
            />  
            <label htmlFor="name" className="form__label">Password</label>
        </div>
        <button className='btn'>Login</button>
        
    </form>
  )
}

export default LoginPage
