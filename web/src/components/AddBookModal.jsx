// importing our tools
import { useState } from "react";
import { createPortal } from "react-dom";
// as well as our CSS and content so that we can start manipulating it 
import ModalContent from "./AddBookModalContent";
import ABM from '../pages/AllBooks.module.css';



function AddBookModal({ onBookAdded }) {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* adding a button, and giving it the attributes posted in the ABM css file */}
            {/* when clicked, the setShowModal becomes true */}
            <button className={ABM["add-book-btn"]} onClick={() => { setShowModal(true) }}>Add Book</button>


            {showModal && createPortal(
                // If the 'showModal' variable is true, render the following content using the 'createPortal' function
                <ModalContent onBookAdded={onBookAdded} onClose={() => { setShowModal(false) }} />,
                document.body)}
        </>
    );
}

export default AddBookModal;