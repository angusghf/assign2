import { useState, useEffect } from 'react';

import BFC from '../components/BookFilters.module.css';

function BookFilters( { updateBooks } ) {

    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/authors")
            .then( (response) => response.json() )
            .then( data => {
                setAuthors(data);
            });
    }, []);

    const handleFilterSubmit = (event) => {
        event.preventDefault();

        const filterFormData = new FormData(event.target);
        const selectedAuthors = filterFormData.getAll("authors");

        const queryStringArray = selectedAuthors.map((id) => `authors=${id}`);
        const queryString = queryStringArray.join("&")

        fetch(`http://localhost:3000/books?${queryString}`)
            .then( (response) => response.json())
            .then( (data) => {
                updateBooks(data);
            });

        // console.log("---Selected Authors Query---")
        // console.log(queryString);

    }

    return (
        <div className={BFC['filters-container']}>
            <form onSubmit={handleFilterSubmit}>
                <h4>Authors</h4>
                {authors.map(author => {
                    return (
                        <label key={author.id}>
                            <input type="checkbox" name="authors" value={author.id} />
                            {author.name}
                        </label>
                    );
                })}
                <input type="submit" value="Apply" />
            </form>
        </div >
    );
}

export default BookFilters;
