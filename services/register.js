const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const register = async (userInfo) => {
    const { username, email, password } = userInfo;

    if (!username || !email || !password) throw { status: 400, message: 'All fields are required' };

    if (password.length < 6) {
        throw { status: 400, message: 'Password is too short. 6 symbols minimum requried' };
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) throw { status: 400, message: 'Email already in use' };


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: 'user'
    });

    await newUser.save();

    return {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
    };
}


module.exports = {
    register
}