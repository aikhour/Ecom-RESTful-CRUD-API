const express = require('express');
const router = express.Router();
const OrderService = require('../services/orderService');

const OrderServiceInstance = new OrderService();

module.exports = (app) => {
    // applying order route
    app.use('/orders', router);

    
}

