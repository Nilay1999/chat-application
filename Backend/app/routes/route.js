const express = require("express");
const routes = express.Router();
const upload = require("../middleware/multer");
const auth = require("../middleware/auth");

const registerController = require("../controllers/registerUser");
const loginController = require("../controllers/loginUser");
const deleteController = require("../controllers/deleteUser");
const homeController = require("../controllers/userHome");
const profileController = require("../controllers/userProfile");
const addFriendController = require("../controllers/addFriend");
const requestActionController = require("../controllers/requestAction");
const notificationController = require("../controllers/readNotification");
const createConvController = require("../controllers/createConversation");
const messageController = require("../controllers/messageAction");
const groupController = require("../controllers/groupConversation");
//const mailController = require("../controllers/forgotPassword");

routes.post("/register", upload.single("img"), registerController.register);

routes.post("/login", loginController.login);

routes.delete("/test", auth, deleteController.deleteUser);

routes.get("/home", auth, homeController.home);

routes.get("/logout", loginController.logout);

routes.post("/profile/:id", auth, profileController.profile);

routes.post("/addFriend/:id", auth, addFriendController.addFriend);

routes.post("/pendingRequest", requestActionController.pendingRequest);

routes.post("/acceptRequest/:id", requestActionController.acceptRequest);

routes.post("/rejectRequest/:id", requestActionController.rejectRequest);

routes.post("/friendList", auth, requestActionController.friendList);

routes.post("/readNotification", notificationController.readNotification);

routes.post("/createConv/:id", createConvController.createConv);

routes.post("/addMsg", messageController.addMessage);

routes.post("/getConversation", messageController.getConversation);

routes.post("/loadLastMessage", messageController.loadLastMessage);

routes.post("/markAsRead", messageController.markAsRead);

routes.post("/group/createGroup", auth, groupController.groupConversation);

routes.post("/group/addToGroup", groupController.addToGroup);

routes.post("/group/getGroup", groupController.getGroupData);

routes.post("/group/addMessage", groupController.addGroupMessage);

routes.post("/group/getGroupChat", groupController.getGroupChat);

routes.post("/group/getLastMessage", groupController.getLastMessage);

routes.post("/group/leaveGroup", groupController.leaveGroup);

module.exports = routes;
