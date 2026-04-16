const express = require('express');
const router = express.Router();
const UserFavourite = require('../models/userFavourite');

const authMiddleware = require('../middleware/tokenMiddleware');

router.post("/addFavourite", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { img } = req.body;

        if (!img || !img.url) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const result = await UserFavourite.updateOne(
            {
                userId,
                "favourites.url": { $ne: img.url }
            },
            { $push: { favourites: { url: img.url, source: img.source || '' } } },
            { upsert: false }
        );

        if (result.modifiedCount === 0) {

            const userExists = await UserFavourite.exists({ userId });

            if (!userExists) {
                await UserFavourite.create({
                    userId,
                    favourites: [{ url: img.url, source: img.source || '' }]
                })
            } else {
                return res.status(409).json({
                    message: "Image alreaddy in favourites"
                })
            }
        }

        res.status(200).json({
            message: "Image added to favourites"
        });

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.get("/getFavourite", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const existingUser = await UserFavourite.findOne({ userId });

        if (!existingUser || existingUser.favourites.length === 0) return res.status(200).json([]);

        const normalizedFavourites = existingUser.favourites.map(fav => {
            return typeof fav === 'string' ? { url: fav, source: '' } : fav;
        });

        return res.status(200).json(normalizedFavourites);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err });
    }
})

router.post("/removeFavourite", authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { img } = req.body;

    const result = await UserFavourite.updateOne(
        { userId },
        { $pull: { favourites: { url: img.url } } }
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