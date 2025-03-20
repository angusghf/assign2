import { useState, useEffect } from "react";


import AddBookModal from '../components/AddBookModal';

import React from 'react';
import ABM from '../pages/AllBooks.module.css';

function AllBooks() {

    const [books, setBooks] = useState([]);

    const getAllBooks = function() {
        fetch("http://localhost:3000/books")
        .then(res => res.json())
        .then((jsonData) => {
            setBooks(jsonData);
            // console.log(jsonData);
        })
    }

    useEffect(() => {
        getAllBooks();
    }, []);


    return (
        <div className={ABM['books-container']}>
            <h1>My Favorite Books</h1>

            {/* Filter and Add Book Buttons Section */}
            <div className={ABM['button-container']}>
                <AddBookModal onBookAdded={getAllBooks}/>
                {/* <button className={ABM['filter-btn']}>Filter by Genre</button>
                <button className={ABM['add-book-btn']}>+ Add Book</button> */}
            </div>


            <div className={ABM['books-grid']}>
                {books.map(book => {
                    return(
                        <div className={ABM['book-card']}>
                        <img src={`http://localhost:3000/images/${book.image_name}`} alt={`${book.name} by ${book.author}`} />
                        <h5>{book.name}</h5>
                        <br />
                        <hr />
                        <br />
                        <p>{book.author}</p>
                    </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AllBooks;