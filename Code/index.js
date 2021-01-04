var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');

var userRoute = require('./routes/user.route');
var productRoute = require('./routes/product.route');
var uploadRoute = require('./routes/upload.route');
var orderRoute = require('./routes/order.route');
var searchRoute = require('./routes/search.route');
var categoryRoute = require('./routes/category.route');
var favoriteRoute = require('./routes/favorite.route');
var path = require('path');
// 


dotenv.config();
var URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

var app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/favorites/', favoriteRoute);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});
// Search
app.use('/api/search', searchRoute);
// Upload Image LocalHost
app.use('/api/uploads', uploadRoute);

// 
var __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// 
if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "frontend/build")));
    // Handle React routing, return all requests to React app
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
    });
}
var port = process.env.PORT;
app.listen(port, function () {
    console.log("Server start at https://localhost:" + port);
})
