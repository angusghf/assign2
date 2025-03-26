// Importing the multer library for file uploads
const multer = require("multer");
// Importing the path module for file path manipulation
const path = require("path");

const storageSettings = multer.diskStorage({
    destination: (req, file, callback) => {
        // Setting the destination folder for uploaded files
        callback(null, "public/images");
    },
    filename: (req, file, callback) => {
        // Generating a unique filename for each uploaded file
        callback(null, Date.now() + path.extname(file.originalname));
    }
});

// Creating a multer middleware with the specified storage settings
const upload = multer({ storage: storageSettings });

// Exporting the multer middleware for use in other files
module.exports = upload; 
