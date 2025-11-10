const createError = require('http-errors');
const OrderModel = require('../models/orders');
const OrderModelInstance = new OrderModel();

module.exports = class OrderService {
    // service to use the order model methods

    /**
     * GET get order from id
     * @params {Object} data [order id]
     * @returns {Object|null} [order Record]
     */
    async getOrderById(data) {
        const { id } = data;

        try {
            // Check for order record
            const order = await OrderModelInstance.getOrderById(id);

            // If order doesn't exist, reject
            if(!order) {
                throw createError(404, 'Order not found');
            }
            // if success, return
            return order;

        } catch(error) {
            throw error;
        }
    }

    /**
     * GET get order from user id
     * @params {int} id [order user id]
     * @returns {Object|null} [order record]
     */
    async getOrderByUserId(id) {

        try {

            // Check for order record
            const order = await OrderModelInstance.getOrderByUserId(id);

            // if record doesn't exist, reject
            if(!order) {
                throw createError(404, 'Order not found');
            }
            // if success, return
            return order;

        } catch(error) {
            throw error;
        }
        
    }

    /**
     * GET get all orders
     * @return {Object|null} [First 10 order records]
     */
    async getAllOrder() {
        try {
            // check for order records
            const users = await OrderModelInstance.getAllOrders();

            // if records dont exist, reject
            if(!users) {
                throw createError(404, 'Order records not found');
            }

            // if success
            return users;
        } catch(error) {
            throw error;
        }
    }

    /**
     * PUT update order record
     * @params {Object} data [order New Data]
     * @returns {Object|null} [order Record]
     */
    async updateOrder(data) {

        try {

            // Check if the order exists, then update
            const user = await OrderModelInstance.updateOrder(data);

            // if success
            return user;


        } catch(error) {
            throw error;
        }
    }

    /**
     * POST create order
     * @params {Object} data [New Order Data]
     * @returns {Object|null} [New Order Record]
     */
    async createOrder(data) {

        try {
            // Check for order record, otherwise creates new one
            const user = await OrderModelInstance.createOrder(data);
            
            // if success
            return user;
            
        } catch(error) {
            throw error;
        }
    }

    /**
     * DELETE delete order by id
     * @params {Integer} id [order id]
     * @return {Object|null} [Confirmation of deletion]
     */
    async deleteOrder(data) {
        try {
            // get order id
            const { id } = data;

            // check for order record, then delete
            const order = await OrderModelInstance.deleteOrder(id);
            // if success
            return order;

        } catch(error) {
            throw error;
        }
    }
}