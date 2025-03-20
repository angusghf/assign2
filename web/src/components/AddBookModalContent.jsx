import { useState, useEffect } from "react";
import m from './AddBookModalContent.module.css';
import ABM from '../pages/AllBooks.module.css';

function ModalContent({ onClose }) {

    const [dbAuthors, setDbAuthors] = useState();

    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    return (
        <div className={m["modal-container"]}>
            <div className={`${m["modal"]} ${ABM["book-card"]}`}>
                <h3>Add a Book</h3>
                <form className={ABM["form-group"]} encType="multipart/form-data">
                    {/* AUTHOR NAME */}
                    <label htmlFor="bookAuthor">Author:</label>
                    <select
                        name="author"
                        id="author"
                        value={author}
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

                    <div className={ABM['spacer']}>
                        <button className={ABM['add-button']} type="submit">Add tape</button>
                    </div>
                </form>
                <button className={m["close-button"]} onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default ModalContent;