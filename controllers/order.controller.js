var Order = require('../models/order.model');

module.exports.getOrderDetail = async (req, res) => {
    var order = await Order.findById(req.params.id);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
};
module.exports.getMyOrder = async (req, res) => {
    var orders = await Order.find({ user: req.user._id });
    res.send(orders);
};

module.exports.getOrder = async (req, res) => {
    var orders = await Order.find({}).populate('user','name');
    res.send(orders);
};

module.exports.postCreate = async (req, res) => {
    if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty' });
    } else {
        var order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
        });
        var createdOrder = await order.save();
        res.status(201).send({ message: 'New Order Created', order: createdOrder });
    }
};

module.exports.putPayment = async (req, res) => {
    var order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };
        var updatedOrder = await order.save();
        res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
};

module.exports.putDeliver = async (req, res) => {
    var order = await Order.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        var updatedOrder = await order.save();
        res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
};

module.exports.putReceive = async (req, res) => {
    var order = await Order.findById(req.params.id);
    if (order) {
        order.isReceived = true;
        order.receivedAt = Date.now();

        var updatedOrder = await order.save();
        res.send({ message: 'Order Received', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
};

module.exports.delete = async (req, res) => {
    var order = await Order.findById(req.params.id);
    if (order) {
        var deleteOrder = await order.remove();
        res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
};