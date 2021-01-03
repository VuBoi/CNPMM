var Category = require('../models/category.model');

module.exports.index = async (req, res) => {
    var categories = await Category.find({});
    res.send(categories);
}

module.exports.post = async (req, res) => {
    var category = new Category({
        name: req.body.name,
    })
    const newCategory = await category.save();
    if (newCategory) {
        return res.status(201).send({ message: 'New Category Created!', data: newCategory });
    }
    return res.status(500).send({ message: 'Error in  Creating Category' });
}

module.exports.put = async (req, res) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (category) {
        category.name = req.body.name;

        const updatedCategory = await category.save();
        if (updatedCategory) {
            return res.status(200).send({ message: 'Category Update!', data: updatedCategory });
        }
    }
    return res.status(500).send({ message: 'Error in Updating Category' });
}

module.exports.delete = async (req, res) => {
    const deleteCategory = await Category.findById(req.params.id);
    if (deleteCategory) {
        await deleteCategory.remove();
        res.send({ message: "Category Deleted!" })
    }
    else {
        res.send("Error in Deletion!")
    }
}

module.exports.get = async (req, res) => {
    var category = await Category.findOne({ _id: req.params.id });
    if (category) {
        res.send(category);
    }
    else {
        res.status(404).send({ message: "Category Not Found!" })
    }
}
