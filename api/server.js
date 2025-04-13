const express = require('express');
const app = express();
const mysql = require("mysql2");
const cors = require('cors');
const bodyParser = require("body-parser");
// const db = require("./db");

const usersRouter = require("./routers/users");

const port = 3000;

// import the routers
const booksRouter = require('./routers/books'); 
const authorsRouter = require('./routers/authors');

// Accepts requests from any location or url
app.use(cors());
app.use(bodyParser.json())
// static express so that we can showcase images to the public
app.use(express.static('public'));

// Initializing the Routers
app.use("/books", booksRouter);
app.use("/authors", authorsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
    // and putting this console log here so that we know it's live
    console.log(`Book app listening on port ${port}`)
});