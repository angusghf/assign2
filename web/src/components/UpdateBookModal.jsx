import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './UpdateBookModalContent';

import ABM from '../pages/AllBooks.module.css';

function UpdateBookModal({ onBookUpdated, book }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* Edit Button */}
            <button className={ABM['edit-button']} onClick={() => setShowModal(true)}>
                Edit
            </button>

            {/* Modal */}
            {showModal &&
                createPortal(
                    <>
                        {/* Background Overlay */}
                        <div className={ABM['UBM-overlay']} onClick={() => setShowModal(false)}></div>

                        {/* Modal Popup */}
                        <div className={ABM['UBM-popup']}>
                            <button
                                className={ABM['close-button']}
                                onClick={() => setShowModal(false)}
                                aria-label="Close Modal"
                            >
                                &times;
                            </button>
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

export default UpdateBookModal;
