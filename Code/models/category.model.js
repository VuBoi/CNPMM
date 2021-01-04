var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
})

var categoryModel = mongoose.model('Category', categorySchema, 'categories');

module.exports = categoryModel;