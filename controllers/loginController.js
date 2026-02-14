const userService = require('../services/login');

const loginController = async (req,res) => {
    try {
        const logInfo = req.body;
        const token = await userService.login(logInfo);

        res.status(200).json({
            message: 'Login succesfully',
            token
        })

    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Login error'
        });
    }
}

module.exports = loginController;