// importing react toolkit library and the unique css stying
import React from 'react';
import h from '../components/Header.module.css';

const Header = () => {
    return (
        // giving it the custom styling
        <header className={h['header']}>
            {/* and some text */}
            <h1 className="text-3xl font-serif tracking-wide text-center">My Library</h1>
        </header>
    );
};

export default Header;
