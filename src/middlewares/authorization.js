const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Không có token xác thực' });
    }
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token không hợp lệ' });
    }
};

module.exports = authorize;