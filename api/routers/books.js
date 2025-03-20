const express = require("express");
const booksRouter = express.Router();
const db = require("../db");
const upload = require("../storage");

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

booksRouter.post("/", upload.single("image"), (req, res) => {
    const { author_id, title } = req.body;
    const imageName = req.file.filename;
    console.log("author:", author_id);
    console.log("title:", title);
    console.log("imageName:", imageName);
});

module.exports = booksRouter;