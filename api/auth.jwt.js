const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access denied" })
    }

    jwt.verify(token, JWT_SECRET, (err, userData) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or Expired!" });
        }
        req.user = userData;
        next();
    })
}

module.exports = authenticateToken;