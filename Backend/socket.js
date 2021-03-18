const User = require('./app/models/userSchema');



module.exports = function(io) {
    var id;
    io.on('connection', (socket) => {
        socket.on('requestSend', () => {
            let promise = new Promise(function(resolve, result) {
                setTimeout(() => resolve(
                    User.find({})
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
                    User.find({})
                ), 1000)
            })
            promise.then(
                result => io.emit('receiveMsg', result),
                error => console.log(error)
            );
        })
    });
};