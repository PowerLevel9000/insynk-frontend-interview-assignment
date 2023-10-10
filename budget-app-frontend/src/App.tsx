import './App.css';
import Home from './components/home/Home';
import Login from './components/session/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/session/SignUp';
import Update from './components/session/Update';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(() => {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  });

  useEffect(() => {
    const handleStorageChange = (e:any) => {
      if (e.key === 'user') {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {!user ?
          (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          ) :
          (
            <>
              <Route path="/" element={<Home />} />
              <Route path={`update-account`} element={<Update />} />
            </>
          )}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
