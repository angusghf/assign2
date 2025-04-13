import { Routes, Route, Navigate } from 'react-router';

import Header from './components/Header';
import Footer from './components/Footer';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import AllBooks from './pages/AllBooks';
import Book from './pages/Book';



function App() {
  return (
    <div>
      <Header />
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