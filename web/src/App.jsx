// import hooks and components from React and React Router
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router';

import Header from './components/Header';
import Footer from './components/Footer';

// importing function that restricts access to pages
import authRequired from './pages/authRequired';

// importing our pages
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import AllBooks from './pages/AllBooks';
import Book from './pages/Book';

// wrap the AllBooks page with a login check
const ProtectedAllBooks = authRequired(AllBooks);

function App() {

  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Passed into the header to log out
  const handleLogout = () => {

    // remove login token
    localStorage.removeItem("jwt-token");
    // update login status
    setIsAuthenticated(false);
    // redirect to signin page
    navigate("/sign-in");

  }

  // Passed into the header to Sign-in page to login
  const handleLogin = () => {
    // marking user as logged in
    setIsAuthenticated(true);
    // navigate to books
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
      {/* show header + ability to log out */}
      <Header handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
      {/* Define the different pages the user can visit */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn handleLogin={handleLogin} />} />
        <Route path="/books" element={<ProtectedAllBooks />} />
        {/* <Route path="/books" element={<Navigate to="/" />} /> */}
        <Route path="/books/:id" element={<Book />} />
      </Routes>
      <Footer />

    </ div>
  )
}

export default App;