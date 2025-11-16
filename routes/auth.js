const express = require('express');
const router = express.Router();

// Instantiate Services
const AuthService = require('../services/authService');
const AuthServiceInstance = new AuthService();

module.exports = (app, passport) => {
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
  
  // Login Endpoint
  app.post('/login', passport.authenticate('local'), async(req, res, next) => {
    try {
      const { email, password } = req.body;
      
      console.log(req.user);
      const response = await AuthServiceInstance.login({ email: email, password: password});
    
      res.status(200).send(`Logged in as user: ${response.email}`);
    } catch(err) {
      next(err);
    }
  });
}