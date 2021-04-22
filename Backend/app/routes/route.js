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
const postController = require("../controllers/makePost");

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

routes.post("/post/makePost", upload.single("image"), postController.makePost);

routes.post("/post/viewPosts", postController.viewPosts);

routes.post("/post/addLike", postController.addLike);

routes.post("/post/dislike", postController.dislike);

routes.post("/group/createGroup", createConvController.groupConversation);

module.exports = routes;
