const jwt = require('jsonwebtoken'); //берем jwt чтобы проверять актуальность токена

const tokenMiddleware = async (req,res,next) => {
    const authorization = req.headers.authorization; //забираем с headers ключ authorization

    if (!authorization || !authorization.startsWith('Bearer')) {
        return res.status(401).json({message: 'There is no token'});
    }

    const token = authorization.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: 'Invalid or expired token. If you see this error, please log in to your account again.'});
    }
}

module.exports = tokenMiddleware;