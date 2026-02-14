const express = require('express');
const router = express.Router();
const UserFavourite = require('../models/userFavourite');

const authMiddleware = require('../middleware/tokenMiddleware');

router.post("/addFavourite", authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { img } = req.body;

    if (!img) {
        return res.status(400).json({ message: 'Image is required' });
    }

    const result = await UserFavourite.updateOne(
        { userId },
        { $addToSet: { favourites: img } },
        { upsert: true }
    );

    if (result.modifiedCount === 0 && !result.upsertedId) {
        return res.status(409).json({
            message: "Image alreaddy in favourites"
        })
    }

    res.status(200).json({
        message: "Image added to favourites"
    });
})

router.get("/getFavourite", authMiddleware, async (req, res) => {
    const userId = req.user.id;

    const existingUser = await UserFavourite.findOne({ userId });

    if (!existingUser || existingUser.favourites.length === 0) res.status(200).json([]);

    res.status(200).json(existingUser.favourites);
})

router.post("/removeFavourite", authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { img } = req.body;

    const result = await UserFavourite.updateOne(
        { userId },
        { $pull: { favourites: img } }
    )

    if (result.modifiedCount === 0) {
        return res.status(409).json({
            message: "Image has already been removed"
        })
    }

    res.status(200).json({
        message: "Image removed"
    });
})

module.exports = router;