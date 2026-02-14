const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (logInfo) => {
    const { login, password } = logInfo;

    if (!login || !password) throw {status: 400, message: 'Email and password required'};

    const existingUser = await User.findOne({
        $or: [
            { username: login },
            { email: login }
        ]
    });

    if (!existingUser) throw {status: 401, message: 'Invalid login or password'};

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) throw {status: 401, message:'Invalid login or password'};

    const payload = {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    return token;
}

module.exports = {
    login
};