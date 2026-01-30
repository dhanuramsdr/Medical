const User = require('../Schema/userSchema');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: '../Config/.env' });

exports.isAuthenticatedUser = async (req, res, next) => {
    console.log("Before token");

    // Check token in Authorization header
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; 

    console.log('Is Auth:', token);

    if (!token) {
        return res.status(401).json({ message: "Authentication token is missing" });
    }

    try {
        console.log('token:', token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with the correct secret
        console.log("decoded", decoded);

        // Find the user by ID in the database
        req.user = await User.findById(decoded.id); 
        console.log("req.user isauth",req.user);
        
        // Use the decoded variable
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }

        next(); // Proceed to the next middleware
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};