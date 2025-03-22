import React, { useState, useEffect } from "react";
import ABM from '../pages/AllBooks.module.css';  

function UpdateModalContent({ onClose, onBookUpdated, book }) {
    const [dbAuthors, setDbAuthors] = useState("");
    const [author, setAuthor] = useState(book.author_id ?? "");
    const [title, setTitle] = useState(book.title);
    const [image, setImage] = useState("");
    const [isNewAuthor, setIsNewAuthor] = useState(false);
    const [newAuthor, setNewAuthor] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/authors")
            .then((res) => res.json())
            .then((data) => {
                setDbAuthors(data);
                if (data.length > 0 && !author) {
                    setAuthor(data[0].id);
                }
            });
    }, []);

    const handleAuthorSelectChange = (eventTrigger) => {
        if (eventTrigger.target.value === "-1") {
            setIsNewAuthor(true);
            setAuthor("");
        } else {
            setIsNewAuthor(false);
            setAuthor(eventTrigger.target.value);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        let authorId = author;

        if (isNewAuthor) {
            const authorResponse = await fetch("http://localhost:3000/authors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ new_author: newAuthor }),
            });

            const authorData = await authorResponse.json();

            authorId = authorData.authorId;
        }

        const formData = new FormData();
        formData.append("author_id", authorId);
        formData.append("title", title);
        formData.append("image", image);

        const bookResponse = await fetch(`http://localhost:3000/books/${book.id}`, {
            method: "PUT",
            body: formData
        });

        const bookResult = await bookResponse.json();

        console.log("Success:", bookResult);

        onBookUpdated();
        onClose();
    };

    return (
        <div className={ABM['modal-content']}>
            <h3>Edit Book</h3>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                <div className={ABM['form-group']}>
                    <label htmlFor="author">Author</label>
                    {!isNewAuthor ? (
                        <select
                            name="author"
                            id="author"
                            value={author}
                            onChange={handleAuthorSelectChange}>
                            {dbAuthors && dbAuthors.map((author, index) => (
                                <option key={author.id} value={author.id}>{author.name}</option>
                            ))}
                            <option value="-1">Add New Author</option>
                        </select>
                    ) : (
                        <>
                            <input
                                type="text"
                                name="author"
                                id="author"
                                value={newAuthor}
                                onChange={(e) => setNewAuthor(e.target.value)}
                            />
                            <button className={ABM['show-list-button']} onClick={() => setIsNewAuthor(false)}>Show List</button>
                        </>
                    )}
                </div>
                <div className={ABM['form-group']}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={ABM['form-group']}>
                    <label>Current Image</label>
                    <img src={`http://localhost:3000/images/${book.image_name}`} alt="Current book cover" />
                </div>
                <div className={ABM['form-group']}>
                    <label htmlFor="image">Upload New Image</label>
                    <input type="file"
                        name="image"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div>
                    <button className={ABM.button} type="submit">Save</button>
                </div>
            </form>
            <button className={ABM['close-button']} onClick={onClose}>&times;</button>
        </div>
    );
}

export default UpdateModalContent;
