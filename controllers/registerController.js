const userService = require('../services/register');

const regController = async (req,res) => {
    try {
        const userInfo = req.body;

        const newUser = await userService.register(userInfo);
        res.status(201).json({message: 'User created succesfully', newUser});

    } catch (error) {
        res.status(error.status || 500).json({
            message:  error.message || 'Registration error'
        });
    }
}

module.exports = regController;