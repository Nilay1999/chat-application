const express = require('express');
const routes = express.Router();
const registerController = require('../controllers/registerUser');
const loginController = require('../controllers/loginUser');
const upload = require('../middleware/multer');
const auth = require('../middleware/auth');
const deleteController = require('../controllers/deleteUser');
const homeController = require('../controllers/userHome');

routes.post('/register', upload.single('img'), registerController.register);

routes.post('/login', loginController.login);

routes.delete('/test', auth, deleteController.deleteUser);

routes.get('/home', auth, homeController.home);

routes.get('/logout', loginController.logout);

module.exports = routes;