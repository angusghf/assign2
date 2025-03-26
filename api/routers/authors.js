const express = require("express");
const authorsRouter = express.Router();
const db = require("../db");

authorsRouter.get("/", (req, res) => {

    const sql = "SELECT * FROM authors";

    db.query(sql, (err, results) => {
        // if error, send back an error message
        if (err) {
            res.status(500).send(err);
            // and return it 
            return;
        }
        res.json(results);
        
    })

})



module.exports = authorsRouter;