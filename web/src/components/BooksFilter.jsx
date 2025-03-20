import { useState, useEffect } from 'react';

import BFC from '../components/BookFilters.module.css';

function BookFilters() {

    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/authors")
            .then((response) => response.json())
            .then( data => {
                setAuthors(data);
                console.log("---authors---");
                console.log(data);
                setAuthors(data);
            });
    }, []);

    return (
        <div className={BFC['filters-container']}>
            <form>
                <h4>Authors</h4>
                <label>
                    <input type="checkbox" name="author" />
                    Author Name
                </label>
                <input type="submit" value="Apply" />
            </form>
        </div>
    );
}

export default BookFilters;
