const mongoose = require('mongoose');

const userFavourite = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        uniquie: true
    },
    favourites: {
        type: [String],
        default: [],
    }
})

const UserFavourite = mongoose.model('UserFavourite', userFavourite);

module.exports = UserFavourite;