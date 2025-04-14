import { Link } from 'react-router';

import React from 'react';
import h from '../components/Header.module.css';


const Header = ({ handleLogout, isAuthenticated }) => {
    return (
        <header className={h['header']}>
            <h1 className="text-3xl font-serif tracking-wide text-center">My Library</h1>
            <div>
                    {isAuthenticated ? (
                        <button onClick={handleLogout}>Log Out</button>
                    ) : (
                        <Link to="/sign-in">Log In</Link>
                    )}
                </div>
        </header>
    );
};

export default Header;
