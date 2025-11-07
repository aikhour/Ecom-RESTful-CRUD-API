const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');

const UserServiceInstance = new UserService();

module.exports = (app) => {
    // applying user route
    app.use('/users', router);

    /** GET get user from id
     * @params {Object} data [User id]
     * @returns {Object|null} [User Record]
     */
    router.get('/:userId', async (req, res, next) => {

        try {
            // userid from params
            const { userId } = req.params;

            // response from service call
            const response = await UserServiceInstance.getUserById({ id: userId });
            // success + return the object
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }
    });

    /**
     * GET get user from email
     * @params {String} data [User email]
     * @returns {Object|null} [User record]
     */

    /*
    router.get('/:userEmail', async (req, res, next) => {

        try {
            // userEmail from params
            const { userEmail } = req.params;

            // response from service call
            const response = await UserServiceInstance.getUserByEmail({ email: userEmail });
            // success + return the object
            res.status(200).send(response);

        } catch(err0r) {
            next(error);
        }
    });
    */
    
    
    /**
     * GET get all users
     * @return {Object|null} [First 10 User records]
     */
    
    router.get('/', async (req, res, next) => {

        try {
            // response from service call
            const response = await UserServiceInstance.getAllUsers()
            // success + return the object
            res.status(200).send(response);
        } catch(error) {
            next(error);
        }
    })
    


    /**
     * PUT update user using req params
     * @params {Object} data [User New Data]
     * @returns {Object|null} [User Record]
     */
    router.put('/:userId', async (req, res, next) => {
        

        try {
            // get userId and data
            const { userId } = req.params;
            const data = req.body;

            // response from service call
            const response = await UserServiceInstance.updateUser({ id: userId, ...data});
            // success
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }

    })
    // PUT on /users route
    router.put('/', async (req, res, next) => {
        

        try {
            // get userId and data
            const data = req.body;
            const userId = data.id;

            // response from service call
            const response = await UserServiceInstance.updateUser({ id: userId, ...data});
            // success
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }

    })

    /**
     * DELETE delete user by id
     * @params {Integer} id [User id]
     * @return {Object|null} [Confirmation of deletion]
     */
    router.delete('/:userId', async (req, res, next) => {
        try {
            // get userId
            const { userId } = req.params;

            // response from delete call
            const response = await UserServiceInstance.deleteUser({ id: userId });
            // success
            res.status(200).send(`User account deleted`);
        } catch(error) {
            next(error);
        }
    })
    // delete user on /users route
    router.delete('/', async (req, res, next) => {
        try {
            // get userId
            const data = req.body;
            const userId =  data.id;

            // response from delete call
            const response = await UserServiceInstance.deleteUser({ id: userId });
            // success
            res.status(200).send(`User account deleted`);
        } catch(error) {
            next(error);
        }
    })

    // user registering / create users


    /**
     * POST create user
     * @params {Object} data [New User Data]
     * @returns {Object|null} [New User Record]
     */
    app.post('/register', async (req, res, next) => {
        try {
            // get data
            const data = req.body;

            // response from service call
            const response = await UserServiceInstance.createUser(data);

            // success
            res.status(201).send(response);

        } catch(error) {
            next(error);
        }
    })
}

