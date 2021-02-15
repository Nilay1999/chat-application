const express = require('express');
const routes = express.Router();
const registerController = require('../controllers/registerUser');
const loginController = require('../controllers/loginUser');
const upload = require('../middleware/multer');
const auth = require('../middleware/auth');
const testController = require('../controllers/testToken');

routes.post('/register', upload.single('img'), registerController.register);

routes.post('/login', upload.single(''), loginController.login);

routes.delete('/test', auth, testController.test);

module.exports = routes;