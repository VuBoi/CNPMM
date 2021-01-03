var mongoose = require('mongoose');

var favoriteSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

var favoriteModel = mongoose.model('Favorite', favoriteSchema, 'favorites');

module.exports = favoriteModel;