// importing necessary tools, dependencies 
import React, { useState, useEffect } from "react";
// and styles as well!
import ABM from '../pages/AllBooks.module.css';

// defining the UpdateBookModalContent component
function UpdateBookModalContent({ onBookUpdated, book, onClose }) {

    // state variables for form fields
    const [author, setAuthor] = useState(book.author_id);
    const [dbAuthors, setDbAuthors] = useState([]);
    const [title, setTitle] = useState(book.name);
    const [image, setImage] = useState(null);

    // handling form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("author_id", author);
        formData.append("title", title);
        formData.append("image", image);

        // api source from db based on the unique book id
        const bookResponse = await fetch(`http://localhost:3000/books/${book.id}`, {
            // put method 
            method: "PUT",
            body: formData
        });

        onBookUpdated();
        onClose();
    }

    useEffect(() => {
        // fetching authors from API from our db
        fetch("http://localhost:3000/authors")
            // convert to readable json
            .then((res) => res.json())
            .then((data) => {
                setDbAuthors(data);
                if (data.length > 0 && !author) {
                    setAuthor(data[0].id);
                }
            });
    }, []);

    return (
        <div className={ABM['modal-content']}>
            <h3>Edit Book</h3>
            {/* Form for updating book details */}
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                <div>
                    <div className={ABM['form-group']}>
                        {/* Author selection */}
                        <label htmlFor="author">Author</label>
                        <select
                            name="author"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        >
                            {dbAuthors && dbAuthors.map((author) => (
                                <option key={author.id} value={author.id}>{author.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <div className={ABM['form-group']}>
                        {/* title selection */}
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div className={ABM['form-group']}>
                        {/* image selection */}
                        <label>Current Image</label>
                        <img src={`http://localhost:3000/images/${book.image_name}`} alt="Current" />
                        <label htmlFor="image">Upload New Image</label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                </div>
                <div>
                    {/* save btn w unique styling */}
                    <button className={ABM.button} type="submit">Save</button>
                </div>
            </form>
            {/* this one too */}
            <button className={ABM['close-button']} onClick={onClose}>&times;</button>
        </div>
    );
}

export default UpdateBookModalContent;
