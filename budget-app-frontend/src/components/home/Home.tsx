import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../redux/categories/categoriesSlice';
import { getExpenses } from '../../redux/expenses/expensesSlice';
import { logout } from '../../redux/users/userSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  console.log(user.user.name);
  const dispatch:any = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getExpenses());
  }, [dispatch]);

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      Home
      <button onClick={handleLogoutClick}>Logout</button>
      <Link to={`update-account`}>Update</Link>
    </div>
  );
};

export default Home;
