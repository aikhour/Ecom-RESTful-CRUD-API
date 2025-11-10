const createError = require('http-errors');
const CartModel = require('../models/carts');
const CartModelInstance = new CartModel();

module.exports = class CartService {
    // service to use the cart model methods

    /**
     * GET get cart from id
     * @params {Object} data [cart id]
     * @returns {Object|null} [cart Record]
     */
    async getCartById(data) {
        const { id } = data;

        try {
            // Check for cart record
            const cart = await CartModelInstance.getCartById(id);

            // If cart doesn't exist, reject
            if(!cart) {
                throw createError(404, 'Cart not found');
            }
            // if success, return
            return cart;

        } catch(error) {
            throw error;
        }
    }

    /**
     * GET get cart from user id
     * @params {int} id [cart user id]
     * @returns {Object|null} [cart record]
     */
    async getCartByUserId(id) {

        try {

            // Check for cart record
            const cart = await CartModelInstance.getCartByUserId(id);

            // if record doesn't exist, reject
            if(!cart) {
                throw createError(404, 'Cart not found');
            }
            // if success, return
            return cart;

        } catch(error) {
            throw error;
        }
        
    }

    /**
     * GET get all carts
     * @return {Object|null} [First 10 cart records]
     */
    async getAllCarts() {
        try {
            // check for cart records
            const users = await CartModelInstance.getAllCarts();

            // if records dont exist, reject
            if(!users) {
                throw createError(404, 'Cart records not found');
            }

            // if success
            return users;
        } catch(error) {
            throw error;
        }
    }

    /**
     * PUT update card
     * @params {Object} data [Cart New Data]
     * @returns {Object|null} [Cart Record]
     */
    async updateCart(data) {

        try {

            // Check if the cart exists, then update
            const user = await CartModelInstance.updateCart(data);

            // if success
            return user;


        } catch(error) {
            throw error;
        }
    }

    /**
     * POST create cart
     * @params {Object} data [New Cart Data]
     * @returns {Object|null} [New Cart Record]
     */
    async createCart(data) {

        try {
            // Check for cart record, otherwise creates new one
            const user = await CartModelInstance.createCart(data);
            
            // if success
            return user;
            
        } catch(error) {
            throw error;
        }
    }

    /**
     * DELETE delete cart by id
     * @params {Integer} id [Cart id]
     * @return {Object|null} [Confirmation of deletion]
     */
    async deleteCart(data) {
        try {
            // get cart id
            const { id } = data;

            // check for cart record, then delete
            const cart = await CartModelInstance.deleteCart(id);
            // if success
            return cart;

        } catch(error) {
            throw error;
        }
    }
}