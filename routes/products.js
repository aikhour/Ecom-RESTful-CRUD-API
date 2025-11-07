const express = require('express');
const router = express.Router();
const ProductService = require('../services/productService');

const ProductServiceInstance = new ProductService();

module.exports = (app) => {
    // applying user route
    app.use('/products', router);

    /** GET get product from id
     * @params {Object} data [product id]
     * @returns {Object|null} [product Record]
     */
    router.get('/:productId', async (req, res, next) => {

        try {
            // productid from params
            const { productId } = req.params;

            // response from service call
            const response = await ProductServiceInstance.getProductById({ id: productId });
            // success + return the object
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }
    });
    
    
    /**
     * GET get all products
     * @return {Object|null} [First 10 product records]
     */
    
    router.get('/', async (req, res, next) => {

        try {
            // response from service call
            const response = await ProductServiceInstance.getAllProducts()
            // success + return the object
            res.status(200).send(response);
        } catch(error) {
            next(error);
        }
    })
    


    /**
     * PUT update product using req params
     * @params {Object} data [User New Data]
     * @returns {Object|null} [User Record]
     */
    router.put('/:productId', async (req, res, next) => {
        

        try {
            // get productId and data
            const { productId } = req.params;
            const data = req.body;

            // response from service call
            const response = await ProductServiceInstance.updateProduct({ id: productId, ...data});
            // success
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }

    })
    // PUT on /products route
    router.put('/', async (req, res, next) => {
        

        try {
            // get productId and data
            const data = req.body;
            const productId = data.id;

            // response from service call
            const response = await ProductServiceInstance.updateUser({ id: productId, ...data});
            // success
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }

    })

    /**
     * DELETE delete product by id
     * @params {Integer} id [Product id]
     * @return {Object|null} [Confirmation of deletion]
     */
    router.delete('/:productId', async (req, res, next) => {
        try {
            // get productId
            const { productId } = req.params;

            // response from delete call
            const response = await ProductServiceInstance.deleteProduct({ id: productId });
            // success
            res.status(200).send(`Product record deleted`);
        } catch(error) {
            next(error);
        }
    })
    // delete user on /users route
    router.delete('/', async (req, res, next) => {
        try {
            // get productId
            const data = req.body;
            const productId =  data.id;

            // response from delete call
            const response = await ProductServiceInstance.deleteUser({ id: productId });
            // success
            res.status(200).send(`Product record deleted`);
        } catch(error) {
            next(error);
        }
    })

    // creating product records


    /**
     * POST create product
     * @params {Object} data [New product Data]
     * @returns {Object|null} [New product Record]
     */
    router.post('/', async (req, res, next) => {
        try {
            // get data
            const data = req.body;

            // response from service call
            const response = await UserServiceInstance.createProduct(data);

            // success
            res.status(201).send(response);

        } catch(error) {
            next(error);
        }
    })
}

