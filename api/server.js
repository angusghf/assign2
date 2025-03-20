const express = require('express');
const app = express();
const mysql = require("mysql2");
const port = 3000;

app.use(express.static('public'));
const connection = mysql.createConnection({
    host: "localhost",
    user: "book_db_user",
    password: "secretPassword1",
    database: "book",
    port: 8889
});

connection.connect((err) => {
    if (err) {
        console.log("ERROR", err);
        return;
    }

    console.log("connected");
});



app.get("/books", (req, res) => {
    const sql = `
    SELECT novels.*, authors.name AS author
    FROM novels
    JOIN authors ON novels.authors_id=authors.id
        `;

    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);

    });

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});