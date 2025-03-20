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
                <h4>I'm a modal</h4>
                <button className={m["close-button"]} onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default ModalContent;