import React, { useState, useEffect } from "react";
import ABM from '../pages/AllBooks.module.css';  

function UpdateModalContent({ onClose, onBookUpdated, book }) {

  // Used to store the authors from the API
  const [dbAuthors, setDbAuthors] = useState("");

  // Used to store the author id
  const [author, setAuthor] = useState(book.author_id ?? "");

  // Used to store the title, image and new author name from the form
  const [title, setTitle] = useState(book.title);
  const [image, setImage] = useState("");
  const [isNewAuthor, setIsNewAuthor] = useState(false);
  const [newAuthor, setNewAuthor] = useState("");

  // Load the authors from the API
  useEffect(() => {
    fetch("http://localhost:3000/authors")
      .then((res) => res.json())
      .then((data) => {
        setDbAuthors(data);
        // If there are authors in the database and the book has no author, set the first author as the default
        if (data.length > 0 && !author) {
          setAuthor(data[0].id);
        }
      });
  }
    , []);

  // This runs when the author select changes, if the user selects the option to add a new author, show the input field instead of the select
  const handleAuthorSelectChange = (eventTrigger) => {
    if (eventTrigger.target.value === "-1") {
      setIsNewAuthor(true);
      setAuthor("");
    } else {
      setIsNewAuthor(false);
      setAuthor(eventTrigger.target.value);
    }
  };

  // Send the form data to the API when the form in submitted
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Get the author ID from the state
    let authorId = author;

    // If the author is new, create it before creating the book
    if (isNewAuthor) {

      // First, create the new author by sending a POST request to the API
      const authorResponse = await fetch("http://localhost:3000/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ new_author: newAuthor }),
      });

      // Get the new author ID from the response
      const authorData = await authorResponse.json();

      // Save the newly inserted author ID. The API returns the ID as authorId
      authorId = authorData.authorId;

    }

    // Create FormData object to send the book data including the image file. This is required because we are sending a file
    const formData = new FormData();

    // Append the author ID, title and image to the form data
    formData.append("author_id", authorId);
    formData.append("title", title);
    formData.append("image", image);

    // Send the POST request to the API to create new book
    const bookResponse = await fetch(`http://localhost:3000/books/${book.id}`, {
      method: "PUT",
      body: formData
    });

    // Get the response from the API
    const bookResult = await bookResponse.json();

    // Log the response to the console
    console.log("Success:", bookResult);

    // Call the onBookUpdated function that was passed as a prop
    //    @NOTE: This is passed down from AllBooks.jsx and just calls the fetchBooks function to repopulate the books
    onBookUpdated();

    // Close the modal.
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