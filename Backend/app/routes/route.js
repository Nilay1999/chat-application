const express = require('express');
const routes = express.Router();
const registerController = require('../controllers/registerUser');
const loginController = require('../controllers/loginUser');
const upload = require('../middleware/multer')


routes.post('/register', upload.single('img'), registerController.register);

routes.post('/login', loginController.login);


module.exports = routes;