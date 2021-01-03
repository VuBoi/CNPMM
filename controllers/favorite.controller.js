var Favorite = require('../models/favorite.model');


module.exports.getMyFavorite = async (req, res) => {
    var favorites = await Favorite.find({ user: req.user._id });
    res.send(favorites);
};

module.exports.post = async (req, res) => {
    var favorite = new Favorite({
        productId: req.body.productId,
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category, 
        user: req.user._id
    })
    // Check Item Existed
    var favoriteExist = await Favorite.findOne({
        productId: req.body.productId,
        user: req.user._id
    });
    if (favoriteExist) {
        return res.status(401).send({ message: 'Items Added Favorite !' })
    }
    else {
        const newFavorite = await favorite.save();
        if (newFavorite) {
            return res.status(201).send({ message: 'New Favorite Created!', data: newFavorite });
        }
        else {
            return res.status(500).send({ message: 'Error in  Creating Favorite' });
        }
    }

};

module.exports.delete = async (req, res) => {
    var favorite = await Favorite.findById(req.params.id);
    if (favorite) {
        var deleteFavorite = await favorite.remove();
        res.send({ message: 'Favorite Deleted', favorite: deleteFavorite });
    } else {
        res.status(404).send({ message: 'Favorite Not Found' });
    }
};

module.exports.deleteProductId = async (req, res) => {
    var Id = await Favorite.findOne({
        productId: req.params.id,
        user: req.user._id
    });
    var favorite = await Favorite.findById(Id._id);
    // console.log(favorite);
    if (favorite) {
        var deleteFavorite = await favorite.remove();
        res.send({ message: 'Favorite Deleted', favorite: deleteFavorite });
    } else {
        res.status(404).send({ message: 'Favorite Not Found' });
    }
};