import React, { useState } from 'react';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    function handlePasswordChange(e) {
        const newPassword = e.target.value;
        if (newPassword.length >= 6) {
            setPassword(newPassword);
            setError('');
        } else {
            setPassword(newPassword); // Set password even if length condition is not met
            setError('Password must be at least 6 characters long');
        }
    }

    async function register(e) {
        e.preventDefault();

        try {
            const response = await fetch("https://blogpage-63cf4afbb619.herokuapp.com/register", {
                method: 'POST',
                body: JSON.stringify({ username, password, email }),
                headers: { 'Content-Type': 'application/json' },
            });
            if(response.ok) {
                alert('Registration successful');
                window.location.href = '/login'; 
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            alert("One of the fields is empty");
        }
    }

    return (
        <form className='login' onSubmit={register}>
            <h1>Registration</h1>
            <div className='form__group'>  
                <input 
                    className='form__field' 
                    id='username' 
                    type='text' 
                    placeholder='Username'
                    required
                    value={username} 
                    onChange={e => setUsername(e.target.value)}
                />
                <label htmlFor="username" className="form__label">Name</label>
            </div>
            <div className='form__group'>  
                <input 
                    className='form__field' 
                    id='password' 
                    type='password' 
                    placeholder='Password'
                    required
                    value={password} 
                    onChange={handlePasswordChange}
                />
                <label htmlFor="password" className="form__label">Password</label>
            </div>
            <div className='form__group'>  
                <input 
                    className='form__field' 
                    id='email' 
                    type='email' 
                    placeholder='E-mail'
                    required
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="email" className="form__label">E-mail</label>
            </div>
            {error && <div className="error">{error}</div>}
            <button className='btn' type='submit'>Register</button>
        </form>
    );
}

export default RegisterPage;
