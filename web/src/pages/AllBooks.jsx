import { useState, useEffect } from "react";


import AddBookModal from '../components/AddBookModal';
import BooksFilter from "../components/BooksFilter";
import DeleteBookModal from "../components/DeleteBookModal";


import React from 'react';
import ABM from '../pages/AllBooks.module.css';

function AllBooks() {

    const [books, setBooks] = useState([]);

    const getAllBooks = function () {
        fetch("http://localhost:3000/books")
            .then(res => res.json())
            .then((jsonData) => {
                setBooks(jsonData);

            })
    }

    const handleUpdatedBooks = (booksArray) => {
        setBooks(booksArray);
    }

    useEffect(() => {
        getAllBooks();
    }, []);


    return (
        <div className={ABM['books-container']}>
            <h1>My Favorite Books</h1>

            {/* Filter and Add Book Buttons Section */}
            <div className={ABM['button-container']}>
                <AddBookModal onBookAdded={getAllBooks} />
                <BooksFilter updateBooks={handleUpdatedBooks}/>
                {/* <button className={ABM['filter-btn']}>Filter by Genre</button>
                <button className={ABM['add-book-btn']}>+ Add Book</button> */}
            </div>


            <div className={ABM['books-grid']}>
                {books.map(book => {
                    return (
                        <div className={ABM['book-card']}>
                            <img src={`http://localhost:3000/images/${book.image_name}`} alt={`${book.name} by ${book.author}`} />
                            <h5>{book.name}</h5>
                            <hr />
                            <p>{book.author}</p>
                            <br />
                            <button className={ABM['edit-button']}>edit</button>
                            <button className={ABM['view-button']}>view</button>
                            <DeleteBookModal />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AllBooks;