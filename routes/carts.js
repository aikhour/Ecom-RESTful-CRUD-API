const express = require('express');
const router = express.Router();
const CartService = require('../services/cartService');
const CartServiceInstance = new CartService();

const DBHelper = require('../models/db');
const DBH = new DBHelper();

module.exports = (app) => {
    // applying cart route
    app.use('/cart', router);

    /**
     * @swagger
     * /cart:
     *   post:
     *     tags:
     *       - Carts
     *     description: Creates a new cart for the user
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Successfully created
     */
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


    /**
     * @swagger
     * /cart:
     *   get:
     *     tags:
     *       - Carts
     *     description: Returns the user cart
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: The current user cart
     *         schema:
     *           $ref: '#/definitions/Cart'
     */
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

    /**
     * @swagger
     * /cart:
     *   put:
     *     tags: Carts
     *     description: Updates current user cart
     *     produces: application/json
     *     responses:
     *       200:
     *         description: Successfully updated
     */
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
            
            // response from service call
            const response = await CartServiceInstance.updateCart(newCart);
            // success
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }

    })

    /**
     * @swagger
     * /cart:
     *   put:
     *     tags: Carts
     *     description: Updates user cart's quantity by 1
     *     produces: application/json
     *     responses:
     *       200:
     *         description: Successfully updated
     */
    // PUT - Add 1 quantity to user cart
    router.put('/add', async (req, res, next) => {
        try {
            // get userId
            const userId = req.user.id;
            // updating cart requires inclusion of cart id
            const cart = await CartServiceInstance.getCartByUserId(userId);
            const cartId = cart.id;
            const oldQuantity = cart.quantity;
            // add 1 to quantity
            const quantity = oldQuantity + 1;
            // new cart
            const newCart = {id: cartId, quantity: quantity};

            // response from service call
            const response = await CartServiceInstance.updateCart(newCart);
            // success
            res.status(200).send(response);
        } catch(error) {
            next(error);
        }
    })

    /**
     * @swagger
     * /cart:
     *   put:
     *     tags: Carts
     *     description: Updates user cart's quantity by -1
     *     produces: application/json
     *     responses:
     *       200:
     *         description: Successfully updated
     */
    // PUT - Subtract 1 quantity to user cart
    router.put('/sub', async (req, res, next) => {
        try {
            // get userId
            const userId = req.user.id;
            // updating cart requires inclusion of cart id
            const cart = await CartServiceInstance.getCartByUserId(userId);
            const cartId = cart.id;
            const oldQuantity = cart.quantity;
            // add 1 to quantity
            const quantity = oldQuantity - 1;
            // new cart
            const newCart = {id: cartId, quantity: quantity};
            console.log(newCart);

            // response from service call
            const response = await CartServiceInstance.updateCart(newCart);
            // success
            res.status(200).send(response);
        } catch(error) {
            next(error);
        }
    })

    /**
     * @swagger
     * /cart:
     *   delete:
     *     tags:
     *       - Carts
     *     description: Deletes the current user cart
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Successfully deleted
     */
    // DELETE - delete current user cart
    router.delete('/', async (req, res, next) => {
        try {
            // get userId
            const userId = req.user.id;
            // updating cart requires inclusion of cart id
            const cart = await CartServiceInstance.getCartByUserId(userId);
            const cartId = cart.id;

            // response from delete call
            const response = await CartServiceInstance.deleteCart({ id: cartId });
            // success
            res.status(200).send(`Cart deleted`);
        } catch(error) {
            next(error);
        }
    })
}

