const createError = require('http-errors');
const UserModel = require('../models/users');
const UserModelInstance = new UserModel();

module.exports = class UserService {
    // service to use the user model methods

    /**
     * GET get user from id
     * @params {Object} data [User id]
     * @returns {Object|null} [User Record]
     */
    async getUserById(data) {
        const { id } = data;

        try {
            // Check for user record
            const user = await UserModelInstance.getUserById(id);

            // If user doesn't exist, reject
            if(!user) {
                throw createError(404, 'User record not found');
            }
            // if success, return
            return user;

        } catch(error) {
            throw error;
        }
    }

    /**
     * GET get user from email
     * @params {String} data [User email]
     * @returns {Object|null} [User record]
     */
    async getUserByEmail(data) {

        // get email
        const { email } = data;

        try {

            // Check for user record
            const user = await UserModelInstance.getUserByEmail(email);

            // if record doesn't exist, reject
            if(!user) {
                throw createError(404, 'User record not found');
            }
            // if success, return
            return user;

        } catch(error) {
            throw error;
        }
        
    }

    /**
     * GET get all users
     * @return {Object|null} [First 10 User records]
     */
    async getAllUsers() {
        try {
            // check for user records
            const users = await UserModelInstance.getAllUsers();

            // if records dont exist, reject
            if(!users) {
                throw createError(404, 'Users records not found');
            }

            // if success
            return users;
        } catch(error) {
            throw error;
        }
    }

    /**
     * PUT update user
     * @params {Object} data [User New Data]
     * @returns {Object|null} [User Record]
     */
    async updateUser(data) {

        try {

            // Check if the user exists, then update
            const user = await UserModelInstance.updateUser(data);

            // if success
            return user;


        } catch(error) {
            throw error;
        }
    }

    /**
     * POST create user
     * @params {Object} data [New User Data]
     * @returns {Object|null} [New User Record]
     */
    async createUser(data) {

        try {
            // Check for user record, otherwise creates new one
            const user = await UserModelInstance.createUser(data);
            
            // if success
            return user;
            
        } catch(error) {
            throw error;
        }
    }

    /**
     * DELETE delete user by id
     * @params {Integer} id [User id]
     * @return {Object|null} [Confirmation of deletion]
     */
    async deleteUser(data) {
        try {
            // get user id
            const { id } = data;

            // check for user record, then delete
            const user = await UserModelInstance.deleteUser(id);
            // if success
            return user;

        } catch(error) {
            throw error;
        }
    }
}