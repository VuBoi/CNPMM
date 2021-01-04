var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, default: 0 },
        comment: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

var productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    salePrice:{ type: Number, default: 0, required:true },
    rating: { type: Number, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: true },
    tag: { type: String, default: 'None', required: true },
    description: { type: String, required: true },
    countInStock: { type: Number, default: 0, required: true },
    reviews: [reviewSchema]
})

var productModel = mongoose.model('Product', productSchema, 'products');

module.exports = productModel;