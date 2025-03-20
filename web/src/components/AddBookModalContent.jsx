import { useState, useEffect } from "react";
import m from './AddBookModalContent.module.css';
import ABM from '../pages/AllBooks.module.css';

function ModalContent({ onClose }) {

    const [dbAuthors, setDbAuthors] = useState();

    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    useEffect( () => {
        fetch("http://localhost:3000/authors")
        .then((response) => response.json())
        .then(responseJSON => {
            setDbAuthors(responseJSON);
            if(responseJSON.length > 0) {
                // set the first one as the selected author
                setAuthor(responseJSON[0].id);
            }
        })
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // console.log(author, title);
        const formData = new FormData();
        formData.append("author_id", author);
        formData.append("title", title);
        formData.append("image", image);

        const bookAPIRequest = await fetch("http://localhost:3000/books", {
            method: "POST",
            body: formData
        });

        const bookResult = await bookAPIRequest.json();
        console.log(bookAPIRequest);

    };


    return (
        <div className={m["modal-container"]}>
            <div className={`${m["modal"]} ${ABM["book-card"]}`}>
                <h3>Add a new Book</h3>
                <form onSubmit={handleFormSubmit} className={ABM["form-group"]} encType="multipart/form-data">
                    {/* AUTHOR NAME */}
                    <label htmlFor="bookAuthor">Author:</label>
                    <select
                        name="author"
                        id="author"
                        value={author}
                        onChange={ (event) => { setAuthor(event.target.value) }}
                    >
                        {dbAuthors && dbAuthors.map((author, index) => (
                            <option key={author.id} value={author.id}>{author.name}</option>
                        ))}
                    </select>

                    {/* TITLE OF BOOK */}
                    <label htmlFor="bookTitle">Title:</label>
                    <input
                        type="text"
                        name="title"
                        id="bookTitle"
                        onChange={(event) => { setTitle(event.target.value) }}
                    />

                    {/* IMAGE */}
                    <label htmlFor="image">Image</label>
                    <input type="file"
                        name="image"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])} />

                    <div className={m['spacer']}>
                        <button className={m['add-button']} type="submit">Add tape</button>
                    </div>
                </form>
                <button className={m["close-button"]} onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default ModalContent;