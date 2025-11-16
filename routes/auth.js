const express = require('express');
const router = express.Router();

// Instantiate Services
const AuthService = require('../services/authService');
const AuthServiceInstance = new AuthService();

module.exports = (app, passport) => {
  
  /**
   * @swagger
   * /register:
   *   post:
   *     tags:
   *       - Authentication
   *     description: Creates a new user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Authentication'
   *     responses:
   *       200:
   *         description: Successfully created user
   */
  // Registration Endpoint
  app.post('/register', async (req, res, next) => {
  
    try {
      const data = req.body;
      
      const response = await AuthServiceInstance.register(data);
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  
  });
  
  /**
   * @swagger
   * /login:
   *   post:
   *     tags:
   *       - Authentication
   *     description: Logs the user in
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Authentication'
   *     responses:
   *       200:
   *         description: Successfully logged in
   */
  // Login Endpoint
  app.post('/login', passport.authenticate('local'), async(req, res, next) => {
    try {
      const { email, password } = req.body;
    
      const response = await AuthServiceInstance.login({ email: email, password: password});
    
      res.status(200).send(`Logged in as user: ${response.email}`);
    } catch(err) {
      next(err);
    }
  });
}