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

    /**
     * GET get all products
     * @return {Object|null} [First 10 Product records]
     */
    async getAllProducts() {
        try {
            // check for Product records
            const products = await ProductModelInstance.getAllProducts();

            // if records dont exist, reject
            if(!products) {
                throw createError(404, 'Product records not found');
            }

            // if success
            return products;
        } catch(error) {
            throw error;
        }
    }

    /**
     * GET get product from id
     * @params {Integer} data [Product id]
     * @returns {Object|null} [Product Record]
     */
    async getProductById(data) {
        try {

            const { id } = data;
            // Check for product record
            const product = await ProductModelInstance.getProductById(id);

            // If product doesn't exist, reject
            if(!product) {
                throw createError(404, 'Product record not found');
            }
            // if success, return
            return product;

        } catch(error) {
            throw error;
        }
    }

    /**
     * GET get products from category
     * @params {String} data [Product category]
     * @return {Object|null} [Product records]
     */
    async getProductsByCategory(data) {
        try {
            // get category data
            const { category } = data;
            // check for product record
            const products = await ProductModelInstance.getProductByCategory(category);

            // If product doesn't exist, reject
            if(!products) {
                throw createError(404, 'Product record not found');
            }
            // if success, return
            return products;


        } catch(error) {
            throw error;
        }
    }

}