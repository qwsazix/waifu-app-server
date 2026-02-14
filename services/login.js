const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (logInfo) => {
    const { email, password } = logInfo;

    if (!email || !password) throw {status: 400, message: 'Email and password required'};

    const existingUser = await User.findOne({ email });

    if (!existingUser) throw {status: 401, message: 'Invalid email or password'};

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) throw {status: 401, message:'Invalid email or password'};

    const payload = {
        id: existingUser._id,
        username: existingUser.username,
        email
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    return token;
}

module.exports = {
    login
};