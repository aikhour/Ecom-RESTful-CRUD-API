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
            // get user id and data
            const { id } = req.user;
            const data = req.body;
            // request new cart
            const response = await CartServiceInstance.createCart(id);

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
    
    // test route
    router.get('/a', async (req, res, next) => {
        try {
            const response = await DBH.idMaker('cart_table');

            // success
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }
    });

    
}

