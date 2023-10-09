import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/users/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch:any = useDispatch();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(login({ name }));
      if (localStorage.getItem('user')) {
        navigate('/home');
      }
      else{
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Username</label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        {error ? <small>{error}</small> : null}
        <input type="submit" value="Login" />
      </form>
    </main>
  )
}

export default Login;