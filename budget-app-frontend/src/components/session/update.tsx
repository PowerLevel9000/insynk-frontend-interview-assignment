import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser, updateUser } from '../../redux/users/userSlice';

const Update = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const dispatch: any = useDispatch();
  const [name, setName] = useState(user.user.name);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  if (!user) {
    return (
      <>
        <h1>Not logged in</h1>
        <Link to="/login">Login</Link>
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) return setError('Name is required');
    if (name.length < 3) return setError('Name must be at least 3 characters');
    if (name.length > 20) return setError('Name must be less than 20 characters');

    try {
      await dispatch(updateUser({ id: user.user.id, name }));
      if (localStorage.getItem('user')) {
        navigate('/');
      }
      else {
        setError('Sign UP failed. Please try again.');
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteUser({ id: user.id }));
      navigate('/login');
      window.location.reload();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  }

  return (
    <main>
      <h1>Update</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Username</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setError('')
          }}
        />
        <small>{error}</small>
        <button type="submit">Update</button>
      </form>
      <h2>Are you unhappy with services</h2>
      <button onClick={handleDelete}>Delete Account</button>
    </main>
  )
}

export default Update