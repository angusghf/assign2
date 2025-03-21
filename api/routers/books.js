const express = require("express");
const booksRouter = express.Router();
const db = require("../db");
const upload = require("../storage");

booksRouter.get("/", (req, res) => {

    const authors = req.query.authors;

    let sql = `
    SELECT novels.*, authors.name AS author
    FROM novels
    JOIN authors ON novels.author_id=authors.id`;

    const queryParams = [];

    if(authors){
        sql += ` WHERE authors.id IN (?)`;
        if(Array.isArray(authors)){
            queryParams.push(...authors);
        } else {
            queryParams.push(authors);
        }
    }

    // console.log(queryParams);

    db.query(sql, [queryParams], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);

    });

});

booksRouter.post("/", upload.single("image"), (req, res) => {
    const { author_id, title } = req.body;
    const image_name = req.file.filename;

    // console.log("author:", author_id);
    // console.log("title:", title);
    // console.log("imageName:", imageName);

    const addNovelSQL = `INSERT INTO novels (author_id, name, image_name) VALUES (?,?,?)`;
    db.query(addNovelSQL, [author_id, title, image_name], (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).send("An error has occured!");
        }

        res.status(200).json({ message: "Book added successfully!" })

    })

});

booksRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM novels WHERE id = ? LIMIT 1`;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }

        res.json({message: "Book Deleted"});

    });


    console.log(id);
    res.send(id);
});

module.exports = booksRouter;