// adding dependencies
import { useState, useEffect } from "react";

// importing our components
import AddBookModal from '../components/AddBookModal';
import BooksFilter from "../components/BooksFilter";
import DeleteBookModal from "../components/DeleteBookModal";
import UpdateBookModal from "../components/UpdateBookModal";


import React from 'react';
// and styling as well
import ABM from '../pages/AllBooks.module.css';

function AllBooks() {
    // State to store books data
    const [books, setBooks] = useState([]);


    // Function to fetch books from the API
    const fetchBooks = async () => {
        // getting the books from our db
        fetch('http://localhost:3000/books/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt-token")}`
            }
        })
        // converting it to readable json
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setBooks(data)
            }).catch(err => {
                console.log(err);
            })
            ;
    }

    // Function to update books state when books are filtered
    const handleUpdatedBooks = (booksArray) => {
        setBooks(booksArray);
    }

    // Fetch books when the component mounts
    useEffect(() => {
        fetchBooks();
    }, []);


    return (
        <div className={ABM['books-container']}>
            {/* Filter and Add Book Buttons Section */}
            <div className={ABM['button-container']}>
                <AddBookModal onBookAdded={fetchBooks} />
                <BooksFilter updateBooks={handleUpdatedBooks} />
            </div> 

            {/* Books display grid */}
            <div className={ABM['books-grid']}>
                {books.map(book => {
                    return (
                        <div className={ABM['book-card']}>
                            {/* book image with alt tags and the author's name */}
                            <img src={`http://localhost:3000/images/${book.image_name}`} alt={`${book.name} by ${book.author}`} />
                            {/* name of the book */}
                            <h5>{book.name}</h5>
                            {/* horizontal divider */}
                            <hr />
                            {/* and the author's name */}
                            <p>{book.author}</p>
                            <br />
                            {/* update book modal when update */}
                            <UpdateBookModal onBookUpdated={fetchBooks} book={book} />
                            {/* and also the modal when deleted */}
                            <DeleteBookModal onBookDeleted={fetchBooks} book={book} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AllBooks;