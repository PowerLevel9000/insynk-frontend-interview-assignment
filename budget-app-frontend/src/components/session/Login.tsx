import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/users/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch: any = useDispatch();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!name) return setError('Name is required');
    if(name.length < 3) return setError('Name must be at least 3 characters');
    if(name.length > 20) return setError('Name must be less than 20 characters');

    try {
      await dispatch(login({ name }));
      if (localStorage.getItem('user')) {
        navigate('/');
      }
      else {
        setError('user not found');
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
        <input type="text" name="name" value={name} onChange={(e) => {
          setName(e.target.value)
          setError('')
        }} />
        {error ? <small>{error}</small> : null}
        <input type="submit" value="Login" />
      </form>
    </main>
  )
}

export default Login;