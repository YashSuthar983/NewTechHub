// Simple auth middleware - checks for username in request header
const authenticateUser = (req, res, next) => {
    const username = req.headers['x-username'];

    if (!username) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    // Set user info on request
    req.user = { username };
    next();
};

module.exports = authenticateUser;
