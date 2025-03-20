const express = require('express');
const app = express();
const mysql = require("mysql2");
const cors = require('cors');
const bodyParser = require("body-parser");
// const db = require("./db");
const port = 3000;

// import the routers
const booksRouter = require('./routers/books'); 
const authorsRouter = require('./routers/authors');

// Accepts requests from any location or url
app.use(cors());
app.use(bodyParser.json())
app.use(express.static('public'));

// Initializing the Routers
app.use("/books", booksRouter);
app.use("/authors", authorsRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});