var User = require('../models/user.model');
var util = require('../util/util');
var bcrypt = require('bcryptjs');
var data = require('../data.js');

module.exports.postSignin = async (req, res) => {
    var signinUser = await User.findOne({
        email: req.body.email
    });
    if (signinUser) {
        if (bcrypt.compareSync(req.body.password, signinUser.password)) {
            res.send({
                _id: signinUser.id,
                name: signinUser.name,
                email: signinUser.email,
                phone: signinUser.phone,
                isAdmin: signinUser.isAdmin,
                isStaff: signinUser.isStaff,
                token: util.getToken(signinUser)
            });
            return;
        }
        else{
            res.status(401).send({ message: 'Invalid Email or Password!' });
        }
    }
    else {
        res.status(401).send({ message: 'Invalid Email or Password!' });
    }
}

module.exports.postSignup = async (req, res) => {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        phone: req.body.phone
    })
    var newUser = await user.save(); 
    if (newUser) {
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            isAdmin: newUser.isAdmin,
            isStaff: newUser.isStaff,
            token: util.getToken(newUser)
        })
    }
    else {
        res.status(401).send({ message: 'Invalid User Data !' });
    }
}

module.exports.createAdmin = async (req, res) => {
    var users = await User.find({});
    if (users.length === 0) {
        var createAdmin = await User.insertMany(data.users);
        res.status(201).send({ message: ' Account Admin Created Successful!', data: { createAdmin } })
    }
    else if (users.some(user => user.name === 'Vu Boi' && user.isAdmin === true)) {
        res.send({ message: 'Account Admin Has Been Created!' });
    }
    else {
        var createAdmin = await User.insertMany(data.users);
        res.status(201).send({ message: ' Account Admin Created Successful!', data: { createAdmin } })
    }
}

module.exports.index = async (req, res) => {
    var users = await User.find({});
    if (users){
        res.send(users);
    }
    else(
        res.status(404).send({ message: "User List Not Found!" })
    )
}

module.exports.get = async (req, res) => {
    var user = await User.findOne({ _id: req.params.id });
    if (user) {
        res.send(user);
    }
    else {
        res.status(404).send({ message: "User Not Found!" })
    }
}

module.exports.putUserProfile = async (req, res) => {
    var userId = req.user._id;
    var user = await User.findById(userId);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        var updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            isAdmin: updatedUser.isAdmin,
            isStaff: updatedUser.isStaff,
            token: util.getToken(updatedUser)
        });
    }
}

module.exports.putUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        user.phone = req.body.phone || user.phone;
        user.isAdmin = Boolean(req.body.isAdmin);
        user.isStaff = Boolean(req.body.isStaff);
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            isAdmin: updatedUser.isAdmin,
            isStaff: updatedUser.isStaff,
            token: util.getToken(updatedUser)
        });
    } else {
        res.status(404).send({ message: 'User Not Found' });
    }
}

module.exports.delete = async (req, res) => {
    const deleteUser = await User.findById(req.params.id);
    if (deleteUser) {
        if (deleteUser.isAdmin === true) {
            res.status(400).send({ message: "Can't Delete Account Admin!" });
            return;
        }
        await deleteUser.remove();
        res.send({ message: "User Deleted!" })
    }
    else {
        res.send("Error in Deletion!")
    }
}

