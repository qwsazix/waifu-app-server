const tokenMiddleware = require('../middleware/tokenMiddleware');
const router = require('express').Router();

router.get('/check', tokenMiddleware, (req,res) => {
    res.status(200).json(req.user);
})

module.exports = router;