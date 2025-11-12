const createError = require('http-errors');
const UserModel = require('../models/users');
const UserModelInstance = new UserModel();

module.exports = class AuthService {
    // register new user
    async register(data) {
        const { email } = data;

        try {
            // check if user already exists
            const user = await UserModelInstance.getUserByEmail(email);

            // if user exists, error
            if(user) {
                throw createError(409, 'Email already in use');
            }

            // user doesnt exist, create new user
            return await UserModelInstance.createUser(data);
        } catch(error) {
            throw createError(500, error);
        }
    };
    
    // login to user
    async login(data) {
    
        const { email, password } = data;

        try {
            // check if user exists
            const user = await UserModelInstance.getUserByEmail(email);

            // If no user found, reject
            if (!user) {
                throw createError(401, 'User record not found');
            }

            // Check for matching passwords
            if (user.password !== password) {
                throw createError(401, 'Incorrect username or password');
            }

            return user;

        } catch(error) {
            throw createError(500, error);
        }
    };

}