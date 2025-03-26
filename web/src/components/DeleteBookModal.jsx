// importing the various tools we might use 
import { useState } from "react"
import { createPortal } from "react-dom"
// importing the delete book modal content that we created
import DeleteBookModalContent from "./DeleteBookModalContent";

// as well as the css styling that we will give the butons
import ABM from '../pages/AllBooks.module.css';

function DeleteBookModal({ book, onBookDeleted }) {

    // state to control whether the modal is shown or not
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* adding a button here that is given css styling */}
            {/* when clicked, the setShowModal becomes true */}
            <button className={ABM["delete-btn"]} onClick={() => { setShowModal(true) }}
            >Delete</button>
            {/* If showModal is true, display the DeleteBookModalContent component inside a portal */}
            {showModal && createPortal(<DeleteBookModalContent
                book={book}
                onBookDeleted={onBookDeleted}
                onClose={() => { setShowModal(false) }}
            />,
                document.body)}
        </>
    )
}

// exporting the component so it can be used in other parts of the application
export default DeleteBookModal;