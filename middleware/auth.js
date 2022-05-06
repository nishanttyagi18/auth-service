const jwt = require('jsonwebtoken');
const config = process.env;

const verifyToken = (req, res, next) => {
    let token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    const authToken = req.headers["authorization"];
    if (authToken) {
        token = authToken.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            result: false,
            error: "Please provide a JWT token"
        });
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({
            result: false,
            error: "JWT Verification Failed"
        });
    }
    return next();
};

module.exports = verifyToken;