const express = require('express');
const routes = express.Router();
const registerController = require('../controllers/registerUser');
const loginController = require('../controllers/loginUser');

routes.post('/register', registerController.register);

routes.post('/login', loginController.login);


module.exports = routes;