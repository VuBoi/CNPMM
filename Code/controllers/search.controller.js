var Product = require('../models/product.model');

module.exports.searchProduct = async (req, res) => {
    var keyword = req.query.q;
    var products = await Product.find({});
    var searchProduct = await products.filter(product => {
        return product.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    })
    res.send(searchProduct);
}

