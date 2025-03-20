const express = require("express");
const booksRouter = express.Router();
const db = require("../db");

booksRouter.get("/", (req, res) => {
    const sql = `
    SELECT novels.*, authors.name AS author
    FROM novels
    JOIN authors ON novels.author_id=authors.id
        `;

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);

    });

});

module.exports = booksRouter;