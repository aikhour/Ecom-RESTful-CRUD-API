const express = require('express');
const router = express.Router();
const OrderService = require('../services/orderService');

const OrderServiceInstance = new OrderService();

module.exports = (app) => {
    // applying order route
    app.use('/orders', router);

    /** GET get order from id
     * @params {Object} data [order id]
     * @returns {Object|null} [order Record]
     */
    router.get('/:orderId', async (req, res, next) => {

        try {
            // orderid from params
            const { orderId } = req.params;

            // response from service call
            const response = await OrderServiceInstance.getOrderById({ id: orderId });
            // success + return the object
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }
    });
    
    
    /**
     * GET get all orders
     * @return {Object|null} [First 10 order records]
     */
    
    router.get('/', async (req, res, next) => {

        try {
            // response from service call
            const response = await OrderServiceInstance.getAllOrders()
            // success + return the object
            res.status(200).send(response);
        } catch(error) {
            next(error);
        }
    })
    


    /**
     * PUT update order using req params
     * @params {Object} data [User New Data]
     * @returns {Object|null} [User Record]
     */
    router.put('/:orderId', async (req, res, next) => {
        

        try {
            // get orderId and data
            const { orderId } = req.params;
            const data = req.body;

            // response from service call
            const response = await OrderServiceInstance.updateOrder({ id: orderId, ...data});
            // success
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }

    })
    // PUT on /orders route
    router.put('/', async (req, res, next) => {
        

        try {
            // get orderId and data
            const data = req.body;
            const orderId = data.id;

            // response from service call
            const response = await OrderServiceInstance.updateOrder({ id: orderId, ...data});
            // success
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }

    })

    /**
     * DELETE delete order by id
     * @params {Integer} id [order id]
     * @return {Object|null} [Confirmation of deletion]
     */
    router.delete('/:orderId', async (req, res, next) => {
        try {
            // get orderId
            const { orderId } = req.params;

            // response from delete call
            const response = await OrderServiceInstance.deleteOrder({ id: orderId });
            // success
            res.status(200).send(`Order record deleted`);
        } catch(error) {
            next(error);
        }
    })
    // delete user on /orders route
    router.delete('/', async (req, res, next) => {
        try {
            // get orderId
            const data = req.body;
            const orderId =  data.id;

            // response from delete call
            const response = await OrderServiceInstance.deleteOrder({ id: orderId });
            // success
            res.status(200).send(`Order record deleted`);
        } catch(error) {
            next(error);
        }
    })

    // creating order records


    /**
     * POST create order
     * @params {Object} data [New order Data]
     * @returns {Object|null} [New order Record]
     */
    router.post('/', async (req, res, next) => {
        try {
            // get data
            const data = req.body;

            // response from service call
            const response = await OrderServiceInstance.createOrder(data);

            // success
            res.status(201).send(response);

        } catch(error) {
            next(error);
        }
    })
}

