const mysql = require("mysql2");

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: "localhost",
    // adding in our username and password that we set up in PHPmyAdmin
    user: "book_db_user",
    password: "secretPassword1",
    database: "book",
    // using hte port in MAMP's preferences
    port: 8889
});

// Connect to the database
db.connect((err) => {
    if (err) {
        // if the connection fails, log it into the console and dont go any further
        console.log("ERROR", err);
        // dont go any further than this
        return;
    }

    // displayed 'connected' in the console log when we are 
    console.log("connected");
});

// exporting it to be used elsewhere
module.exports = db;