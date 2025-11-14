const express = require('express');
const router = express.Router();

const OrderService = require('../services/orderService');
const OrderServiceInstance = new OrderService();

const CartService = require('../services/cartService');
const CartServiceInstance = new CartService();

const DBHelper = require('../models/db');
const DBH = new DBHelper();

module.exports = (app) => {
    // applying order route
    app.use('/', router);


    // POST - checkout/create an order
    router.post('/checkout', async (req, res, next) => {
        try {
            // get userid and cart id
            const userId = req.user.id;
            // updating cart requires inclusion of cart id
            const cart = await CartServiceInstance.getCartByUserId(userId);
            // unpacking cart details
            const cartId = cart.id;
            const { product_id, quantity } = cart;
            // get total price
            const price = await DBH.calcPrice(product_id, quantity);
            // get current date
            const date = await DBH.getCurrentDate();

            // create order object
            const order = {
                id: await DBH.idMaker('order_table'),
                status: "Pending",
                date: date,
                user_id: userId,
                cart_id: cartId,
                price: price
            };

            console.log(order);
            // response from service call
            const response = await OrderServiceInstance.createOrder(order);
            // success
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }
    });


}

