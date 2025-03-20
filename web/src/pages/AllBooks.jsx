import React from 'react';
import ABM from '../pages/AllBooks.module.css';

function AllBooks() {
    return (
        <div className={ABM['books-container']}>
            <h1>My Favorite Books</h1>

            {/* Filter and Add Book Buttons Section */}
            <div className={ABM['button-container']}>
                <button className={ABM['filter-btn']}>Filter by Genre</button>
                <button className={ABM['add-book-btn']}>+ Add Book</button>
            </div>


            <div className={ABM['books-grid']}>
                <div className={ABM['book-card']}>
                    <img src="https://place-hold.it/300" />
                    <p>Book Title</p>
                </div>
                <div className={ABM['book-card']}>
                    <img src="https://place-hold.it/300" />
                    <p>Book Title</p>
                </div>
                <div className={ABM['book-card']}>
                    <img src="https://place-hold.it/300" />
                    <p>Book Title</p>
                </div>
                <div className={ABM['book-card']}>
                    <img src="https://place-hold.it/300" />
                    <p>Book Title</p>
                </div>
            </div>
        </div>
    );
}

export default AllBooks;