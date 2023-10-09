import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCategories } from '../../redux/categories/categoriesSlice';
import { getExpenses } from '../../redux/expenses/expensesSlice';

const Home = () => {
  const dispatch:any = useDispatch();
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getExpenses())
  }, [dispatch])

  return (
    <div>Home</div>
  )
}

export default Home