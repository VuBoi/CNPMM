var Product = require('../models/product.model');

module.exports.index = async (req, res) => {
    var products = await Product.find({});
    res.send(products);
}

module.exports.get = async (req, res) => {
    var product = await Product.findOne({ _id: req.params.id });
    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({ message: "Product Not Found!" })
    }
}

module.exports.postCreate = async (req, res) => {
    var product = new Product({
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        salePrice: req.body.salePrice,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        tag: req.body.tag,
        description: req.body.description,
        countInStock: req.body.countInStock
    })
    const newProduct = await product.save();
    if (newProduct) {
        return res.status(201).send({ message: 'New Product Created!', data: newProduct });
    }
    return res.status(500).send({ message: 'Error in  Creating Product' });
}

module.exports.put = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.category = req.body.category;
        product.image = req.body.image;
        product.price = req.body.price;
        product.salePrice = req.body.salePrice,
        product.tag = req.body.tag;
        product.description = req.body.description;
        product.countInStock = req.body.countInStock;

        const updatedProduct = await product.save();
        if (updatedProduct) {
            return res.status(200).send({ message: 'Product Update!', data: updatedProduct });
        }
    }
    return res.status(500).send({ message: 'Error in Updating Product' });
}

module.exports.delete = async (req, res) => {
    const deleteProduct = await Product.findById(req.params.id);
    if (deleteProduct) {
        await deleteProduct.remove();
        res.send({ message: "Product Deleted!" })
    }
    else {
        res.send("Error in Deletion!")
    }
}

module.exports.Rating = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        const review = {
            name: req.body.name,
            rating: Number(req.body.rating),
            comment: req.body.comment,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =  product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
        const updatedProduct = await product.save();
        res.status(201).send({
            data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
            message: 'Review saved successfully.',
        });
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
};