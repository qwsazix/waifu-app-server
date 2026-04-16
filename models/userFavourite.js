const mongoose = require('mongoose');

const userFavourite = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    favourites: [
        {
            url: {type: String, required: true},
            source: {type: String}
        }
    ]
})

const UserFavourite = mongoose.model('UserFavourite', userFavourite);

module.exports = UserFavourite;