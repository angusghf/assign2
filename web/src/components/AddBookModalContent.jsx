// importing our tools
import { useState, useEffect } from "react";
// again, importing our css files so that we can start to dynamically style our stuff
import m from './AddBookModalContent.module.css';
import ABM from '../pages/AllBooks.module.css';

function ModalContent({ onClose, onBookAdded }) {

    const [dbAuthors, setDbAuthors] = useState();

    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    // This code runs when the component is first rendered

    useEffect(() => {
        // fetching list of authors from the server
        fetch("http://localhost:3000/authors")
            // then converting it o a readable json format
            .then((response) => response.json())
            .then(responseJSON => {
                // set the list of authors in the components state
                setDbAuthors(responseJSON);
                if (responseJSON.length > 0) {
                    // set the first one as the selected author
                    setAuthor(responseJSON[0].id);
                }
            })
    }, []);

    // function is called when the form is submitted
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // console.log(author, title);
        // Create a FormData object to send the form data to the server
        const formData = new FormData();
        formData.append("author_id", author);
        formData.append("title", title);
        formData.append("image", image);

        // Send a request to the server to add a new book
        const bookAPIRequest = await fetch("http://localhost:3000/books", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
            }
        });

        const bookResult = await bookAPIRequest.json();

        // close the modal
        onClose();
        onBookAdded();

        // logging the request
        console.log(bookAPIRequest);

    };


    return (
        // returning a div container w the unique css styling
        <div className={m["modal-container"]}>
            {/* doing it here for the cards */}
            <div className={`${m["modal"]} ${ABM["book-card"]}`}>
                {/* title */}
                <h3>Add a new Book</h3>
                {/* and forms as well */}
                <form onSubmit={handleFormSubmit} className={ABM["form-group"]} encType="multipart/form-data">
                    {/* Dropdown for the items */}
                    {/* AUTHOR NAME */}
                    <label htmlFor="bookAuthor">Author:</label>
                    <select
                        name="author"
                        id="author"
                        value={author}
                        onChange={(event) => { setAuthor(event.target.value) }}
                    >
                        {/* If dbAuthors is available, map over the list and create an option for each author */}

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

                    {/* File input for uploading an image */}
                    {/* IMAGE */}
                    <label htmlFor="image">Image</label>
                    <input type="file"
                        name="image"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])} />

                    {/* Submit button to add the book */}
                    <div className={m['spacer']}>
                        <button className={m['add-button']} type="submit">Add Book</button>
                    </div>
                </form>
                {/* Close button to exit the modal */}
                <button className={m["close-button"]} onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

// exporting it if we need to use it else where
export default ModalContent;