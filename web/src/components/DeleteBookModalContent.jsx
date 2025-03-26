// importing styling 
import ABM from '../pages/AllBooks.module.css';

function DeleteBookModalContent({ book, onClose, onBookDeleted }) {

    const handleDeleteBook = (event) => {
        event.preventDefault();
        // fetching our backend api books
        fetch(`http://localhost:3000/books/${book.id}`, {
            // delete method here
            method: "DELETE"
        })
            // converting it into readable json
            .then((response) => response.json())
            .then((data) => {
                // console logging the data
                console.log(data);
                // notifying the parent component that the book was deleted
                onBookDeleted();
                // closing the modal after deletion
                onClose();
            })


    }

    return (
        // modal container with custom styling
        <div className={`${ABM["delete-modal-prompt"]}`}>
            <div>
                {/* confirmation message with the book author and name of the book */}
                <h3>Are you sure u want to delete {book.name} by {book.author}?</h3>
                {/* form that triggers the delete function when submitted */}
                <form onSubmit={handleDeleteBook}>
                    <button
                        className={`${ABM["delete-book-btn"]}`}
                        type="submit"
                    >
                        Yes, delete this book.
                    </button>
                </form>
                {/* button to close the modal without deleting the book */}
                <button onClick={onClose}
                    className={`${ABM["exit-btn"]}`}
                >x</button>
            </div>
        </div>
    )
}

// exporting it to be used elsewhere
export default DeleteBookModalContent;