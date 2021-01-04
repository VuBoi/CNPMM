var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }, 
    phone: { type: Number, required: false },
    isAdmin: { type: Boolean, require: true, default: false },
    isStaff: {type: Boolean, require: true, default: false}
})

var userModel = mongoose.model('User', userSchema, 'users');

module.exports = userModel;