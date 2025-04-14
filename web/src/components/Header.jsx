import React from 'react';
import h from '../components/Header.module.css';

const Header = ({ handleLogout, isAuthenticated }) => {
    return (
        <header className={h['header']}>
            <h1 className="text-3xl font-serif tracking-wide text-center">My Library</h1>
        </header>
    );
};

export default Header;
