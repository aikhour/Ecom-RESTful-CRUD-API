const express = require('express');
const router = express.Router();
const CartService = require('../services/cartService');
const CartServiceInstance = new CartService();

const DBHelper = require('../models/db');
const DBH = new DBHelper();

module.exports = (app) => {
    // applying cart route
    app.use('/cart', router);

    // POST - make new empty cart for user
    router.post('/', async (req, res, next) => {
        try {
            // get user id
            const userId = req.user.id;
            // request new cart
            const response = await CartServiceInstance.createCart(userId);

            // success
            res.status(201).send(response);

        } catch(error) {
            next(error);
        }
    });

    // GET - get current user carts
    router.get('/', async (req, res, next) => {
        try {
            // get user id
            const { id } = req.user;
            // request cart records
            const response = await CartServiceInstance.getCartByUserId(id);

            // success
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }
    });

    // PUT - update current user cart
    router.put('/', async (req, res, next) => {
        try {
            // get userId and data
            const userId = req.user.id;
            const data = req.body;
            // updating cart requires inclusion of cart id
            const cart = await CartServiceInstance.getCartByUserId(userId);
            const cartId = cart.id;
            // add cartId to data
            const newCart = {id: cartId, ...data};
            console.log(newCart);
            
            // response from service call
            const response = await CartServiceInstance.updateCart(newCart);
            // success
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }

    })
}

