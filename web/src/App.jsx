import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router';

import Header from './components/Header';
import Footer from './components/Footer';

import authRequired from './authRequired';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import AllBooks from './pages/AllBooks';
import Book from './pages/Book';

const ProtectedAllBooks = authRequired(AllBooks);
const ProtectedBook = authRequired(Book);


function App() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Passed into the header to log out
  const handleLogout = () => {

    localStorage.removeItem("jwt-token");
    setIsAuthenticated(false);

    navigate("/sign-in");

  }

  // Passed into the header to Sign-in page to login
  const handleLogin = () => {

    setIsAuthenticated(true);
    navigate("/books");

  }

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt-token");
    if (jwtToken) {
      setIsAuthenticated(true);
    }
  }, []);




  return (
    <div>
      <Header handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in"
          element={<SignIn handleLogin={handleLogin} />} />
        <Route path="/books" element={<ProtectedAllBooks />} />
        <Route path="/books/:id" element={<ProtectedBook />} />
        {/* <Route path="/books" element={<Navigate to="/" />} /> */}
      </Routes>
      <Footer />

    </ div>
  )
}

export default App;