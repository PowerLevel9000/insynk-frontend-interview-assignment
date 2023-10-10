import React from 'react'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../redux/users/userSlice';

const SignUp = () => {
  const dispatch:any = useDispatch();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!name) return setError('Name is required');
    if(name.length < 3) return setError('Name must be at least 3 characters');
    if(name.length > 20) return setError('Name must be less than 20 characters');

    try {
      await dispatch(signup({ name }));
      if (localStorage.getItem('user')) {
        navigate('/home');
      }
      else{
        setError('Sign UP failed. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setError('')
          }}
        />
        <button type="submit">Sign Up</button>
        <div>{error}</div>
      </form>
    </main>
  )
}

export default SignUp