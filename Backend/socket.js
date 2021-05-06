const User = require("./app/models/userSchema");
const Notification = require("./app/models/notification");

module.exports = function (io) {
    io.on("connection", (socket) => {
        socket.on("userConnected", (id) => {
            let promise = new Promise(function (resolve, result) {
                setTimeout(
                    () =>
                        resolve(
                            Notification.findOne({
                                userId: id,
                                "msg.read": false,
                            })
                        ),
                    1000
                );
            });
            promise.then(
                (result) => io.to(socket.id).emit("notify", result),
                (error) => console.log(error)
            );
        });

        socket.on("requestSend", (id) => {
            let promise = new Promise(function (resolve, result) {
                setTimeout(
                    () =>
                        resolve(
                            Notification.findOne({
                                userId: id,
                                "msg.read": false,
                            })
                        ),
                    1000
                );
            });
            promise.then(
                (result) => socket.broadcast.emit("notify", result),
                (error) => console.log(error)
            );
        });

        socket.on("loadMsg", (id) => {
            let promise = new Promise(function (resolve, result) {
                setTimeout(
                    () => resolve(Notification.findOne({ userId: id })),
                    1000
                );
            });
            promise.then(
                (result) => io.to(socket.id).emit("receiveMsg", result),
                (error) => console.log(error)
            );
        });

        socket.on("requestMsg", (id) => {
            let promise = new Promise(function (resolve, result) {
                setTimeout(
                    () => resolve(Notification.findOne({ userId: id })),
                    1000
                );
            });
            promise.then(
                (result) => socket.broadcast.emit("receiveMsg", result),
                (error) => console.log(error)
            );
        });

        socket.on("refreshChat", () => {
            socket.broadcast.emit("loadChat");
        });

        socket.on("refreshGroupChat", () => {
            socket.broadcast.emit("loadGroupChat");
        });

        socket.on("markAsRead", (msg) => {
            io.emit("addMark", msg);
        });

        socket.on("Marked", (msg) => {
            socket.broadcast.emit("loadMark", msg);
        });
    });
};
