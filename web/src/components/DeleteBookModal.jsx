import { useState } from "react"
import { createPortal } from "react-dom"
import DeleteBookModalContent from "./DeleteBookModalContent";

import ABM from '../pages/AllBooks.module.css';

function DeleteBookModal( { book, onBookDeleted } ) {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className={ABM["delete-btn"]} onClick={() => { setShowModal(true) }}
            >Delete</button>
            {showModal && createPortal(<DeleteBookModalContent
            book={book}
            onBookDeleted={onBookDeleted}
                onClose={() => { setShowModal(false) }}
            />,
                document.body)}
        </>
    )
}

export default DeleteBookModal;