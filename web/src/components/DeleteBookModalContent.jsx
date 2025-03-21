import ABM from '../pages/AllBooks.module.css';

function DeleteBookModalContent({ book, onClose, onBookDeleted }) {

    const handleDeleteBook = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/books/${book.id}`, {
            method: "DELETE"
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            onBookDeleted();
            onClose();
        })


    }

    return (
        <div className={`${ABM["delete-modal-prompt"]}`}>
            <div>
                <h3>Are you sure u want to delete {book.name} by {book.author}?</h3>
                <form onSubmit={handleDeleteBook}>
                    <button
                        className={`${ABM["delete-book-btn"]}`}
                        type="submit"
                    >
                        Yes, delete this book.
                    </button>
                </form>
                <button onClick={onClose}
                    className={`${ABM["exit-btn"]}`}
                >x</button>
            </div>
        </div>
    )
}

export default DeleteBookModalContent;