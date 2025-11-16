const express = require('express');
const router = express.Router();

const OrderService = require('../services/orderService');
const OrderServiceInstance = new OrderService();
const OrderModel = require('../models/orders');
const OrderModelInstance = new OrderModel();

const CartService = require('../services/cartService');
const CartServiceInstance = new CartService();

const DBHelper = require('../models/db');
const DBH = new DBHelper();

module.exports = (app) => {
    // applying order route
    app.use('/checkout', router);


    // POST - checkout/create an order
    router.post('/', async (req, res, next) => {
        try {
            // get userid
            const userId = req.user.id;
            // check if user has an order
            const prevOrder = await OrderModelInstance.getOrderByUserId(userId);
            if(prevOrder) {
                return res.status(409).send(`User already has an order`);
            }

            
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
            // response from service call
            const response = await OrderServiceInstance.createOrder(order);
            // success
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }
    });

    // PUT - Checkout / Mark order as complete
    router.put('/', async (req, res, next) => {
        try {
            // get userid
            const userId = req.user.id;
            // updating order requires inclusion of order id
            const order = await OrderServiceInstance.getOrderByUserId(userId);
            const orderId = order.id;

            // updated status message
            const update = {id: orderId, status: "Complete"};

            // response from service call
            const response = await OrderServiceInstance.updateOrder(update);
            
            // success
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }
    });

    // GET - Get order from user id
    router.get('/', async (req, res, next) => {
        try {
            // get userid
            const userId = req.user.id;
            // updating order requires inclusion of order id
            const response = await OrderServiceInstance.getOrderByUserId(userId);

            res.status(200).send(response);

        } catch(error) {
            next(error);
        }
    });

    // DELETE - Delete order using user id
    router.delete('/', async (req, res, next) => {
        try {
            // get userid
            const userId = req.user.id;
            // updating order requires inclusion of order id
            const order = await OrderServiceInstance.getOrderByUserId(userId);
            const orderId = order.id;
            
            // updating order requires inclusion of order id
            const response = await OrderServiceInstance.deleteOrder(orderId);

            res.status(200).send(response);

        } catch(error) {
            next(error);
        }
    });
}

