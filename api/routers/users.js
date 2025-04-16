require("dotenv").config();

// imports
const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

// Get the secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET

// login secret for debugging
console.log(JWT_SECRET);

const usersRouter = express.Router();

usersRouter.post("/", [
    // validating the email and password inputs
    body("email").isEmail().withMessage("Invalid Email").normalizeEmail(),
    // making sure that the password is atleast 8 characters long
    body("password").isLength({ min: 8 }).withMessage("Must be at least 8 characters long")
], async (req, res) => {

    const errors = validationResult(req);
    // if there are any errors, return a 400 status code
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }


    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, hashedPassword],
        (err, result) => {
            // if there is an error, return a 500 status code
            if (err) {
                console.log(err);
                return res.status(500).send();
            }
            // otherwise, return a 201 status code
            res.status(201).json({
                message: "User Created!",
                userId: result.insertId
            })

        }
    );



});

usersRouter.post("/sign-in", async (req, res) => {
    // validate emil inpiuts
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
        if (err) {
            return res.status(401).json({ "message": "Invalid username or password" })
        }
        const userData = result[0];
        const passwordMatch = await bcrypt.compare(password, userData.password);

        // Compare entered password with hashed password in database
        if (!passwordMatch) {
            return res.status(401).json({ "message": "Invalid username or password" })
        }

        // If successful, create a JWT token
        const token = jwt.sign({
            userId: userData.id,
            email: userData.email
        }, JWT_SECRET, { expiresIn: "4hr" });
        res.json({ message: "Success!", jwt: token });

    });

    // console.log(req.body);
    // res.send({ body: req.body });
})

module.exports = usersRouter;
