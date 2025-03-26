// importing react toolkit library
import React from 'react';
// importing the css styling for that too
import f from '../components/Footer.module.css';

const Footer = () => {
    return (
        // giving it some unique styling 
        <footer className={f['footer']}>
            {/* and the P line */}
            <p>I'm a footer and i do footer things</p>
        </footer>
    );
};

// exporting it to be used on the main pages
export default Footer;