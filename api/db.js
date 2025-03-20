const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "book_db_user",
    password: "secretPassword1",
    database: "book",
    port: 8889
});

db.connect((err) => {
    if (err) {
        console.log("ERROR", err);
        return;
    }

    console.log("connected");
});

module.exports = db;