const express = require('express');
const routes = express.Router();
const registerController = require('../controllers/registerUser');
const loginController = require('../controllers/loginUser');
const upload = require('../middleware/multer');
const auth = require('../middleware/auth');
const deleteController = require('../controllers/deleteUser');
const homeController = require('../controllers/userHome');
const profileController = require('../controllers/userProfile');
const addFriendController = require('../controllers/addFriend');
const requestActionController = require('../controllers/requestAction')

routes.post('/register', upload.single('img'), registerController.register);

routes.post('/login', loginController.login);

routes.delete('/test', auth, deleteController.deleteUser);

routes.get('/home', auth, homeController.home);

routes.get('/logout', loginController.logout);

routes.post('/profile/:id', auth, profileController.profile)

routes.post('/addFriend/:id', addFriendController.addFriend)

routes.post('/pendingRequest', requestActionController.pendingRequest)

routes.post('/acceptRequest/:id', requestActionController.acceptRequest)

routes.post('/rejectRequest/:id', requestActionController.rejectRequest)

routes.post('/friendList', auth, requestActionController.friendList)

module.exports = routes;