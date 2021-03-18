const User = require('./app/models/userSchema');
const Notification = require('./app/models/notification');

module.exports = function(io) {
    var id;
    io.on('connection', (socket) => {


        socket.on('requestSend', (id) => {
            let promise = new Promise(function(resolve, result) {
                setTimeout(() => resolve(
                    Notification.findOne({ userId: id })
                ), 1000)
            })
            promise.then(
                result => io.emit('notify', result),
                error => console.log(error)
            );
        })

        socket.on('requestMsg', () => {
            let promise = new Promise(function(resolve, result) {
                setTimeout(() => resolve(
                    Notification.findOne({ userId: id })
                ), 1000)
            })
            promise.then(
                result => io.emit('receiveMsg', result),
                error => console.log(error)
            );
        })




    });
};