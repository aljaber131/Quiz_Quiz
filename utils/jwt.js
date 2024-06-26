const jwt = require('jsonwebtoken')

function genarateToken({ email, id, role }) {
    const payload = { email, id, role }
    console.log(payload);
    console.log(process.env.JWT_SECRET)
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log(process.env.JWT_SECRET)
        if (err) {
            console.log(err)
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
};

function verifyRole(req, res, next) {
    if (req.user.role === 'player') {
        return next();
    }
    return res.status(403).json({ message: 'Failed to authenticate role' });
};

module.exports = { genarateToken, verifyToken, verifyRole };