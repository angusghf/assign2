const express = require("express");
const authorsRouter = express.Router();
const db = require("../db");

// Route to get all authors
authorsRouter.get("/", (req, res) => {

    // SQL query to fetch all authors from the database
    const sql = "SELECT * FROM authors";

    // Execute the query
    db.query(sql, (err, results) => {
        // if error, send back an error message
        if (err) {
            res.status(500).send(err);
            // and return it 
            return;
        }
        // Send back the results in JSON format
        res.json(results);

    })

})

// Export the router to be used elsewhere
module.exports = authorsRouter;