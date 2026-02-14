const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const createAdmin = async () => {
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EM });
    if (existingAdmin) {
        console.log('Admin account exists');
    } else {
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PW, 10);
        const admin = await new User({
            username: 'admin',
            email: process.env.ADMIN_EM,
            password: hashedPassword,
            role: 'admin'
        });
        
        await admin.save();
        console.log('Admin account created');
    }
}

module.exports = createAdmin;