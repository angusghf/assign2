import ABM from '../pages/AllBooks.module.css';

function DeleteBookModalContent({ onClose }) {
    return (
        <div className={`${ABM["delete-modal-prompt"]}`}>
            <div>
                <h3>Are you sure u want to delete?</h3>
                <button onClick={onClose}
                    className={`${ABM["exit-btn"]}`}
                >x</button>
            </div>
        </div>
    )
}

export default DeleteBookModalContent;