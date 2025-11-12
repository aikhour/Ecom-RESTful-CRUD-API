const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');

const UserServiceInstance = new UserService();

module.exports = (app) => {
    // applying user route
    app.use('/user', router);

    // GET - get profile of currently logged in user
    router.get('/', async (req, res, next) => {
        try {
            // get user id from req.user
            const { id } = req.user;
            // get user profile via user id
            const response = await UserServiceInstance.getUserById({ id: id });
            
            // success
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }
    });


    // PUT - update current user's profile
    router.put('/', async (req, res, next) => {
        try {
            console.log(req.user);
            // get userId and data
            const data = req.body;
            const userId = req.user.id;

            // response from service call
            const response = await UserServiceInstance.updateUser({ id: userId, ...data});
            // success
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }

    })




}

