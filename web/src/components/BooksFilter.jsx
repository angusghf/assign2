import React, { useState } from 'react';
import BFC from '../components/BookFilters.module.css';

const BooksFilter = () => {
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleFilterChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedFilters((prevFilters) => [...prevFilters, value]);
        } else {
            setSelectedFilters((prevFilters) =>
                prevFilters.filter((filter) => filter !== value)
            );
        }
    };

    return (
<div className={BFC['filters-container']}>
            <h2>Books Filter</h2>
            <label>
                <input
                    type="checkbox"
                    value="Fiction"
                    onChange={handleFilterChange}
                />
                Jeff Lindsay
            </label>
            <label>
                <input
                    type="checkbox"
                    value="Fiction"
                    onChange={handleFilterChange}
                />
                JD Salinger
            </label>
            <label>
                <input
                    type="checkbox"
                    value="Fiction"
                    onChange={handleFilterChange}
                />
                Kenneth Oppel
            </label>
            <label>
                <input
                    type="checkbox"
                    value="Fiction"
                    onChange={handleFilterChange}
                />
                Ryan Holiday
            </label>
            
            {/* Add more checkbox labels as needed */}
        </div>
    );
};

export default BooksFilter;