import { useState } from "react";
import { createPortal } from "react-dom";
import ModalContent from "./AddBookModalContent";
import ABM from '../pages/AllBooks.module.css';
import BooksFilter from "../components/BooksFilter";
// import BFC from './BooksFilter.module.css';


function AddBookModal({ onBookAdded }) {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className={ABM["add-book-btn"]} onClick={() => { setShowModal(true) }}>Add Book</button>
            <BooksFilter />

            {showModal && createPortal(
                <ModalContent  onBookAdded={ onBookAdded } onClose={ () => { setShowModal(false) } }/>,
                document.body)}
        </>
    );
}

export default AddBookModal;