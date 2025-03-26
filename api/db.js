const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    // adding in our username and password that we set up in PHPmyAdmin
    user: "book_db_user",
    password: "secretPassword1",
    database: "book",
    // using hte port in MAMP's preferences
    port: 8889
});

db.connect((err) => {
    if (err) {
        console.log("ERROR", err);
        return;
    }

    // displayed 'connected' in the console log when we are 
    console.log("connected");
});

// exporting it
module.exports = db;