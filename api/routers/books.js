const express = require("express");
const db = require("../db");
const upload = require("../storage");

const booksRouter = express.Router();

// Get all books with optional filtering by authors
booksRouter.get("/", (req, res) => {
    // Get the authors query parameter
    const authors = req.query.authors;

    let sql = `
    SELECT novels.*, authors.name AS author
    FROM novels
    JOIN authors ON novels.author_id=authors.id`;

    const queryParams = [];

    if (authors) {
        // Filter books by author IDs
        sql += ` WHERE authors.id IN (?)`;
        if (Array.isArray(authors)) {
            queryParams.push(...authors);
        } else {
            queryParams.push(authors);
        }
    }

    db.query(sql, [queryParams], (err, results) => {
        if (err) {
            // Send error response if there's an error
            res.status(500).send(err);
            return;
        }
        // Send the books as JSON response
        res.json(results);
    });
});

// Add a new book
booksRouter.post("/", upload.single("image"), (req, res) => {
    // Get author ID and title from request body
    const { author_id, title } = req.body;
    // Get the filename of the uploaded image
    const image_name = req.file.filename;

    const addNovelSQL = `INSERT INTO novels (author_id, name, image_name) VALUES (?,?,?)`;
    db.query(addNovelSQL, [author_id, title, image_name], (err, results) => {
        if (err) {
            console.log(err);
            // Send error response if there's an error
            return res.status(500).send("An error has occurred!");
        }
        // Send success response
        res.status(200).json({ message: "Book added successfully!" });
    });
});

// Delete a book by ID
booksRouter.delete("/:id", (req, res) => {
    // Get the book ID from the request parameters
    const id = req.params.id;
    const sql = `DELETE FROM novels WHERE id = ? LIMIT 1`;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.log(err);
            // Send error response if there's an error
            res.status(500).send("Internal Server Error");
        }
        // Send success response
        res.json({ message: "Book Deleted" });
    });
});

// Update a book by ID
booksRouter.put("/:id", upload.single("image"), (req, res) => {
    // Get the book ID from the request parameters
    const { id } = req.params;
    // Get author ID and title from request body
    const { author_id, title } = req.body;

    let updateNovelSQL = `UPDATE novels SET name = ?, author_id = ?`;

    const queryParams = [title, author_id];

    if (req.file) {
        // Update the image name if a new image is uploaded
        updateNovelSQL += `, image_name = ?`;
        queryParams.push(req.file.filename);
    }

    updateNovelSQL += ` WHERE id = ? LIMIT 1`;
    queryParams.push(id);

    db.query(updateNovelSQL, queryParams, (err, results) => {
        if (err) {
            console.log(err);
            // Send error response if there's an error
            return res.status(500).send("Internal Server Error");
        }
        // Send success response
        res.json({ message: "Book updated successfully!" });
    });
});

module.exports = booksRouter;
