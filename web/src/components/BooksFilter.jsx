import { useState, useEffect } from 'react';

// importing book filter component
import BFC from '../components/BookFilters.module.css';

function BookFilters({ updateBooks }) {

    // setting up state to store the list of authors from the database
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        // fetching the athors from the server
        fetch("http://localhost:3000/authors")
            // converting that resposne into readable json
            .then((response) => response.json())
            .then(data => {
                setAuthors(data);
            });
        // empty array = runs once when component mounts
    }, []);

    // function to handle form submission when filters are applied
    const handleFilterSubmit = (event) => {
        // prevents default form submission
        event.preventDefault();

        // create a FormData object to get the selected authors
        const filterFormData = new FormData(event.target);
        const selectedAuthors = filterFormData.getAll("authors");

        const queryStringArray = selectedAuthors.map((id) => `authors=${id}`);
        const queryString = queryStringArray.join("&")

        // fetch filtered books from the server based on the selected authors
        fetch(`http://localhost:3000/books?${queryString}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt-token")}`
            }
        })
            // again, changing it into readable json
            .then((response) => response.json())
            .then((data) => {
                // update book list w filtered data
                updateBooks(data);
            });

        // console logs for debugging that we commented out
        // console.log("---Selected Authors Query---")
        // console.log(queryString);

    }

    return (
        // container for the filter section, styled with CSS module
        <div className={BFC['filters-container']}>
            <form onSubmit={handleFilterSubmit}>
                <h4>Authors</h4>
                {/* Mapping through the list of authors to create checkboxes */}
                {authors.map(author => {
                    return (
                        // labeling it based on the author ids available
                        <label key={author.id}>
                            <input type="checkbox" name="authors" value={author.id} />
                            {author.name}
                        </label>
                    );
                })}
                {/* Submit button to apply the selected filters */}
                <input type="submit" value="Apply" />
            </form>
        </div >
    );
}

// exporting it if we need it else where
export default BookFilters;
