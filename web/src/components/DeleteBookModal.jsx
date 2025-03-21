import { useState } from "react"
import { createPortal } from "react-dom"
import DeleteBookModalContent from "./DeleteBookModalContent";

import ABM from '../pages/AllBooks.module.css';

function DeleteBookModal() {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className={ABM["delete-btn"]} onClick={() => { setShowModal(true) }}
            >Delete</button>
            {showModal && createPortal(<DeleteBookModalContent
                onClose={() => { setShowModal(false) }}
            />,
                document.body)}
        </>
    )
}

export default DeleteBookModal;