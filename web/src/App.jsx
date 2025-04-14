import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';

import Header from './components/Header';
import Footer from './components/Footer';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import AllBooks from './pages/AllBooks';
import Book from './pages/Book';



function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    setIsAuthenticated(false);
    return (<Navigate to="/sign-in" />);

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
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/books" element={<AllBooks />} />
        {/* <Route path="/books" element={<Navigate to="/" />} /> */}
        <Route path="/books/:id" element={<Book />} />
      </Routes>
      <Footer />

    </ div>
  )
}

export default App;