const createError = require('http-errors');
const ProductModel = require('../models/products');
const ProductModelInstance = new ProductModel();

module.exports = class ProductService {
    // service to make use of the product functions

    /**
     * POST create product
     * @params {Object} data [New Product Data]
     * @returns {Object|null} [New Product Record]
     */
    async createProduct(data) {

        try {
            // Check for Product record, otherwise creates new one
            const product = await ProductModelInstance.createProduct(data);
            
            // if success
            return product;
            
        } catch(error) {
            throw error;
        }
    }
    
    /**
     * PUT update product
     * @params {Object} data [Product New Data]
     * @returns {Object|null} [Product Record]
     */
    async updateProduct(data) {

        try {

            // Check if the Product exists, then update
            const product = await ProductModelInstance.updateProduct(data);

            // if success
            return product;


        } catch(error) {
            throw error;
        }
    }    

}