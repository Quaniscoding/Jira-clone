
const jwt = require('jsonwebtoken');

const generateToken = (data, expiresIn = '10d') => {
    const secretKey = process.env.JWT_SECRET || 'defaultSecret';
    return jwt.sign({ data }, secretKey, { algorithm: 'HS256', expiresIn });
};

const checkToken = (token) => {
    try {
        const secretKey = process.env.JWT_SECRET || 'defaultSecret';
        const decodedToken = jwt.verify(token, secretKey);
        if (decodedToken.exp < Date.now() / 1000) {
            return { checkData: false, message: 'Token has expired!' };
        }

        return { checkData: true, message: '' };
    } catch (error) {
        return { checkData: false, message: error.message };
    }
};

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    const verifyTokenResult = checkToken(token);

    if (verifyTokenResult.checkData) {
        next();
    } else {
        res.status(401).send({
            status: 401,
            content: verifyTokenResult.message,
            dateTime: new Date(),
        });
    }
};

const getTokenFromHeader = (req) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    return authHeader.split(' ')[1];
};
const verifyTokenAuthorization = (req, res, next) => {
    const token = getTokenFromHeader(req);

    if (!token) {
        return res.status(401).send({
            status: 401,
            content: 'Authorization header missing or invalid',
            dateTime: new Date(),
        });
    }

    const verifyTokenResult = checkToken(token);

    if (verifyTokenResult.checkData) {
        next();
    } else {
        res.status(401).send({
            status: 401,
            content: verifyTokenResult.message,
            dateTime: new Date(),
        });
    }
}
const getUserInfoFromToken = (req, res, next) => {
    // Extract the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
        // Handle case where token is missing
        return res.status(401).json({ error: 'Token is missing' });
    }

    try {
        // Verify the token and decode the payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Extract user information from the decoded payload
        const userInfo = {
            _id: decoded._id,
            username: decoded.username
        };

        // Attach the user information to the request object
        req.user = userInfo;

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        // Handle case where token is invalid or expired
        return res.status(401).json({ error: 'Invalid token' });
    }
};
module.exports = {
    generateToken,
    checkToken,
    verifyToken,
    verifyTokenAuthorization,
    getUserInfoFromToken
};
