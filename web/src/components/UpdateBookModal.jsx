import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './UpdateBookModalContent';

import ABM from '../pages/AllBooks.module.css';

// defining the UpdateBookModal component
function UpdateBookModal({ onBookUpdated, book }) {
        // state to manage modal visibility
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* Edit Button */}
            {/* triggers modal */}
            <button className={ABM['edit-button']} onClick={() => setShowModal(true)}>
                Edit
            </button>

            {/* Modal */}
            {showModal &&
                createPortal(
                    <>
                        {/* Background Overlay */}
                        {/* closes modal on click */}
                        <div className={ABM['UBM-overlay']} onClick={() => setShowModal(false)}></div>

                        {/* Modal Popup */}
                        <div className={ABM['UBM-popup']}>
                            {/* close btn with unique css styling */}
                            <button
                                className={ABM['close-button']}
                                onClick={() => setShowModal(false)}
                                aria-label="Close Modal"
                            >
                                &times;
                            </button>
                                                        {/* Rendering the form inside the modal */}
                            <ModalContent
                                onBookUpdated={onBookUpdated}
                                book={book}
                                onClose={() => setShowModal(false)}
                            />
                        </div>
                    </>,
                    document.body
                )}
        </>
    );
}

// exporting the component to be used elsewhere
export default UpdateBookModal;
